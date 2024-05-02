import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  calcLpBalanceValue,
  calcSpotBalanceValue,
  calcSubaccountLeverage,
  calcSubaccountMarginUsageFractions,
  calcTotalPortfolioValues,
  ProductEngineType,
} from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { createQueryKey } from '@vertex-protocol/web-data';
import { useLpYields } from 'client/hooks/markets/useLpYields';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useLatestOraclePrices } from 'client/hooks/query/markets/useLatestOraclePrices';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { useCurrentSubaccountSummary } from 'client/hooks/query/subaccount/useCurrentSubaccountSummary';
import { useSubaccountIndexerSnapshot } from 'client/hooks/subaccount/useSubaccountIndexerSnapshot';
import { QueryState } from 'client/types/QueryState';
import { BigDecimals } from 'client/utils/BigDecimals';
import { calcPositionMarginWithoutPnl } from 'client/utils/calcs/calcPositionMarginWithoutPnl';
import { calcBorrowAPR, calcDepositAPR } from 'client/utils/calcs/calcSpotApr';
import { calcIndexerUnrealizedPerpEntryCost } from 'client/utils/calcs/perpEntryCostCalcs';
import {
  calcIndexerSummaryCumulativePnl,
  calcIndexerSummaryUnrealizedLpPnl,
  calcIndexerSummaryUnrealizedPnl,
  calcPnlFrac,
} from 'client/utils/calcs/pnlCalcs';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { REACT_QUERY_CONFIG } from 'client/utils/reactQueryConfig';
import { safeDiv } from 'client/utils/safeDiv';
import { mapValues } from 'lodash';

export interface DerivedSubaccountOverviewData {
  portfolioValueUsd: BigDecimal;
  accountLeverage: BigDecimal;
  // Max of 1
  marginUsageFractionBounded: BigDecimal;
  // Max of 1
  liquidationRiskFractionBounded: BigDecimal;
  // Min of 0, Maint health
  fundsUntilLiquidationBounded: BigDecimal;
  // Min of 0, Initial health
  fundsAvailableBounded: BigDecimal;
  spot: {
    netBalance: BigDecimal;
    totalBorrowsValueUsd: BigDecimal;
    totalDepositsValueUsd: BigDecimal;
    averageBorrowAPRFraction: BigDecimal;
    averageDepositAPRFraction: BigDecimal;
    averageAPRFraction: BigDecimal;
  };
  perp: {
    totalNotionalValueUsd: BigDecimal;
    totalUnsettledQuote: BigDecimal;
    // Calculated with "fast" oracle prices
    totalUnrealizedPnlUsd: BigDecimal;
    totalCumulativePnlUsd: BigDecimal;
    totalUnrealizedPnlFrac: BigDecimal;
    totalMarginUsedUsd: BigDecimal;
  };
  lp: {
    totalValueUsd: BigDecimal;
    averageYieldFraction: BigDecimal;
    totalUnrealizedPnlUsd: BigDecimal;
  };
}

function derivedSubaccountOverviewQueryKey(
  // Last update times for important queries
  dataUpdateTimes: number[],
  // Used for unimportant queries
  hasOraclePriceData: boolean,
  hasLpYieldData: boolean,
) {
  return createQueryKey(
    'derivedSubaccountOverview',
    dataUpdateTimes,
    hasOraclePriceData,
    hasLpYieldData,
  );
}

/**
 * A util hook to create commonly used derived data from the current subaccount summary
 */
