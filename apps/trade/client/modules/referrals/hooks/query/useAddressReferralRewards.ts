import { Fuul } from '@fuul/sdk';
import { useQuery } from '@tanstack/react-query';
import { createQueryKey } from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { NOT_CONNECTED_ALT_QUERY_ADDRESS } from 'client/hooks/query/consts/notConnectedAltQueryAddress';
import { useFuulReferralsContext } from 'client/modules/referrals/context/FuulReferralsContext';
import { AddressReferralRewards } from 'client/modules/referrals/hooks/query/types';
import { toAddressReferralRewards } from 'client/modules/referrals/hooks/query/utils';
import { first } from 'lodash';

export function addressReferralRewardsQueryKey(address?: string) {
  return createQueryKey('addressReferralRewards', address);
}

/**
 * Returns referral data for the current user from the Fuul SDK. For empty accounts, there will be no data so a set of defaults are returned.
 */
export function useAddressReferralRewards() {
  const {
    currentSubaccount: { address },
  } = useSubaccountContext();
  const { payoutToken } = useFuulReferralsContext();

  const addressForQuery = address ?? NOT_CONNECTED_ALT_QUERY_ADDRESS;

  return useQuery({
    queryKey: addressReferralRewardsQueryKey(addressForQuery),
    queryFn: async (): Promise<AddressReferralRewards> => {
      const referralRewardsResponse = await Fuul.getPayoutsLeaderboard({
        page_size: 1,
        page: 1,
        user_address: addressForQuery,
        currency_address: payoutToken.address,
        user_type: 'affiliate',
        fields: 'tier,referred_volume,referred_users',
      });

      const referralRewards = first(referralRewardsResponse.results);

      return toAddressReferralRewards(referralRewards);
    },
    refetchInterval: 10000,
  });
}
