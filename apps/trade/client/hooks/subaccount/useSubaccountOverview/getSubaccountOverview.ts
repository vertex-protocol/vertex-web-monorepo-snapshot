import { QUOTE_PRODUCT_ID } from '@vertex-protocol/client';
import {
  calcLpBalanceValue,
  calcPerpBalanceNotionalValue,
  calcSpotBalanceValue,
  ProductEngineType,
  SubaccountSummaryResponse,
} from '@vertex-protocol/contracts';
import {
  IndexerOraclePrice,
  IndexerSubaccountSnapshot,
} from '@vertex-protocol/indexer-client';
import { AnnotatedIsolatedPositionWithProduct } from '@vertex-protocol/react-client';
import {
  BigDecimal,
  BigDecimals,
  removeDecimals,
} from '@vertex-protocol/utils';
import { safeDiv } from '@vertex-protocol/web-common';
import { SpotInterestRate } from 'client/hooks/markets/useSpotInterestRates';
import { AllLatestMarketPricesData } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { SubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/types';
import { calcCrossPositionMarginWithoutPnl } from 'client/utils/calcs/perp/calcCrossPositionMarginWithoutPnl';
import { calcIsoPositionNetMargin } from 'client/utils/calcs/perp/calcIsoPositionNetMargin';
import { calcIndexerUnrealizedPerpEntryCost } from 'client/utils/calcs/perp/perpEntryCostCalcs';
import {
  calcIndexerSummaryCumulativePnl,
  calcIndexerSummaryUnrealizedLpPnl,
  calcIndexerSummaryUnrealizedPnl,
  calcPnlFrac,
} from 'client/utils/calcs/pnlCalcs';
import {
  calcSubaccountLeverage,
  calcSubaccountMarginUsageFractions,
  calcTotalPortfolioValues,
} from 'client/utils/calcs/subaccount/subaccountInfoCalcs';
import { getEstimatedExitPrice } from 'client/utils/getEstimatedExitPrice';
import { mapValues } from 'lodash';

interface GetSubaccountOverviewParams {
  subaccountSummary: SubaccountSummaryResponse;
  isolatedPositions: AnnotatedIsolatedPositionWithProduct[];
  indexerSnapshot: IndexerSubaccountSnapshot | undefined;
  spotInterestRates: Record<number, SpotInterestRate> | undefined;
  lpYields: Record<number, BigDecimal> | undefined;
  latestOraclePrices: Record<number, IndexerOraclePrice> | undefined;
  latestMarketPrices: AllLatestMarketPricesData | undefined;
  primaryQuotePriceUsd: BigDecimal;
}

export function getSubaccountOverview({
  subaccountSummary,
  isolatedPositions,
  indexerSnapshot,
  primaryQuotePriceUsd,
  spotInterestRates,
  lpYields,
  latestOraclePrices,
  latestMarketPrices,
}: GetSubaccountOverviewParams): SubaccountOverview {
  // Spot
  let totalBorrowsValue = BigDecimals.ZERO;
  let totalDepositsValue = BigDecimals.ZERO;
  let depositAPRWeightedByValue = BigDecimals.ZERO;
  // This SHOULD be negative to calculate average interest rate across borrow/deposit
  let borrowAPRWeightedByValue = BigDecimals.ZERO;
  let totalNetInterestCumulativeInPrimaryQuote = BigDecimals.ZERO;
  // Perp cross
  let totalCrossPerpCollateralUsed = BigDecimals.ZERO;
  let totalCrossPerpUnrealizedPnl = BigDecimals.ZERO;
  let totalCrossPerpCumulativePnl = BigDecimals.ZERO;
  let totalCrossPerpUnrealizedEntryCost = BigDecimals.ZERO;
  // Perp iso
  let totalIsoPerpNotionalValue = BigDecimals.ZERO;
  let totalIsoPerpNetMargin = BigDecimals.ZERO;
  let totalIsoPerpUnrealizedPnl = BigDecimals.ZERO;
  let totalIsoPerpCumulativePnl = BigDecimals.ZERO;
  let totalIsoPerpUnrealizedEntryCost = BigDecimals.ZERO;
  // LP
  let totalLpValue = BigDecimals.ZERO;
  let lpYieldWeightedByValue = BigDecimals.ZERO;
  let totalLpUnrealizedPnl = BigDecimals.ZERO;

  /**
   * Subaccount calcs
   */
  const marginUsageFractions =
    calcSubaccountMarginUsageFractions(subaccountSummary);
  const decimalAdjustedInitialHealth = removeDecimals(
    subaccountSummary.health.initial.health,
  );
  const decimalAdjustedMaintHealth = removeDecimals(
    subaccountSummary.health.maintenance.health,
  );
  const decimalAdjustedTotalPortfolioValues = mapValues(
    calcTotalPortfolioValues(subaccountSummary),
    (val) => removeDecimals(val),
  );

  // Iterate through perp isolated positions, this needs to be done first so that we can include USDC used as margin in spot calculations
  isolatedPositions.forEach((position) => {
    const baseProductId = position.baseBalance.productId;

    const indexerBalance = indexerSnapshot?.balances.find(
      (indexerSnapshotBalance) => {
        return (
          indexerSnapshotBalance.productId === baseProductId &&
          indexerSnapshotBalance.isolated
        );
      },
    );

    const oraclePrice =
      latestOraclePrices?.[baseProductId]?.oraclePrice ??
      position.baseBalance.oraclePrice;

    totalIsoPerpNotionalValue = totalIsoPerpNotionalValue.plus(
      calcPerpBalanceNotionalValue(position.baseBalance),
    );
    totalIsoPerpNetMargin = totalIsoPerpNetMargin.plus(
      calcIsoPositionNetMargin(position.baseBalance, position.quoteBalance),
    );

    if (indexerBalance) {
      const estimatedExitPrice =
        getEstimatedExitPrice(
          position.baseBalance.amount.isPositive(),
          latestMarketPrices?.[baseProductId],
        ) ?? oraclePrice;
      const unrealizedPnl = calcIndexerSummaryUnrealizedPnl(
        indexerBalance,
        estimatedExitPrice,
      );
      const cumulativePnl = calcIndexerSummaryCumulativePnl(indexerBalance);

      totalIsoPerpCumulativePnl = totalIsoPerpCumulativePnl.plus(cumulativePnl);
      totalIsoPerpUnrealizedPnl = totalIsoPerpUnrealizedPnl.plus(unrealizedPnl);
      totalIsoPerpUnrealizedEntryCost = totalIsoPerpUnrealizedEntryCost.plus(
        calcIndexerUnrealizedPerpEntryCost(indexerBalance),
      );
    }
  });

  // Iterate through cross balances
  subaccountSummary.balances.forEach((balance) => {
    const indexerBalance = indexerSnapshot?.balances.find(
      (indexerSnapshotBalance) => {
        return (
          indexerSnapshotBalance.productId === balance.productId &&
          !indexerSnapshotBalance.isolated
        );
      },
    );

    /**
     * Spot calcs
     */
    if (balance.type === ProductEngineType.SPOT) {
      const balanceValueWithoutIsoMargin = calcSpotBalanceValue(balance);
      // Positive for deposits, negative for borrows
      // For the quote balance, we want to add the net margin in isolated positions so that we treat isolated margin as a deposit
      const balanceValueWithDecimals =
        balance.productId === QUOTE_PRODUCT_ID
          ? balanceValueWithoutIsoMargin.plus(totalIsoPerpNetMargin)
          : balanceValueWithoutIsoMargin;
      // APRs are always positive
      const aprs = spotInterestRates?.[balance.productId];

      if (balanceValueWithDecimals.lt(0)) {
        totalBorrowsValue = totalBorrowsValue.plus(balanceValueWithDecimals);

        if (aprs) {
          borrowAPRWeightedByValue = borrowAPRWeightedByValue.plus(
            aprs.borrow.multipliedBy(balanceValueWithDecimals),
          );
        }
      } else if (balanceValueWithDecimals.gt(0)) {
        totalDepositsValue = totalDepositsValue.plus(balanceValueWithDecimals);

        if (aprs) {
          depositAPRWeightedByValue = depositAPRWeightedByValue.plus(
            aprs.deposit.multipliedBy(balanceValueWithDecimals),
          );
        }
      }

      if (indexerBalance) {
        const netInterestCumulativeInPrimaryQuote =
          indexerBalance.trackedVars.netInterestCumulative.multipliedBy(
            indexerBalance.state.market.product.oraclePrice,
          );
        totalNetInterestCumulativeInPrimaryQuote =
          totalNetInterestCumulativeInPrimaryQuote.plus(
            netInterestCumulativeInPrimaryQuote,
          );
      }
    }

    /**
     * Perp calcs
     */
    if (balance.type === ProductEngineType.PERP) {
      const oraclePrice =
        latestOraclePrices?.[balance.productId]?.oraclePrice ??
        balance.oraclePrice;

      totalCrossPerpCollateralUsed = totalCrossPerpCollateralUsed.plus(
        calcCrossPositionMarginWithoutPnl(balance),
      );

      if (indexerBalance) {
        const estimatedExitPrice =
          getEstimatedExitPrice(
            balance.amount.isPositive(),
            latestMarketPrices?.[balance.productId],
          ) ?? oraclePrice;
        const unrealizedPnl = calcIndexerSummaryUnrealizedPnl(
          indexerBalance,
          estimatedExitPrice,
        );
        const cumulativePnl = calcIndexerSummaryCumulativePnl(indexerBalance);

        totalCrossPerpCumulativePnl =
          totalCrossPerpCumulativePnl.plus(cumulativePnl);
        totalCrossPerpUnrealizedPnl =
          totalCrossPerpUnrealizedPnl.plus(unrealizedPnl);
        totalCrossPerpUnrealizedEntryCost =
          totalCrossPerpUnrealizedEntryCost.plus(
            calcIndexerUnrealizedPerpEntryCost(indexerBalance),
          );
      }
    }

    /**
     * LP calcs
     */
    const lpValue = calcLpBalanceValue(balance);
    const lpYield = lpYields?.[balance.productId] ?? BigDecimals.ZERO;

    totalLpValue = totalLpValue.plus(lpValue);
    lpYieldWeightedByValue = lpYieldWeightedByValue.plus(
      lpYield.multipliedBy(lpValue),
    );

    if (indexerBalance) {
      totalLpUnrealizedPnl = totalLpUnrealizedPnl.plus(
        calcIndexerSummaryUnrealizedLpPnl(indexerBalance),
      );
    }
  });

  // Spot calcs
  const totalAbsSpotValue = totalDepositsValue.plus(totalBorrowsValue.abs());
  const totalAPRWeightedByValue = depositAPRWeightedByValue.plus(
    borrowAPRWeightedByValue,
  );
  const averageDepositAPR = safeDiv(
    depositAPRWeightedByValue,
    totalDepositsValue,
  );
  const averageBorrowAPR = safeDiv(borrowAPRWeightedByValue, totalBorrowsValue);
  const averageSpotAPR = safeDiv(totalAPRWeightedByValue, totalAbsSpotValue);

  // Perp calcs
  const perpCrossMetrics = ((): SubaccountOverview['perp']['cross'] => {
    const entryCost = removeDecimals(totalCrossPerpUnrealizedEntryCost);
    const unrealizedPnl = removeDecimals(totalCrossPerpUnrealizedPnl);
    const cumulativePnl = removeDecimals(totalCrossPerpCumulativePnl);
    const totalUnrealizedPnlFrac = calcPnlFrac(unrealizedPnl, entryCost);

    return {
      totalNotionalValueUsd:
        decimalAdjustedTotalPortfolioValues.perpNotional.multipliedBy(
          primaryQuotePriceUsd,
        ),
      totalUnsettledQuote: decimalAdjustedTotalPortfolioValues.perp,
      totalCumulativePnlUsd: cumulativePnl.multipliedBy(primaryQuotePriceUsd),
      totalUnrealizedPnlUsd: unrealizedPnl.multipliedBy(primaryQuotePriceUsd),
      totalUnrealizedPnlFrac,
      totalMarginUsedUsd: removeDecimals(
        totalCrossPerpCollateralUsed,
      ).multipliedBy(primaryQuotePriceUsd),
    };
  })();

  const perpIsoMetrics = ((): SubaccountOverview['perp']['iso'] => {
    const unrealizedPnl = removeDecimals(totalIsoPerpUnrealizedPnl);
    const entryCost = removeDecimals(totalIsoPerpUnrealizedEntryCost);
    const totalUnrealizedPnlFrac = calcPnlFrac(unrealizedPnl, entryCost);

    return {
      totalCumulativePnlUsd: removeDecimals(
        totalIsoPerpCumulativePnl,
      ).multipliedBy(primaryQuotePriceUsd),
      totalNetMarginUsd: removeDecimals(totalIsoPerpNetMargin).multipliedBy(
        primaryQuotePriceUsd,
      ),
      totalNotionalValueUsd: removeDecimals(
        totalIsoPerpNotionalValue,
      ).multipliedBy(primaryQuotePriceUsd),
      totalUnrealizedPnlFrac,
      totalUnrealizedPnlUsd: unrealizedPnl.multipliedBy(primaryQuotePriceUsd),
    };
  })();

  const totalPerpNotionalValueUsd = perpCrossMetrics.totalNotionalValueUsd.plus(
    perpIsoMetrics.totalNotionalValueUsd,
  );
  const totalPerpUnrealizedPnlUsd = perpCrossMetrics.totalUnrealizedPnlUsd.plus(
    perpIsoMetrics.totalUnrealizedPnlUsd,
  );
  const totalPerpUnrealizedPnlFrac = calcPnlFrac(
    totalPerpUnrealizedPnlUsd,
    removeDecimals(
      totalCrossPerpUnrealizedEntryCost.plus(totalIsoPerpUnrealizedEntryCost),
    ),
  );
  const totalPerpCumulativePnlUsd = perpCrossMetrics.totalCumulativePnlUsd.plus(
    perpIsoMetrics.totalCumulativePnlUsd,
  );

  const spotNetCrossBalanceUsd =
    decimalAdjustedTotalPortfolioValues.spot.multipliedBy(primaryQuotePriceUsd);

  // Total portfolio value = total cross value + sum of isolated net margins
  const portfolioValueUsd = decimalAdjustedTotalPortfolioValues.netTotal
    .multipliedBy(primaryQuotePriceUsd)
    .plus(perpIsoMetrics.totalNetMarginUsd);

  return {
    accountLeverage: calcSubaccountLeverage(subaccountSummary),
    marginUsageFractionBounded: marginUsageFractions.initial,
    liquidationRiskFractionBounded: marginUsageFractions.maintenance,
    portfolioValueUsd,
    fundsAvailableBoundedUsd: BigDecimal.max(
      0,
      decimalAdjustedInitialHealth.multipliedBy(primaryQuotePriceUsd),
    ),
    fundsUntilLiquidationBoundedUsd: BigDecimal.max(
      0,
      decimalAdjustedMaintHealth.multipliedBy(primaryQuotePriceUsd),
    ),
    spot: {
      netCrossBalanceUsd: spotNetCrossBalanceUsd,
      netTotalBalanceUsd: spotNetCrossBalanceUsd.plus(
        perpIsoMetrics.totalNetMarginUsd,
      ),
      totalBorrowsValueUsd:
        removeDecimals(totalBorrowsValue).multipliedBy(primaryQuotePriceUsd),
      totalDepositsValueUsd:
        removeDecimals(totalDepositsValue).multipliedBy(primaryQuotePriceUsd),
      averageBorrowAPRFraction: averageBorrowAPR,
      averageDepositAPRFraction: averageDepositAPR,
      averageAPRFraction: averageSpotAPR,
      totalNetInterestCumulativeUsd: removeDecimals(
        totalNetInterestCumulativeInPrimaryQuote,
      ).multipliedBy(primaryQuotePriceUsd),
    },
    perp: {
      totalNotionalValueUsd: totalPerpNotionalValueUsd,
      totalUnrealizedPnlUsd: totalPerpUnrealizedPnlUsd,
      totalCumulativePnlUsd: totalPerpCumulativePnlUsd,
      totalUnrealizedPnlFrac: totalPerpUnrealizedPnlFrac,
      cross: perpCrossMetrics,
      iso: perpIsoMetrics,
    },
    lp: {
      totalValueUsd:
        removeDecimals(totalLpValue).multipliedBy(primaryQuotePriceUsd),
      averageYieldFraction: safeDiv(lpYieldWeightedByValue, totalLpValue),
      totalUnrealizedPnlUsd:
        removeDecimals(totalLpUnrealizedPnl).multipliedBy(primaryQuotePriceUsd),
    },
  };
}
