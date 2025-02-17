import { PayoutsLeaderboard } from '@fuul/sdk/dist/types/api';
import { toBigDecimal } from '@vertex-protocol/client';
import {
  AddressFuulReferralRewards,
  GraphUserFuulReferralRewardsBalance,
  OnChainFuulReferralRewardsBalance,
} from 'client/modules/referrals/fuul/hooks/query/types';
import { FuulReferralTier } from 'client/modules/referrals/types';
import { zeroAddress } from 'viem';

export function toAddressFuulReferralRewards(
  data: PayoutsLeaderboard | undefined,
): AddressFuulReferralRewards {
  // If there is no data, return defaults
  if (!data) {
    return {
      address: zeroAddress,
      rank: null,
      totalEarnedUsdc: toBigDecimal(0),
      numReferredUsers: 0,
      tier: 'Tier 1' as FuulReferralTier,
      referredVolumeUsdc: toBigDecimal(0),
    };
  }

  return {
    address: data.address,
    rank: data.rank,
    totalEarnedUsdc: toBigDecimal(data.total_amount),
    numReferredUsers: Number(data.referred_users ?? 0),
    tier: (data.tiers?.Trade ?? 'Tier 1') as FuulReferralTier,
    referredVolumeUsdc: toBigDecimal(data.referred_volume ?? 0),
  };
}

export function toAddressOnChainFuulReferralRewardsBalance(
  data: GraphUserFuulReferralRewardsBalance | undefined,
): OnChainFuulReferralRewardsBalance {
  // If there is no data, return defaults
  if (!data) {
    return {
      availableToClaim: toBigDecimal(0),
      claimed: toBigDecimal(0),
    };
  }
  return {
    availableToClaim: toBigDecimal(data.availableToClaim),
    claimed: toBigDecimal(data.claimed),
  };
}
