import { useInfiniteQuery } from '@tanstack/react-query';
import { GetIndexerSubaccountSettlementEventsParams } from '@vertex-protocol/indexer-client';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function subaccountPaginatedSettlementEventsQueryKey(
  chainId?: PrimaryChainID,
  subaccountOwner?: string,
  subaccountName?: string,
  pageSize?: number,
) {
  return createQueryKey(
    'subaccountPaginatedSettlementEvents',
    chainId,
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
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
  const {
    currentSubaccount: { address: subaccountOwner, name: subaccountName },
  } = useSubaccountContext();
  const disabled = !vertexClient || !subaccountOwner;
  return useInfiniteQuery({
    queryKey: subaccountPaginatedSettlementEventsQueryKey(
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
