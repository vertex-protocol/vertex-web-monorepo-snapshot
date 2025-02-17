import { Fuul } from '@fuul/sdk';
import { useInfiniteQuery } from '@tanstack/react-query';
import { createQueryKey } from '@vertex-protocol/react-client';
import { useFuulReferralsContext } from 'client/modules/referrals/fuul/FuulReferralsContext';
import { AddressFuulReferralRewards } from 'client/modules/referrals/fuul/hooks/query/types';
import { toAddressFuulReferralRewards } from 'client/modules/referrals/fuul/hooks/query/utils';

function paginatedFuulReferralRewardsLeaderboardQueryKey(pageSize?: number) {
  return createQueryKey('paginatedFuulReferralRewardsLeaderboard', pageSize);
}

interface Params {
  pageSize?: number;
}

export interface PaginatedReferralRewardsLeaderboardResponse {
  pageNumber: number;
  pageSize: number;
  totalResults: number;
  results: AddressFuulReferralRewards[];
}

export function usePaginatedFuulReferralRewardsLeaderboard({
  pageSize,
}: Params) {
  const { payoutToken } = useFuulReferralsContext();

  return useInfiniteQuery({
    queryKey: paginatedFuulReferralRewardsLeaderboardQueryKey(pageSize),
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
        results: response.results.map(toAddressFuulReferralRewards),
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
