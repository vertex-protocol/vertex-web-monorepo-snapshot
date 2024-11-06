import { useInfiniteQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { GetIndexerSubaccountLpEventsParams } from '@vertex-protocol/indexer-client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

export function currentSubaccountPaginatedLpEventsQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
  pageSize?: number,
) {
  return createQueryKey(
    'subaccountPaginatedLpEvents',
    chainEnv,
    subaccountOwner,
    subaccountName,
    pageSize,
  );
}

interface Params {
  pageSize?: number;
}

export function useSubaccountPaginatedLpEvents({ pageSize = 10 }: Params) {
  const vertexClient = usePrimaryChainVertexClient();
  const {
    currentSubaccount: {
      address: subaccountOwner,
      name: subaccountName,
      chainEnv,
    },
  } = useSubaccountContext();
  const disabled = !vertexClient || !subaccountOwner;
  return useInfiniteQuery({
    queryKey: currentSubaccountPaginatedLpEventsQueryKey(
      chainEnv,
      subaccountOwner,
      subaccountName,
      pageSize,
    ),
    initialPageParam: <string | undefined>undefined,
    queryFn: async ({ pageParam }) => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      const params: GetIndexerSubaccountLpEventsParams = {
        subaccountOwner,
        subaccountName,
        limit: pageSize,
        startCursor: pageParam,
      };
      return vertexClient.context.indexerClient.getPaginatedSubaccountLpEvents(
        params,
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
  });
}
