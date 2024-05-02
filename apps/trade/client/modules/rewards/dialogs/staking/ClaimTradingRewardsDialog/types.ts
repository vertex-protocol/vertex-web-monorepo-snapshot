import { BigDecimal } from '@vertex-protocol/utils';

export interface ClaimTradingRewardsDialogParams {
  epochNumber: number;
  // Decimal adjusted
  claimableRewards: BigDecimal;
}
