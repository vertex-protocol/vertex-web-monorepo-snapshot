import { useInfiniteQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { GetIndexerSubaccountSettlementEventsParams } from '@vertex-protocol/indexer-client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

export function subaccountPaginatedSettlementEventsQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
  pageSize?: number,
) {
  return createQueryKey(
    'subaccountPaginatedSettlementEvents',
    chainEnv,
    subaccountOwner,
    subaccountName,
    pageSize,
  );
}

interface Params {
  pageSize?: number;
}

/**
 * Fetches historical settlements for the current subaccount
 *
 */
export function useSubaccountPaginatedSettlementEvents({
  pageSize = 10,
}: Params) {
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
    queryKey: subaccountPaginatedSettlementEventsQueryKey(
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
      const params: GetIndexerSubaccountSettlementEventsParams = {
        subaccountOwner,
        subaccountName,
        limit: pageSize,
        startCursor: pageParam,
      };
      return vertexClient.context.indexerClient.getPaginatedSubaccountSettlementEvents(
        params,
      );
    },
    enabled: !disabled,
    getNextPageParam: (lastPage) => {
      if (lastPage == null || !lastPage.meta.nextCursor) {
        // No more entries
        return null;
      }
      return lastPage.meta.nextCursor;
    },
  });
}
