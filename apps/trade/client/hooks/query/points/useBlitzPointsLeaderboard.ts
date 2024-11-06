import { useInfiniteQuery } from '@tanstack/react-query';
import {
  createQueryKey,
  usePrimaryChainVertexClient,
  QueryDisabledError,
} from '@vertex-protocol/react-client';

export function paginatedBlitzPointsLeaderboardQueryKey(
  epoch?: number,
  pageSize?: number,
) {
  return createQueryKey('paginatedBlitzPointsLeaderboard', epoch, pageSize);
}

interface Params {
  epoch: number | undefined;
  pageSize: number;
}

export function usePaginatedBlitzPointsLeaderboard({
  epoch,
  pageSize,
}: Params) {
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient || !epoch;

  return useInfiniteQuery({
    queryKey: paginatedBlitzPointsLeaderboardQueryKey(epoch, pageSize),
    initialPageParam: <string | undefined>undefined,
    queryFn: ({ pageParam }) => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      return vertexClient.context.indexerClient.getPaginatedBlitzPointsLeaderboard(
        {
          limit: pageSize,
          epoch,
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
