import { useInfiniteQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { GetIndexerSubaccountMatchEventParams } from '@vertex-protocol/indexer-client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

interface Params {
  // Defaults to 10
  pageSize?: number;
  productIds?: number[];
}

export function subaccountPaginatedHistoricalTradesQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
  productIds?: number[],
  pageSize?: number,
) {
  return createQueryKey(
    'subaccountPaginatedHistoricalTrades',
    chainEnv,
    subaccountOwner,
    subaccountName,
    productIds,
    pageSize,
  );
}

export function useSubaccountPaginatedHistoricalTrades({
  pageSize = 10,
  productIds,
}: Params) {
  const vertexClient = usePrimaryChainVertexClient();
  const {
    currentSubaccount: {
      address: subaccountOwner,
      name: subaccountName,
      chainEnv,
    },
  } = useSubaccountContext();
  const disabled = !vertexClient || !subaccountOwner || !productIds;

  return useInfiniteQuery({
    queryKey: subaccountPaginatedHistoricalTradesQueryKey(
      chainEnv,
      subaccountOwner,
      subaccountName,
      productIds,
      pageSize,
    ),
    initialPageParam: <string | undefined>undefined,
    queryFn: async ({ pageParam }) => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const params: GetIndexerSubaccountMatchEventParams = {
        subaccountOwner,
        subaccountName,
        limit: pageSize,
        startCursor: pageParam,
        productIds,
      };
      return vertexClient.context.indexerClient.getPaginatedSubaccountMatchEvents(
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
    // This query is refreshed via `OrderFillQueryRefetchListener` so we shouldn't need "dumb" refresh intervals
  });
}
