import { BigDecimal } from '@vertex-protocol/client';
import { FuulReferralTier } from 'client/modules/referrals/types';

/**
 * Referral data from the Fuul SDK
 */
export interface AddressFuulReferralRewards {
  address: string;
  totalEarnedUsdc: BigDecimal;
  /**
   * This is null for new users - they're not on the leaderboard yet
   */
  rank: number | null;
  tier: FuulReferralTier;
  referredVolumeUsdc: BigDecimal;
  numReferredUsers: number;
}

/**
 * Claimable and claimed referral rewards from an onchain query
 */
export interface OnChainFuulReferralRewardsBalance {
  availableToClaim: BigDecimal;
  claimed: BigDecimal;
}

/**
 * Return type from the subgraph query
 */
export interface GraphUserFuulReferralRewardsBalance {
  availableToClaim: string;
  claimed: string;
}
