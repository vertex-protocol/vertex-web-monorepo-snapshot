import { useInfiniteQuery } from '@tanstack/react-query';
import {
  ChainEnv,
  GetIndexerSubaccountCollateralEventsParams,
} from '@vertex-protocol/client';
import { CollateralEventType } from '@vertex-protocol/indexer-client/dist/types/collateralEventType';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

export function subaccountPaginatedCollateralEventsQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
  eventTypes?: CollateralEventType[],
  pageSize?: number,
) {
  return createQueryKey(
    'subaccountPaginatedCollateralEvents',
    chainEnv,
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
    queryKey: subaccountPaginatedCollateralEventsQueryKey(
      chainEnv,
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
