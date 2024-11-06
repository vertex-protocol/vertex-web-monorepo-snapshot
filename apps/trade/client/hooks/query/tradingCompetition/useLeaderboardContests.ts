import { useQuery } from '@tanstack/react-query';
import {
  BigDecimal,
  ChainEnv,
  IndexerLeaderboardContest,
} from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useVertexClientForChainEnv,
} from '@vertex-protocol/react-client';
import { secondsToMilliseconds } from 'date-fns';

export function leaderboardContestsQueryKey(
  chainEnv?: ChainEnv,
  contestIds?: number[],
) {
  return createQueryKey('leaderboardContests', chainEnv, contestIds);
}

export interface LeaderboardContest extends IndexerLeaderboardContest {
  /**
   * Contests may require either a min. account value or min. product balance.
   * The API however uses the same property, `minRequiredAccountValue`, for both.
   * So this is a simple renaming of `minRequiredAccountValue` in order for it
   * to make more sense when used throughout the codebase.
   */
  minEligibilityThreshold: BigDecimal;
  startTimeMillis: number;
  endTimeMillis: number;
}

interface Params {
  chainEnv: ChainEnv;
  contestIds: number[] | undefined;
}

export function useLeaderboardContests({ chainEnv, contestIds }: Params) {
  const vertexClient = useVertexClientForChainEnv(chainEnv);

  const disabled = !vertexClient || !contestIds?.length;

  return useQuery({
    queryKey: leaderboardContestsQueryKey(chainEnv, contestIds),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const baseResponse =
        await vertexClient.context.indexerClient.getLeaderboardContests({
          contestIds,
        });

      const contests: LeaderboardContest[] = baseResponse.contests.map(
        (contest) => ({
          ...contest,
          minEligibilityThreshold: contest.minRequiredAccountValue,
          startTimeMillis: secondsToMilliseconds(contest.startTime.toNumber()),
          endTimeMillis: secondsToMilliseconds(contest.endTime.toNumber()),
        }),
      );

      return { contests };
    },
    enabled: !disabled,
    refetchInterval: 30000,
  });
}
