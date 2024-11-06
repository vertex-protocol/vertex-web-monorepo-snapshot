import { useInfiniteQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useVertexClientForChainEnv,
} from '@vertex-protocol/react-client';

export function paginatedLeaderboardQueryKey(
  chainEnv?: ChainEnv,
  contestId?: number,
  pageSize?: number,
) {
  return createQueryKey('paginatedLeaderboard', chainEnv, contestId, pageSize);
}

interface Params {
  chainEnv: ChainEnv;
  contestId: number | undefined;
  pageSize: number;
}

export function usePaginatedLeaderboard({
  chainEnv,
  contestId,
  pageSize,
}: Params) {
  const vertexClient = useVertexClientForChainEnv(chainEnv);

  const disabled = !vertexClient || !contestId;

  return useInfiniteQuery({
    queryKey: paginatedLeaderboardQueryKey(chainEnv, contestId, pageSize),
    initialPageParam: <string | undefined>undefined,
    queryFn: ({ pageParam }) => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      return vertexClient.context.indexerClient.getPaginatedLeaderboard({
        contestId,
        rankType: 'roi',
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
