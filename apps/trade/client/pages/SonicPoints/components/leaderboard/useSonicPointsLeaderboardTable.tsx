import {
  BigDecimal,
  GetIndexerSonicPointsLeaderboardResponse,
  IndexerSonicPointsLeaderboardPosition,
} from '@vertex-protocol/client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import firstPlacePentagon from 'client/assets/leaderboard/first-place-pentagon.svg';
import secondPlacePentagon from 'client/assets/leaderboard/second-place-pentagon.svg';
import thirdPlacePentagon from 'client/assets/leaderboard/third-place-pentagon.svg';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { usePaginatedSonicPointsLeaderboard } from 'client/hooks/query/points/useSonicPointsLeaderboard';
import { useMemo } from 'react';

export interface SonicPointsLeaderboardItem {
  rankingData: {
    rank: BigDecimal;
    iconSrc: NextImageSrc | undefined;
  };
  address: string;
  totalVolume: BigDecimal;
  creditsEarned: BigDecimal;
}

function extractItems(
  data: GetIndexerSonicPointsLeaderboardResponse,
): IndexerSonicPointsLeaderboardPosition[] {
  return data.positions;
}

const PAGE_SIZE = 10;

const iconSrcs: NextImageSrc[] = [
  firstPlacePentagon,
  secondPlacePentagon,
  thirdPlacePentagon,
];

export function useSonicPointsLeaderboardTable() {
  const {
    data: sonicPointsLeaderboardData,
    isLoading: isSonicPointsLeaderboardDataLoading,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = usePaginatedSonicPointsLeaderboard({
    pageSize: PAGE_SIZE,
  });

  const {
    pageCount,
    paginationState,
    setPaginationState,
    getPageData,
    isFetchingCurrPage,
  } = useDataTablePagination<
    GetIndexerSonicPointsLeaderboardResponse,
    IndexerSonicPointsLeaderboardPosition
  >({
    numPagesFromQuery: sonicPointsLeaderboardData?.pages.length,
    pageSize: PAGE_SIZE,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const mappedData: SonicPointsLeaderboardItem[] | undefined = useMemo(() => {
    return getPageData(sonicPointsLeaderboardData).map((position) => {
      const iconSrc = iconSrcs[position.rank.toNumber() - 1];

      return {
        rankingData: {
          rank: position.rank,
          iconSrc,
        },
        totalVolume: position.takerVolume.plus(position.makerVolume),
        address: position.address,
        creditsEarned: position.referralPoints.plus(position.tradingPoints),
      };
    });
  }, [getPageData, sonicPointsLeaderboardData]);

  return {
    data: mappedData,
    isLoading: isSonicPointsLeaderboardDataLoading || isFetchingCurrPage,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
