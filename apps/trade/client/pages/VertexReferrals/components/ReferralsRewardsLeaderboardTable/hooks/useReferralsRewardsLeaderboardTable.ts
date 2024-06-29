import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { AddressReferralRewards } from 'client/modules/referrals/hooks/query/types';
import {
  PaginatedReferralRewardsLeaderboardResponse,
  usePaginatedReferralRewardsLeaderboard,
} from 'client/modules/referrals/hooks/query/usePaginatedReferralRewardsLeaderboard';
import { useMemo } from 'react';

export type ReferralsRewardsLeaderboardTableItem = AddressReferralRewards;

function extractItems(
  data: PaginatedReferralRewardsLeaderboardResponse,
): AddressReferralRewards[] {
  return data.results;
}

export function useReferralsRewardsLeaderboardTable({
  pageSize = 20,
}: {
  pageSize?: number;
}) {
  const {
    data: paginatedReferralRewardsLeaderboardData,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = usePaginatedReferralRewardsLeaderboard({ pageSize });

  const { getPageData, pageCount, paginationState, setPaginationState } =
    useDataTablePagination<
      PaginatedReferralRewardsLeaderboardResponse,
      AddressReferralRewards
    >({
      pageSize,
      numPagesFromQuery: paginatedReferralRewardsLeaderboardData?.pages.length,
      hasNextPage,
      fetchNextPage,
      extractItems,
    });

  const mappedData: ReferralsRewardsLeaderboardTableItem[] = useMemo(
    () => getPageData(paginatedReferralRewardsLeaderboardData),
    [getPageData, paginatedReferralRewardsLeaderboardData],
  );

  return {
    data: mappedData,
    getPageData,
    isLoading: isLoading || isFetchingNextPage,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
