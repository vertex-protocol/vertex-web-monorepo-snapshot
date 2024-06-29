import { useInfiniteQuery } from '@tanstack/react-query';
import { GetIndexerSubaccountLpEventsParams } from '@vertex-protocol/indexer-client';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

export function currentSubaccountPaginatedLpEventsQueryKey(
  chainId?: PrimaryChainID,
  subaccountOwner?: string,
  subaccountName?: string,
  pageSize?: number,
) {
  return createQueryKey(
    'subaccountPaginatedLpEvents',
    chainId,
    subaccountOwner,
    subaccountName,
    pageSize,
  );
}

interface Params {
  pageSize?: number;
}

export function useSubaccountPaginatedLpEvents({ pageSize = 10 }: Params) {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = usePrimaryChainVertexClient();
  const {
    currentSubaccount: { address: subaccountOwner, name: subaccountName },
  } = useSubaccountContext();
  const disabled = !vertexClient || !subaccountOwner;
  return useInfiniteQuery({
    queryKey: currentSubaccountPaginatedLpEventsQueryKey(
      primaryChainId,
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
