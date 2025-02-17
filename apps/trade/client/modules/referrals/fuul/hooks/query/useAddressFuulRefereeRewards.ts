import { Fuul } from '@fuul/sdk';
import { useQuery } from '@tanstack/react-query';
import { createQueryKey } from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { NOT_CONNECTED_ALT_QUERY_ADDRESS } from 'client/hooks/query/consts/notConnectedAltQueryAddress';
import { useFuulReferralsContext } from 'client/modules/referrals/fuul/FuulReferralsContext';
import { toAddressFuulReferralRewards } from 'client/modules/referrals/fuul/hooks/query/utils';
import { first } from 'lodash';

export function addressFuulRefereeRewardsQueryKey(address?: string) {
  return createQueryKey('addressFuulRefereeRewards', address);
}

/**
 * Retrieves the rewards for the current user as a result of being referred by another user.
 * Our campaign is setup such that referred users get a 5% rebate on taker fees. This query returns that amount from Fuul.
 */
export function useAddressFuulRefereeRewards() {
  const {
    currentSubaccount: { address },
  } = useSubaccountContext();
  const { payoutToken } = useFuulReferralsContext();

  const addressForQuery = address ?? NOT_CONNECTED_ALT_QUERY_ADDRESS;

  return useQuery({
    queryKey: addressFuulRefereeRewardsQueryKey(addressForQuery),
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

      return toAddressFuulReferralRewards(refereeRewards);
    },
    refetchInterval: 10000,
  });
}
