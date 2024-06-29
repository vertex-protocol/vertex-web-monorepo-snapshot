import { BigDecimal } from '@vertex-protocol/client';
import { ReferralTier } from 'client/modules/referrals/types';

/**
 * Referral data from the Fuul SDK
 */
export interface AddressReferralRewards {
  address: string;
  totalEarnedUsdc: BigDecimal;
  /**
   * This is null for new users - they're not on the leaderboard yet
   */
  rank: number | null;
  tier: ReferralTier;
  referredVolumeUsdc: BigDecimal;
  numReferredUsers: number;
}

/**
 * Claimable and claimed referral rewards from an onchain query
 */
export interface OnChainReferralRewardsBalance {
  availableToClaim: BigDecimal;
  claimed: BigDecimal;
}

/**
 * Return type from the subgraph query
 */
export interface GraphUserReferralRewardsBalance {
  availableToClaim: string;
  claimed: string;
}
