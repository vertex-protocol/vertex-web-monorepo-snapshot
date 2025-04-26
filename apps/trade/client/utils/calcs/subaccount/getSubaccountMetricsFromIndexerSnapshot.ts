import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  calcIndexerLpBalanceValue,
  calcIndexerPerpBalanceValue,
  calcIndexerSpotBalanceValue,
  IndexerSubaccountSnapshot,
} from '@vertex-protocol/indexer-client';
import { BigDecimal, BigDecimals } from '@vertex-protocol/utils';
import { safeDiv } from '@vertex-protocol/web-common';
import { calcIndexerCumulativePerpEntryCost } from 'client/utils/calcs/perp/perpEntryCostCalcs';
import {
  calcIndexerSummaryCumulativeLpPnl,
  calcIndexerSummaryCumulativePnl,
  calcPnlFracForNonZeroDenom,
} from 'client/utils/calcs/pnlCalcs';

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
  cumulativeNetSpotInterestValue: BigDecimal;
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
  let cumulativeNetSpotInterestValue = BigDecimals.ZERO;
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

    // Calculate spot balance values, this also includes quote balances in an isolated position
    if (balanceType === ProductEngineType.SPOT) {
      const balanceValue = calcIndexerSpotBalanceValue(
        balance.state.postBalance,
        balanceMarket.product.oraclePrice,
      );
      if (balanceValue.gt(0)) {
        // Calculate positive deposit values
        totalDepositsValue = totalDepositsValue.plus(balanceValue);
      } else {
        // Calculate negative borrow values
        totalBorrowsValue = totalBorrowsValue.plus(balanceValue);
      }
      // increment cumulative spot interest in usd value at the time of snapshot
      cumulativeNetSpotInterestValue = cumulativeNetSpotInterestValue.plus(
        balance.trackedVars.netInterestCumulative.multipliedBy(
          balanceMarket.product.oraclePrice,
        ),
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

      const unsettledQuote = calcIndexerPerpBalanceValue(
        balance.state.postBalance,
        balanceMarket.product.oraclePrice,
      );
      portfolioValue = portfolioValue.plus(unsettledQuote);
      if (balance.isolated) {
        // We treat unsettled USDC for isolated positions as part of "total deposits" because we show (net margin = total margin + unsettled usdc) everywhere
        totalDepositsValue = totalDepositsValue.plus(unsettledQuote);
      }
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
    cumulativeNetSpotInterestValue,
    cumulativeTotalLpPnl,
    cumulativeTotalLpPnlFrac: calcPnlFracForNonZeroDenom(
      cumulativeTotalLpPnl,
      cumulativeLpEntryCost,
    ),
    totalLpValue,
  };
}
