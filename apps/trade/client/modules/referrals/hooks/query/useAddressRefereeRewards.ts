import { Fuul } from '@fuul/sdk';
import { useQuery } from '@tanstack/react-query';
import { createQueryKey } from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { REWARDS_NOT_CONNECTED_QUERY_ADDRESS } from 'client/hooks/query/consts/rewardsNotConnectedQueryAddress';
import { useFuulReferralsContext } from 'client/modules/referrals/context/FuulReferralsContext';
import { toAddressReferralRewards } from 'client/modules/referrals/hooks/query/utils';
import { first } from 'lodash';

export function addressRefereeRewardsQueryKey(address?: string) {
  return createQueryKey('addressRefereeRewards', address);
}

/**
 * Retrieves the rewards for the current user as a result of being referred by another user.
 * Our campaign is setup such that referred users get a 5% rebate on taker fees. This query returns that amount from Fuul.
 */
export function useAddressRefereeRewards() {
  const {
    currentSubaccount: { address },
  } = useSubaccountContext();
  const { payoutToken } = useFuulReferralsContext();

  const addressForQuery = address ?? REWARDS_NOT_CONNECTED_QUERY_ADDRESS;

  return useQuery({
    queryKey: addressRefereeRewardsQueryKey(addressForQuery),
    queryFn: async () => {
      const baseResponse = await Fuul.getPayoutsLeaderboard({
        page_size: 1,
        page: 1,
        user_address: addressForQuery,
        currency_address: payoutToken.address,
        user_type: 'end_user',
        fields: 'tier,referred_volume,referred_users',
      });

      const refereeRewards = first(baseResponse.results);

      return toAddressReferralRewards(refereeRewards);
    },
    refetchInterval: 10000,
  });
}
