import { BigDecimal, toBigDecimal } from '@vertex-protocol/client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import {
  PerpsAiPaginatedLeaderboardResponse,
  PerpsAiServerLeaderboardItemResponse,
  usePerpsAiPaginatedLeaderboard,
} from 'client/pages/Leaderboard/hooks/usePerpsAiPaginatedLeaderboard';
import firstPlacePentagon from 'client/assets/leaderboard/first-place-pentagon.svg';
import secondPlacePentagon from 'client/assets/leaderboard/second-place-pentagon.svg';
import thirdPlacePentagon from 'client/assets/leaderboard/third-place-pentagon.svg';
import { useMemo } from 'react';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { SharedProductMetadata } from '@vertex-protocol/metadata';
import { PerpsAiServerLeaderboardTimespan } from 'client/pages/Leaderboard/types';
import { usePerpsAiVertexMarkets } from 'client/pages/Leaderboard/hooks/usePerpsAiVertexMarkets';

export interface LeaderboardTableItem {
  rankingData: {
    rank: BigDecimal;
    iconSrc: NextImageSrc | undefined;
  };
  address: string;
  realizedPnlUsd: BigDecimal;
  numTrades: BigDecimal;
  volumeUsd: BigDecimal;
  winRateFrac: BigDecimal;
  /**
   * All markets the user has traded.
   */
  tradedMarkets: SharedProductMetadata[];
  numActiveTrades: BigDecimal;
  unrealizedPnlUsd: BigDecimal;
  /**
   * PNL of the last 10 trades.
   */
  lastTradesPnl: BigDecimal[];
}

function extractItems(
  data: PerpsAiPaginatedLeaderboardResponse,
): PerpsAiServerLeaderboardItemResponse[] {
  return data.results;
}

const PAGE_SIZE = 50;

const iconSrcs: NextImageSrc[] = [
  firstPlacePentagon,
  secondPlacePentagon,
  thirdPlacePentagon,
];

export function useLeaderboardTable({
  timespan,
}: {
  timespan: PerpsAiServerLeaderboardTimespan;
}) {
  const { data: perpsAiMarketNameToMetadata } = usePerpsAiVertexMarkets();
  const {
    data: perpsAiLeaderboardStatsData,
    isLoading: leaderboardDataLoading,
    isFetchingNextPage,
    isFetching,
    fetchNextPage,
    hasNextPage,
  } = usePerpsAiPaginatedLeaderboard({
    pageSize: PAGE_SIZE,
    timespan: timespan,
  });

  const {
    pageCount,
    paginationState,
    setPaginationState,
    getPageData,
    isFetchingCurrPage,
  } = useDataTablePagination<
    PerpsAiPaginatedLeaderboardResponse,
    PerpsAiServerLeaderboardItemResponse
  >({
    numPagesFromQuery: perpsAiLeaderboardStatsData?.pages.length,
    pageSize: PAGE_SIZE,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const mappedData: LeaderboardTableItem[] | undefined = useMemo(() => {
    if (!perpsAiLeaderboardStatsData) {
      return;
    }

    return getPageData(perpsAiLeaderboardStatsData).map((account) => {
      const iconSrc = iconSrcs[account.rank - 1];

      const mappedMarkets = account.tokens
        .map((token) => {
          if (!perpsAiMarketNameToMetadata) {
            return;
          }

          const market = perpsAiMarketNameToMetadata[token];

          if (!market) {
            return;
          }

          return {
            marketName: market.marketName,
            symbol: market.symbol,
            icon: market.icon,
          };
        })
        .filter(nonNullFilter);

      const lastTrades = account.last_trades;

      const mappedLastTradesPnl = lastTrades.map((trade) => {
        return toBigDecimal(trade.realised_pnl ?? 0);
      });

      return {
        rankingData: {
          rank: toBigDecimal(account.rank),
          iconSrc,
        },
        address: account.account,
        realizedPnlUsd: toBigDecimal(account.realised_pnl ?? 0),
        numTrades: toBigDecimal(account.trades ?? 0),
        volumeUsd: toBigDecimal(account.volume ?? 0),
        winRateFrac: toBigDecimal(account.win_rate ?? 0),
        tradedMarkets: mappedMarkets,
        numActiveTrades: toBigDecimal(account.open_trades ?? 0),
        unrealizedPnlUsd: toBigDecimal(account.unrealised_pnl ?? 0),
        lastTradesPnl: mappedLastTradesPnl,
      };
    });
  }, [perpsAiLeaderboardStatsData, perpsAiMarketNameToMetadata, getPageData]);

  return {
    data: mappedData,
    isLoading: leaderboardDataLoading || isFetchingCurrPage,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