export function useDerivedSubaccountOverview(): QueryState<DerivedSubaccountOverviewData> {
  const { data, dataUpdatedAt, ...rest } = useCurrentSubaccountSummary();
  const quotePrice = useQuotePriceUsd();

  // Optional queries
  const { data: indexerSnapshot, dataUpdatedAt: indexerSnapshotUpdatedAt } =
    useSubaccountIndexerSnapshot();
  const { data: lpYields } = useLpYields();
  const { data: latestOraclePrices } = useLatestOraclePrices();

  const disabled = !data;

  const queryFn = (): DerivedSubaccountOverviewData => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    // Spot
    let totalBorrowsValue = BigDecimals.ZERO;
    let totalDepositsValue = BigDecimals.ZERO;
    let depositAPRWeightedByValue = BigDecimals.ZERO;
    // This SHOULD be negative to calculate average interest rate across borrow/deposit
    let borrowAPRWeightedByValue = BigDecimals.ZERO;
    // Perp
    let totalPerpCollateralUsed = BigDecimals.ZERO;
    let totalPerpUnrealizedPnl = BigDecimals.ZERO;
    let totalPerpCumulativePnl = BigDecimals.ZERO;
    let totalPerpUnrealizedEntryCost = BigDecimals.ZERO;
    // LP
    let totalLpValue = BigDecimals.ZERO;
    let lpYieldWeightedByValue = BigDecimals.ZERO;
    let totalLpUnrealizedPnl = BigDecimals.ZERO;

    /**
     * Subaccount calcs
     */
    const marginUsageFractions = calcSubaccountMarginUsageFractions(data);
    const decimalAdjustedInitialHealth = removeDecimals(
      data.health.initial.health,
    );
    const decimalAdjustedMaintHealth = removeDecimals(
      data.health.maintenance.health,
    );
    const decimalAdjustedTotalPortfolioValues = mapValues(
      calcTotalPortfolioValues(data),
      (val) => removeDecimals(val),
    );

    // Iterate through balances to get totals for
    // spot markets, perp markets, and lp exclusively
    data.balances.forEach((balance) => {
      const indexerBalance = indexerSnapshot?.balances.find(
        (bal) => bal.productId === balance.productId,
      );

      /**
       * Spot calcs
       */
      if (balance.type === ProductEngineType.SPOT) {
        // Positive for deposits, negative for borrows
        const spotValue = removeDecimals(calcSpotBalanceValue(balance));

        const depositAPR = calcDepositAPR(balance);
        const borrowAPR = calcBorrowAPR(balance);

        if (spotValue.lt(0)) {
          totalBorrowsValue = totalBorrowsValue.plus(spotValue);
          borrowAPRWeightedByValue = borrowAPRWeightedByValue.plus(
            borrowAPR.multipliedBy(spotValue),
          );
        } else if (spotValue.gt(0)) {
          totalDepositsValue = totalDepositsValue.plus(spotValue);
          depositAPRWeightedByValue = depositAPRWeightedByValue.plus(
            depositAPR.multipliedBy(spotValue),
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

        totalPerpCollateralUsed = totalPerpCollateralUsed.plus(
          calcPositionMarginWithoutPnl(balance),
        );

        if (indexerBalance) {
          const unrealizedPnl = calcIndexerSummaryUnrealizedPnl(
            indexerBalance,
            oraclePrice,
          );
          const cumulativePnl = calcIndexerSummaryCumulativePnl(indexerBalance);

          totalPerpCumulativePnl = totalPerpCumulativePnl.plus(cumulativePnl);
          totalPerpUnrealizedPnl = totalPerpUnrealizedPnl.plus(unrealizedPnl);
          totalPerpUnrealizedEntryCost = totalPerpUnrealizedEntryCost.plus(
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

    // Spot
    const totalAbsSpotValue = totalDepositsValue.plus(totalBorrowsValue.abs());
    const totalAPRWeightedByValue = depositAPRWeightedByValue.plus(
      borrowAPRWeightedByValue,
    );
    const averageDepositAPR = safeDiv(
      depositAPRWeightedByValue,
      totalDepositsValue,
    );
    const averageBorrowAPR = safeDiv(
      borrowAPRWeightedByValue,
      totalBorrowsValue,
    );
    const averageSpotAPR = safeDiv(totalAPRWeightedByValue, totalAbsSpotValue);

    // Perp
    const decimalAdjustedTotalPerpEntryCost = removeDecimals(
      totalPerpUnrealizedEntryCost,
    );
    const decimalAdjustedTotalPerpUnrealizedPnl = removeDecimals(
      totalPerpUnrealizedPnl,
    );
    const decimalAdjustedTotalPerpCumulativePnl = removeDecimals(
      totalPerpCumulativePnl,
    );
    const totalUnrealizedPnlFrac = calcPnlFrac(
      decimalAdjustedTotalPerpUnrealizedPnl,
      decimalAdjustedTotalPerpEntryCost,
    );

    return {
      accountLeverage: calcSubaccountLeverage(data),
      marginUsageFractionBounded: marginUsageFractions.initial,
      liquidationRiskFractionBounded: marginUsageFractions.maintenance,
      portfolioValueUsd:
        decimalAdjustedTotalPortfolioValues.netTotal.multipliedBy(quotePrice),
      fundsAvailableBounded: BigDecimal.max(
        0,
        decimalAdjustedInitialHealth.multipliedBy(quotePrice),
      ),
      fundsUntilLiquidationBounded: BigDecimal.max(
        0,
        decimalAdjustedMaintHealth.multipliedBy(quotePrice),
      ),
      spot: {
        netBalance: decimalAdjustedTotalPortfolioValues.spot,
        totalBorrowsValueUsd: totalBorrowsValue.multipliedBy(quotePrice),
        totalDepositsValueUsd: totalDepositsValue.multipliedBy(quotePrice),
        averageBorrowAPRFraction: averageBorrowAPR,
        averageDepositAPRFraction: averageDepositAPR,
        averageAPRFraction: averageSpotAPR,
      },
      perp: {
        totalNotionalValueUsd:
          decimalAdjustedTotalPortfolioValues.perpNotional.multipliedBy(
            quotePrice,
          ),
        totalUnsettledQuote: decimalAdjustedTotalPortfolioValues.perp,
        totalCumulativePnlUsd:
          decimalAdjustedTotalPerpCumulativePnl.multipliedBy(quotePrice),
        totalUnrealizedPnlUsd:
          decimalAdjustedTotalPerpUnrealizedPnl.multipliedBy(quotePrice),
        totalUnrealizedPnlFrac,
        totalMarginUsedUsd: removeDecimals(
          totalPerpCollateralUsed,
        ).multipliedBy(quotePrice),
      },
      lp: {
        totalValueUsd: removeDecimals(totalLpValue).multipliedBy(quotePrice),
        averageYieldFraction: safeDiv(lpYieldWeightedByValue, totalLpValue),
        totalUnrealizedPnlUsd:
          removeDecimals(totalLpUnrealizedPnl).multipliedBy(quotePrice),
      },
    };
  };

  const { data: mappedData } = useQuery({
    queryKey: derivedSubaccountOverviewQueryKey(
      [dataUpdatedAt, indexerSnapshotUpdatedAt],
      !!latestOraclePrices,
      !!lpYields,
    ),
    queryFn,
    // Prevents a "flash" in UI when query key changes, which occurs when subaccount overview data updates
    placeholderData: keepPreviousData,
    enabled: !disabled,
    gcTime: REACT_QUERY_CONFIG.computeQueryGcTime,
  });

  return {
    data: mappedData,
    ...rest,
  };
}
