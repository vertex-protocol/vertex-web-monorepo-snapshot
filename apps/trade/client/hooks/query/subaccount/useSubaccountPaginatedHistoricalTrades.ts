import { useInfiniteQuery } from '@tanstack/react-query';
import { GetIndexerSubaccountMatchEventParams } from '@vertex-protocol/indexer-client';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

interface Params {
  // Defaults to 10
  pageSize?: number;
  productIds?: number[];
}

export function subaccountPaginatedHistoricalTradesQueryKey(
  chainId?: PrimaryChainID,
  subaccountOwner?: string,
  subaccountName?: string,
  productIds?: number[],
  pageSize?: number,
) {
  return createQueryKey(
    'subaccountPaginatedHistoricalTrades',
    chainId,
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
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
  const {
    currentSubaccount: { address: subaccountOwner, name: subaccountName },
  } = useSubaccountContext();
  const disabled = !vertexClient || !subaccountOwner || !productIds;

  return useInfiniteQuery({
    queryKey: subaccountPaginatedHistoricalTradesQueryKey(
      primaryChainId,
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
