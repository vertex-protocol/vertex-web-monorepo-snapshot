import { useInfiniteQuery } from '@tanstack/react-query';
import { IndexerLeaderboardRankType } from '@vertex-protocol/client';
import {
  createQueryKey,
  usePrimaryChainVertexClient,
  QueryDisabledError,
  usePrimaryChainId,
} from '@vertex-protocol/react-client';

export function paginatedLeaderboardQueryKey(
  primaryChainId?: number,
  contestId?: number,
  rankType?: IndexerLeaderboardRankType,
  pageSize?: number,
) {
  return createQueryKey(
    'paginatedLeaderboard',
    primaryChainId,
    contestId,
    rankType,
    pageSize,
  );
}

interface Params {
  contestId: number | undefined;
  rankType: IndexerLeaderboardRankType;
  pageSize: number;
}

export function usePaginatedLeaderboard({
  contestId,
  rankType,
  pageSize,
}: Params) {
  const vertexClient = usePrimaryChainVertexClient();
  const primaryChainId = usePrimaryChainId();

  const disabled = !vertexClient || !contestId;

  return useInfiniteQuery({
    queryKey: paginatedLeaderboardQueryKey(
      primaryChainId,
      contestId,
      rankType,
      pageSize,
    ),
    initialPageParam: <string | undefined>undefined,
    queryFn: ({ pageParam }) => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      return vertexClient.context.indexerClient.getPaginatedLeaderboard({
        contestId,
        rankType,
        limit: pageSize,
        startCursor: pageParam,
      });
    },
    getNextPageParam: (lastPage) => {
      if (lastPage == null || !lastPage.meta.nextCursor) {
        // No more entries
        return null;
      }
      return lastPage.meta.nextCursor;
    },
    enabled: !disabled,
    refetchInterval: 30000,
  });
}
