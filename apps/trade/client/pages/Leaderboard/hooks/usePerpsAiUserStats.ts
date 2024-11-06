import { useQuery } from '@tanstack/react-query';
import { createQueryKey } from '@vertex-protocol/react-client';
import { toBigDecimal } from '@vertex-protocol/utils';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { NOT_CONNECTED_ALT_QUERY_ADDRESS } from 'client/hooks/query/consts/notConnectedAltQueryAddress';
import { perpsAiFetch } from 'client/pages/Leaderboard/utils/perpsAiFetch';
import { first } from 'lodash';

/**
 * Traders with no trade history will have null returns. Wins, losses, and total_trades are returned as 0.
 *
 */
interface PerpsAiServerUserStatDetails {
  long_volume: number | null;
  short_volume: number | null;
  total_volume: number | null;
  losses: number;
  wins: number;
  total_collateral: number | null;
  total_pnl: number | null;
  total_trades: number;
  roi: number | null;
  markets: string[];
  platforms: string[];
}

interface PerpsAiServerUserStats {
  rank: number | null;
  stats: PerpsAiServerUserStatDetails;
}

export function usePerpsAiUserStats() {
  const {
    currentSubaccount: { address },
  } = useSubaccountContext();

  const addressForQuery = address ?? NOT_CONNECTED_ALT_QUERY_ADDRESS;

  return useQuery({
    queryKey: createQueryKey('perpsAiUserStats', addressForQuery),
    queryFn: async () => {
      const requestBody = {
        p_dex: 'Vertex',
        p_account: addressForQuery,
      };

      const baseResponse: PerpsAiServerUserStats[] = await perpsAiFetch({
        path: 'get_profile',
        reqBody: requestBody,
      });

      const perpsAiUserStats: PerpsAiServerUserStats | undefined =
        first(baseResponse);

      if (!perpsAiUserStats) {
        throw new Error('Invalid PerpsAi user stats data');
      }

      return {
        rank: perpsAiUserStats.rank,
        pnl: toBigDecimal(perpsAiUserStats.stats.total_pnl ?? 0),
        volume: toBigDecimal(perpsAiUserStats.stats.total_volume ?? 0),
      };
    },
  });
}
