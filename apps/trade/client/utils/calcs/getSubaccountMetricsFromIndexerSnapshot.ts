import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  calcIndexerLpBalanceValue,
  calcIndexerPerpBalanceValue,
  calcIndexerSpotBalanceValue,
  IndexerSubaccountSnapshot,
} from '@vertex-protocol/indexer-client';
import { BigDecimal, BigDecimals } from '@vertex-protocol/utils';
import {
  calcIndexerSummaryCumulativeLpPnl,
  calcIndexerSummaryCumulativePnl,
  calcPnlFracForNonZeroDenom,
} from 'client/utils/calcs/pnlCalcs';
import { safeDiv } from '../safeDiv';
import { calcBorrowAPR, calcDepositAPR } from './calcSpotApr';
import { calcIndexerCumulativePerpEntryCost } from './perpEntryCostCalcs';

// Values are NOT decimal adjusted
export interface IndexerSubaccountMetrics {
  // These metrics are in terms of quote (USDC) when valid
  portfolioValue: BigDecimal;
  // Pnls include both closed & open positions
  // Account wide
  cumulativeAccountPnl: BigDecimal;
  cumulativeAccountPnlFrac: BigDecimal | undefined;
  // Perp only
  cumulativeTotalPerpPnl: BigDecimal;
  cumulativeTotalPerpPnlFrac: BigDecimal | undefined;
  cumulativePerpFunding: BigDecimal;
  cumulativePerpFundingFrac: BigDecimal;
  // Spot Only
  totalNetSpotValue: BigDecimal;
  totalDepositsValue: BigDecimal;
  // Expect this to be negative as borrows have negative value
  totalBorrowsValue: BigDecimal;
  averageSpotApr: BigDecimal;
  cumulativeNetSpotInterest: BigDecimal;
  // LP
  cumulativeTotalLpPnl: BigDecimal;
  cumulativeTotalLpPnlFrac: BigDecimal | undefined;
  totalLpValue: BigDecimal;
}

export function getSubaccountMetricsFromIndexerSnapshot(
  indexerSnapshot: IndexerSubaccountSnapshot,
): IndexerSubaccountMetrics {
  let portfolioValue = BigDecimals.ZERO;
  let cumulativeAccountPnl = BigDecimals.ZERO;
  let cumulativeTotalPerpPnl = BigDecimals.ZERO;
  let cumulativePerpEntryCost = BigDecimals.ZERO;
  let cumulativePerpFunding = BigDecimals.ZERO;
  let cumulativePerpEntryCostWithLeverage = BigDecimals.ZERO;
  let totalDepositsValue = BigDecimals.ZERO;
  let totalBorrowsValue = BigDecimals.ZERO;
  let spotAprWeightedByValue = BigDecimals.ZERO;
  let cumulativeNetSpotInterest = BigDecimals.ZERO;
  let cumulativeTotalLpPnl = BigDecimals.ZERO;
  let cumulativeLpEntryCost = BigDecimals.ZERO;
  let totalLpValue = BigDecimals.ZERO;

  indexerSnapshot.balances.forEach((balance) => {
    const cumulativePnl = calcIndexerSummaryCumulativePnl(balance);

    cumulativeAccountPnl = cumulativeAccountPnl
      .plus(cumulativePnl)
      .plus(calcIndexerSummaryCumulativeLpPnl(balance));

    const balanceType = balance.state.type;
    const balanceMarket = balance.state.market;

    // Calculate LP balance values
    const lpValue = calcIndexerLpBalanceValue(
      balance.state.postBalance,
      balanceMarket,
    );
    portfolioValue = portfolioValue.plus(
      calcIndexerLpBalanceValue(balance.state.postBalance, balanceMarket),
    );
    totalLpValue = totalLpValue.plus(lpValue);
    cumulativeTotalLpPnl = cumulativeTotalLpPnl.plus(
      calcIndexerSummaryCumulativeLpPnl(balance),
    );
    cumulativeLpEntryCost = cumulativeLpEntryCost.plus(
      balance.trackedVars.netEntryLpCumulative,
    );

    // Calculate Spot balance values
    if (balanceType === ProductEngineType.SPOT) {
      const balanceValue = calcIndexerSpotBalanceValue(
        balance.state.postBalance,
        balanceMarket.product.oraclePrice,
      );
      if (balanceValue.gt(0)) {
        // Calculate positive deposit values
        totalDepositsValue = totalDepositsValue.plus(balanceValue);
        // Yearly interest rate
        const depositApr = calcDepositAPR(balance.state.market.product);
        spotAprWeightedByValue = spotAprWeightedByValue.plus(
          balanceValue.multipliedBy(depositApr),
        );
      } else {
        // Calculate negative borrow values
        totalBorrowsValue = totalBorrowsValue.plus(balanceValue);
        // Yearly interest rate
        const borrowApr = calcBorrowAPR(balance.state.market.product);
        spotAprWeightedByValue = spotAprWeightedByValue.plus(
          balanceValue.multipliedBy(borrowApr),
        );
      }
      cumulativeNetSpotInterest = cumulativeNetSpotInterest.plus(
        balance.trackedVars.netInterestCumulative,
      );
      portfolioValue = portfolioValue.plus(balanceValue);
    } else if (balanceType === ProductEngineType.PERP) {
      cumulativeTotalPerpPnl = cumulativeTotalPerpPnl.plus(cumulativePnl);

      cumulativePerpEntryCost = cumulativePerpEntryCost.plus(
        calcIndexerCumulativePerpEntryCost(balance),
      );

      cumulativePerpFunding = cumulativePerpFunding.plus(
        balance.trackedVars.netFundingCumulative,
      );

      cumulativePerpEntryCostWithLeverage =
        cumulativePerpEntryCostWithLeverage.plus(
          balance.trackedVars.netEntryCumulative.abs(),
        );
      portfolioValue = portfolioValue.plus(
        calcIndexerPerpBalanceValue(
          balance.state.postBalance,
          balanceMarket.product.oraclePrice,
        ),
      );
    }
  });

  return {
    portfolioValue,
    cumulativeAccountPnl,
    cumulativeAccountPnlFrac: calcPnlFracForNonZeroDenom(
      cumulativeAccountPnl,
      portfolioValue,
    ),
    cumulativeTotalPerpPnl,
    cumulativeTotalPerpPnlFrac: calcPnlFracForNonZeroDenom(
      cumulativeTotalPerpPnl,
      cumulativePerpEntryCost,
    ),
    cumulativePerpFunding,
    cumulativePerpFundingFrac: safeDiv(
      cumulativePerpFunding,
      cumulativePerpEntryCostWithLeverage,
    ),
    totalDepositsValue,
    totalBorrowsValue,
    totalNetSpotValue: totalDepositsValue.plus(totalBorrowsValue),
    cumulativeNetSpotInterest,
    averageSpotApr: safeDiv(
      spotAprWeightedByValue,
      totalDepositsValue.plus(totalBorrowsValue.abs()),
    ),
    cumulativeTotalLpPnl,
    cumulativeTotalLpPnlFrac: calcPnlFracForNonZeroDenom(
      cumulativeTotalLpPnl,
      cumulativeLpEntryCost,
    ),
    totalLpValue,
  };
}
