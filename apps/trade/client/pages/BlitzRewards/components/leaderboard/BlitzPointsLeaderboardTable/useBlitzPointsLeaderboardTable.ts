import {
  BigDecimal,
  GetIndexerBlitzPointsLeaderboardResponse,
  IndexerBlitzPointsLeaderboardPosition,
} from '@vertex-protocol/client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import firstPlacePentagon from 'client/assets/leaderboard/first-place-pentagon.svg';
import secondPlacePentagon from 'client/assets/leaderboard/second-place-pentagon.svg';
import thirdPlacePentagon from 'client/assets/leaderboard/third-place-pentagon.svg';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { usePaginatedBlitzPointsLeaderboard } from 'client/hooks/query/points/useBlitzPointsLeaderboard';
import { useMemo } from 'react';

export interface BlitzPointsLeaderboardTableItem {
  rankingData: {
    rank: BigDecimal;
    iconSrc: NextImageSrc | undefined;
  };
  address: string;
  totalVolume: BigDecimal;
  totalBlitzPoints: BigDecimal;
}

function extractItems(
  data: GetIndexerBlitzPointsLeaderboardResponse,
): IndexerBlitzPointsLeaderboardPosition[] {
  return data.positions;
}

const PAGE_SIZE = 10;

const iconSrcs: NextImageSrc[] = [
  firstPlacePentagon,
  secondPlacePentagon,
  thirdPlacePentagon,
];

interface Params {
  epoch: number | undefined;
}

export function useBlitzPointsLeaderboardTable({ epoch }: Params) {
  const {
    data: blitzPointsLeaderboardData,
    isLoading: isBlitzPointsLeaderboardDataLoading,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = usePaginatedBlitzPointsLeaderboard({
    pageSize: PAGE_SIZE,
    epoch,
  });

  const {
    pageCount,
    paginationState,
    setPaginationState,
    getPageData,
    isFetchingCurrPage,
  } = useDataTablePagination<
    GetIndexerBlitzPointsLeaderboardResponse,
    IndexerBlitzPointsLeaderboardPosition
  >({
    numPagesFromQuery: blitzPointsLeaderboardData?.pages.length,
    pageSize: PAGE_SIZE,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const mappedData: BlitzPointsLeaderboardTableItem[] | undefined =
    useMemo(() => {
      if (!blitzPointsLeaderboardData) {
        return;
      }

      return getPageData(blitzPointsLeaderboardData).map((position) => {
        const iconSrc = iconSrcs[position.rank.toNumber() - 1];

        return {
          rankingData: {
            rank: position.rank,
            iconSrc,
          },
          address: position.address,
          totalVolume: position.takerVolume.plus(position.makerVolume),
          totalBlitzPoints: position.referralPoints.plus(
            position.tradingPoints,
          ),
        };
      });
    }, [blitzPointsLeaderboardData, getPageData]);

  return {
    data: mappedData,
    isLoading: isBlitzPointsLeaderboardDataLoading || isFetchingCurrPage,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
