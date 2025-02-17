import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { AddressFuulReferralRewards } from 'client/modules/referrals/fuul/hooks/query/types';
import {
  PaginatedReferralRewardsLeaderboardResponse,
  usePaginatedFuulReferralRewardsLeaderboard,
} from 'client/modules/referrals/fuul/hooks/query/usePaginatedFuulReferralRewardsLeaderboard';
import { useMemo } from 'react';

const PAGE_SIZE = 20;

export type FuulReferralsRewardsLeaderboardTableItem =
  AddressFuulReferralRewards;

function extractItems(
  data: PaginatedReferralRewardsLeaderboardResponse,
): AddressFuulReferralRewards[] {
  return data.results;
}

export function useFuulReferralsRewardsLeaderboardTable() {
  const {
    data: paginatedReferralRewardsLeaderboardData,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
  } = usePaginatedFuulReferralRewardsLeaderboard({ pageSize: PAGE_SIZE });

  const {
    getPageData,
    pageCount,
    paginationState,
    setPaginationState,
    isFetchingCurrPage,
  } = useDataTablePagination<
    PaginatedReferralRewardsLeaderboardResponse,
    AddressFuulReferralRewards
  >({
    pageSize: PAGE_SIZE,
    numPagesFromQuery: paginatedReferralRewardsLeaderboardData?.pages.length,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const mappedData: FuulReferralsRewardsLeaderboardTableItem[] = useMemo(
    () => getPageData(paginatedReferralRewardsLeaderboardData),
    [getPageData, paginatedReferralRewardsLeaderboardData],
  );

  return {
    data: mappedData,
    getPageData,
    isLoading: isLoading || isFetchingCurrPage,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
