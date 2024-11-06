import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { AddressReferralRewards } from 'client/modules/referrals/hooks/query/types';
import {
  PaginatedReferralRewardsLeaderboardResponse,
  usePaginatedReferralRewardsLeaderboard,
} from 'client/modules/referrals/hooks/query/usePaginatedReferralRewardsLeaderboard';
import { useMemo } from 'react';

const PAGE_SIZE = 20;

export type ReferralsRewardsLeaderboardTableItem = AddressReferralRewards;

function extractItems(
  data: PaginatedReferralRewardsLeaderboardResponse,
): AddressReferralRewards[] {
  return data.results;
}

export function useReferralsRewardsLeaderboardTable() {
  const {
    data: paginatedReferralRewardsLeaderboardData,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
  } = usePaginatedReferralRewardsLeaderboard({ pageSize: PAGE_SIZE });

  const {
    getPageData,
    pageCount,
    paginationState,
    setPaginationState,
    isFetchingCurrPage,
  } = useDataTablePagination<
    PaginatedReferralRewardsLeaderboardResponse,
    AddressReferralRewards
  >({
    pageSize: PAGE_SIZE,
    numPagesFromQuery: paginatedReferralRewardsLeaderboardData?.pages.length,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const mappedData: ReferralsRewardsLeaderboardTableItem[] = useMemo(
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
