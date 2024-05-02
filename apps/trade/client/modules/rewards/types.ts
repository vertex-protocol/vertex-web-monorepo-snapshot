import { BigDecimal } from '@vertex-protocol/utils';

export interface VrtxRewardEpoch {
  epochNumber: number;
  epochIntervalMillis: {
    from: number;
    to: number;
  };
  // Global properties
  totalRewards: BigDecimal;
  numEligibleAddresses: number;
  // % share of the subaccount rewards in the epoch
  subaccountShareFrac: BigDecimal;
  // Fees collected for the subaccount in terms of quote
  subaccountFees: BigDecimal;
  // From indexer
  subaccountRewards: {
    trading: BigDecimal;
    referrals: BigDecimal;
  };
  // Token claim state, on-chain, these fields can be nullable if on-chain data has not been initialized for the epoch
  subaccountTokenClaim: {
    totalEarned: BigDecimal | undefined;
    claimed: BigDecimal | undefined;
    claimDeadlineMillis: number | undefined;
  };
}
