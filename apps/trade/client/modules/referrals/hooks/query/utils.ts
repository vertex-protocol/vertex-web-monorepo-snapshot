import { PayoutsLeaderboard } from '@fuul/sdk/dist/types/api';
import { toBigDecimal } from '@vertex-protocol/client';
import {
  AddressReferralRewards,
  GraphUserReferralRewardsBalance,
  OnChainReferralRewardsBalance,
} from 'client/modules/referrals/hooks/query/types';
import { ReferralTier } from 'client/modules/referrals/types';
import { ZeroAddress } from 'ethers';

export function toAddressReferralRewards(
  data: PayoutsLeaderboard | undefined,
): AddressReferralRewards {
  // If there is no data, return defaults
  if (!data) {
    return {
      address: ZeroAddress,
      rank: null,
      totalEarnedUsdc: toBigDecimal(0),
      numReferredUsers: 0,
      tier: 'Tier 1' as ReferralTier,
      referredVolumeUsdc: toBigDecimal(0),
    };
  }

  return {
    address: data.address,
    rank: data.rank,
    totalEarnedUsdc: toBigDecimal(data.total_amount),
    numReferredUsers: Number(data.referred_users ?? 0),
    tier: (data.tiers?.Trade ?? 'Tier 1') as ReferralTier,
    referredVolumeUsdc: toBigDecimal(data.referred_volume ?? 0),
  };
}

export function toAddressOnChainReferralRewardsBalance(
  data: GraphUserReferralRewardsBalance | undefined,
): OnChainReferralRewardsBalance {
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
