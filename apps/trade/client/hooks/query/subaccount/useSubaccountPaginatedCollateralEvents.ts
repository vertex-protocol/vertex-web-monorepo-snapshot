import { useInfiniteQuery } from '@tanstack/react-query';
import { GetIndexerSubaccountCollateralEventsParams } from '@vertex-protocol/client';
import { CollateralEventType } from '@vertex-protocol/indexer-client/dist/types/collateralEventType';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function subaccountPaginatedCollateralEventsQueryKey(
  chainId?: PrimaryChainID,
  subaccountOwner?: string,
  subaccountName?: string,
  eventTypes?: CollateralEventType[],
  pageSize?: number,
) {
  return createQueryKey(
    'subaccountPaginatedCollateralEvents',
    chainId,
    subaccountOwner,
    subaccountName,
    eventTypes,
    pageSize,
  );
}

interface Params {
  eventTypes?: CollateralEventType[];
  pageSize?: number;
}

/**
 * Fetches historical events for the current subaccount
 */
export function useSubaccountPaginatedCollateralEvents({
  eventTypes,
  pageSize = 10,
}: Params) {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
  const {
    currentSubaccount: { address: subaccountOwner, name: subaccountName },
  } = useSubaccountContext();
  const disabled = !vertexClient || !subaccountOwner;

  return useInfiniteQuery({
    queryKey: subaccountPaginatedCollateralEventsQueryKey(
      primaryChainId,
      subaccountOwner,
      subaccountName,
      eventTypes,
      pageSize,
    ),
    initialPageParam: <string | undefined>undefined,
    queryFn: async ({ pageParam }) => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      const params: GetIndexerSubaccountCollateralEventsParams = {
        limit: pageSize,
        startCursor: pageParam,
        subaccountOwner,
        subaccountName,
        eventTypes,
      };
      return vertexClient.context.indexerClient.getPaginatedSubaccountCollateralEvents(
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
