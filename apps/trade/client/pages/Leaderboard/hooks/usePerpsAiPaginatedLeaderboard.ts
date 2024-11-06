import { useInfiniteQuery } from '@tanstack/react-query';
import { createQueryKey } from '@vertex-protocol/react-client';
import { PerpsAiServerLeaderboardTimespan } from 'client/pages/Leaderboard/types';
import { perpsAiFetch } from 'client/pages/Leaderboard/utils/perpsAiFetch';

interface PerpsAiServerTrades {
  close_ts: string;
  realised_pnl: number;
}

export interface PerpsAiServerLeaderboardItemResponse {
  rank: number;
  account: string;
  ens_name: string | null;
  display_name: string | null;
  twitter_name: string | null;
  volume: number;
  realised_pnl: number;
  unrealised_pnl: number;
  chains: string[];
  tokens: string[];
  trades: number;
  record_profit: number;
  collateral: number | null;
  roi: number | null;
  win_rate: number;
  open_trades: number;
  last_trades: PerpsAiServerTrades[];
  timeframe_trades: PerpsAiServerTrades[];
}

export interface PerpsAiPaginatedLeaderboardResponse {
  pageSize: number;
  results: PerpsAiServerLeaderboardItemResponse[];
}

interface Params {
  pageSize: number;
  timespan: PerpsAiServerLeaderboardTimespan;
}

export function usePerpsAiPaginatedLeaderboard({ pageSize, timespan }: Params) {
  return useInfiniteQuery({
    queryKey: createQueryKey('perpsAiLeaderboardStats', pageSize, timespan),
    initialPageParam: 1,
    queryFn: async ({
      pageParam,
    }): Promise<PerpsAiPaginatedLeaderboardResponse> => {
      const requestBody = {
        p_page: pageParam,
        p_items_per_page: pageSize,
        p_timeframe: timespan,
        p_order_by: 'pnl',
        p_sort_ascending: true,
        p_chains: 'any',
        p_dex: 'Vertex',
      };

      const baseResponse: PerpsAiServerLeaderboardItemResponse[] =
        await perpsAiFetch({
          path: 'get_leaderboard_page_in_timeframe',
          reqBody: requestBody,
        });

      return {
        pageSize: baseResponse.length,
        results: baseResponse,
      };
    },
    getNextPageParam: (lastPage, allPages) => {
      // PerpsAi doesn't return a totalNumberOfEntries datapoint so this is a hack, there's an edge case where if number of items === page size, we wouldn't be able to tell that the next page is empty
      if (lastPage.pageSize < pageSize) {
        return null;
      }
      return allPages.length + 1;
    },
  });
}
