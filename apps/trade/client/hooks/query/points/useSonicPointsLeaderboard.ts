import { useInfiniteQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  QueryDisabledError,
  useIsChainEnvType,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';

export function paginatedSonicPointsLeaderboardQueryKey(pageSize?: number) {
  return createQueryKey('SonicPointsLeaderboard', pageSize);
}

interface Params {
  pageSize: number;
}

export function usePaginatedSonicPointsLeaderboard({ pageSize }: Params) {
  const vertexClient = usePrimaryChainVertexClient();
  const { isSonic } = useIsChainEnvType();

  const disabled = !vertexClient || !isSonic;

  return useInfiniteQuery({
    queryKey: paginatedSonicPointsLeaderboardQueryKey(pageSize),
    initialPageParam: <string | undefined>undefined,
    queryFn: ({ pageParam }) => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      return vertexClient.context.indexerClient.getPaginatedSonicPointsLeaderboard(
        {
          limit: pageSize,
          startCursor: pageParam,
        },
      );
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
