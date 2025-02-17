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
   * Contests may require either a min. account value, min. product balance, or
   * min. staked VRTX amount.
   * The API uses `minRequiredAccountValue` for min. account value & min. product
   * balance and `minRequiredStakedVrtx` for min. staked VRTX amount.
   * We map these separate values to this single property for ease of use.
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
        (contest) => {
          const {
            minRequiredStakedVrtx,
            minRequiredAccountValue,
            startTime,
            endTime,
          } = contest;

          return {
            ...contest,
            minEligibilityThreshold: minRequiredStakedVrtx.isZero()
              ? minRequiredAccountValue
              : minRequiredStakedVrtx,
            startTimeMillis: secondsToMilliseconds(startTime.toNumber()),
            endTimeMillis: secondsToMilliseconds(endTime.toNumber()),
          };
        },
      );

      return { contests };
    },
    enabled: !disabled,
  });
}
