import { BigDecimal } from '@vertex-protocol/utils';

export interface SubaccountOverview {
  // Includes both cross & isolated
  portfolioValueUsd: BigDecimal;
  accountLeverage: BigDecimal;
  // Max of 1
  marginUsageFractionBounded: BigDecimal;
  // Max of 1
  liquidationRiskFractionBounded: BigDecimal;
  // Min of 0, Maint health
  fundsUntilLiquidationBoundedUsd: BigDecimal;
  // Min of 0, Initial health
  fundsAvailableBoundedUsd: BigDecimal;
  spot: {
    // Includes both cross & isolated total net margin
    netTotalBalanceUsd: BigDecimal;
    netCrossBalanceUsd: BigDecimal;
    totalBorrowsValueUsd: BigDecimal;
    totalDepositsValueUsd: BigDecimal;
    averageBorrowAPRFraction: BigDecimal;
    averageDepositAPRFraction: BigDecimal;
    averageAPRFraction: BigDecimal;
    totalNetInterestCumulativeUsd: BigDecimal;
  };
  perp: {
    totalNotionalValueUsd: BigDecimal;
    // Calculated with "fast" oracle prices
    totalUnrealizedPnlUsd: BigDecimal;
    totalCumulativePnlUsd: BigDecimal;
    totalUnrealizedPnlFrac: BigDecimal;
    cross: {
      totalNotionalValueUsd: BigDecimal;
      totalUnsettledQuote: BigDecimal;
      // Calculated with "fast" oracle prices
      totalUnrealizedPnlUsd: BigDecimal;
      totalCumulativePnlUsd: BigDecimal;
      totalUnrealizedPnlFrac: BigDecimal;
      totalMarginUsedUsd: BigDecimal;
    };
    iso: {
      totalNotionalValueUsd: BigDecimal;
      totalNetMarginUsd: BigDecimal;
      // Calculated with "fast" oracle prices
      totalUnrealizedPnlUsd: BigDecimal;
      totalCumulativePnlUsd: BigDecimal;
      totalUnrealizedPnlFrac: BigDecimal;
    };
  };
  lp: {
    totalValueUsd: BigDecimal;
    averageYieldFraction: BigDecimal;
    totalUnrealizedPnlUsd: BigDecimal;
  };
}
