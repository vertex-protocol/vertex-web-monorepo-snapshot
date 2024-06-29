import { useQuery } from '@tanstack/react-query';
import { createQueryKey } from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { REWARDS_NOT_CONNECTED_QUERY_ADDRESS } from 'client/hooks/query/consts/rewardsNotConnectedQueryAddress';
import { useFuulReferralsContext } from 'client/modules/referrals/context/FuulReferralsContext';
import {
  GraphUserReferralRewardsBalance,
  OnChainReferralRewardsBalance,
} from 'client/modules/referrals/hooks/query/types';
import { toAddressOnChainReferralRewardsBalance } from 'client/modules/referrals/hooks/query/utils';
import { first } from 'lodash';

interface AddressOnChainReferralRewardsResponse {
  data: {
    userBalances: GraphUserReferralRewardsBalance[];
  };
}

export function addressOnChainReferralRewardsQueryKey(sender?: string) {
  return createQueryKey('addressOnChainReferralRewards', sender);
}

/**
 * Retrieves amount claimed & unclaimed referral rewards for the current user.
 */
export function useAddressOnChainReferralRewards() {
  const { currentSubaccount } = useSubaccountContext();
  const { projectAddress, subgraphEndpoint } = useFuulReferralsContext();

  const addressForQuery =
    currentSubaccount.address ?? REWARDS_NOT_CONNECTED_QUERY_ADDRESS;

  return useQuery({
    queryKey: addressOnChainReferralRewardsQueryKey(addressForQuery),
    queryFn: async (): Promise<OnChainReferralRewardsBalance> => {
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

      return toAddressOnChainReferralRewardsBalance(userBalance);
    },
    refetchInterval: 10000,
  });
}
