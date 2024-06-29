import { useQuery } from '@tanstack/react-query';
import { IndexerLeaderboardContest } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { secondsToMilliseconds } from 'date-fns';

export function leaderboardContestsQueryKey(
  primaryChainId?: number,
  contestIds?: number[],
) {
  return createQueryKey('leaderboardContests', primaryChainId, contestIds);
}

export interface LeaderboardContest extends IndexerLeaderboardContest {
  startTimeMillis: number;
  endTimeMillis: number;
}

interface Params {
  contestIds: number[] | undefined;
}

export function useLeaderboardContests({ contestIds }: Params) {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient || !contestIds?.length;

  return useQuery({
    queryKey: leaderboardContestsQueryKey(primaryChainId, contestIds),
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
