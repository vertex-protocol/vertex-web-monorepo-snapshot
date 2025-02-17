import { useQuery } from '@tanstack/react-query';
import { createQueryKey } from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { NOT_CONNECTED_ALT_QUERY_ADDRESS } from 'client/hooks/query/consts/notConnectedAltQueryAddress';
import { useFuulReferralsContext } from 'client/modules/referrals/fuul/FuulReferralsContext';
import {
  GraphUserFuulReferralRewardsBalance,
  OnChainFuulReferralRewardsBalance,
} from 'client/modules/referrals/fuul/hooks/query/types';
import { toAddressOnChainFuulReferralRewardsBalance } from 'client/modules/referrals/fuul/hooks/query/utils';
import { first } from 'lodash';

interface AddressOnChainReferralRewardsResponse {
  data: {
    userBalances: GraphUserFuulReferralRewardsBalance[];
  };
}

export function addressOnChainFuulReferralRewardsQueryKey(sender?: string) {
  return createQueryKey('addressOnChainFuulReferralRewards', sender);
}

/**
 * Retrieves amount claimed & unclaimed referral rewards for the current user.
 */
export function useAddressOnChainFuulReferralRewards() {
  const { currentSubaccount } = useSubaccountContext();
  const { projectAddress, subgraphEndpoint } = useFuulReferralsContext();

  const addressForQuery =
    currentSubaccount.address ?? NOT_CONNECTED_ALT_QUERY_ADDRESS;

  return useQuery({
    queryKey: addressOnChainFuulReferralRewardsQueryKey(addressForQuery),
    queryFn: async (): Promise<OnChainFuulReferralRewardsBalance> => {
      const userBalancesGQLQuery = `
        {
          userBalances(
            where: {
              project_: {
                deployedAddress: "${projectAddress}"
              }
              owner:"${addressForQuery.toLowerCase()}"
            }
          ) {
            availableToClaim
            claimed
          }
        }
      `;

      const baseResponse = await fetch(subgraphEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query: userBalancesGQLQuery }),
      });

      const responseData: AddressOnChainReferralRewardsResponse =
        await baseResponse.json();

      const userBalance = first(responseData.data.userBalances);

      return toAddressOnChainFuulReferralRewardsBalance(userBalance);
    },
    refetchInterval: 10000,
  });
}
