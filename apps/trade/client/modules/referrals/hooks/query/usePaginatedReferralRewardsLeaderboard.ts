import { Fuul } from '@fuul/sdk';
import { useInfiniteQuery } from '@tanstack/react-query';
import { createQueryKey } from '@vertex-protocol/react-client';
import { useFuulReferralsContext } from 'client/modules/referrals/context/FuulReferralsContext';
import { AddressReferralRewards } from 'client/modules/referrals/hooks/query/types';
import { toAddressReferralRewards } from 'client/modules/referrals/hooks/query/utils';

export function paginatedReferralRewardsLeaderboardQueryKey(pageSize?: number) {
  return createQueryKey('paginatedReferralRewardsLeaderboard', pageSize);
}

interface Params {
  pageSize?: number;
}

export interface PaginatedReferralRewardsLeaderboardResponse {
  pageNumber: number;
  pageSize: number;
  totalResults: number;
  results: AddressReferralRewards[];
}

export function usePaginatedReferralRewardsLeaderboard({ pageSize }: Params) {
  const { payoutToken } = useFuulReferralsContext();

  return useInfiniteQuery({
    queryKey: paginatedReferralRewardsLeaderboardQueryKey(pageSize),
    initialPageParam: 1,
    queryFn: async ({
      pageParam,
    }): Promise<PaginatedReferralRewardsLeaderboardResponse> => {
      const response = await Fuul.getPayoutsLeaderboard({
        page_size: pageSize,
        page: pageParam,
        currency_address: payoutToken.address,
        user_type: 'affiliate',
        fields: 'tier,referred_volume,referred_users',
      });

      return {
        pageNumber: response.page,
        pageSize: response.page_size,
        totalResults: response.total_results,
        results: response.results.map(toAddressReferralRewards),
      };
    },
    getNextPageParam: (lastPage) => {
      const totalPages = Math.ceil(lastPage.totalResults / lastPage.pageSize);

      if (lastPage.pageNumber >= totalPages) {
        // No more entries
        return null;
      }

      return lastPage.pageNumber + 1;
    },
    refetchInterval: 60000,
  });
}
