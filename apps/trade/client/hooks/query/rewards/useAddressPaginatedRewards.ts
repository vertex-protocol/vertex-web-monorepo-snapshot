import { useInfiniteQuery } from '@tanstack/react-query';
import { GetIndexerPaginatedRewardsParams } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { NOT_CONNECTED_ALT_QUERY_ADDRESS } from 'client/hooks/query/consts/notConnectedAltQueryAddress';

export function addressPaginatedRewardsQueryKey(
  address?: string,
  pageSize?: number,
) {
  return createQueryKey('addressPaginatedRewards', address, pageSize);
}

interface Params {
  pageSize?: number;
}

export function useAddressPaginatedRewards({ pageSize = 10 }: Params) {
  const vertexClient = usePrimaryChainVertexClient();
  const {
    currentSubaccount: { address },
  } = useSubaccountContext();

  const disabled = !vertexClient;

  const addressForQuery = address ?? NOT_CONNECTED_ALT_QUERY_ADDRESS;

  return useInfiniteQuery({
    queryKey: addressPaginatedRewardsQueryKey(addressForQuery, pageSize),
    initialPageParam: <string | undefined>undefined,
    queryFn: async ({ pageParam }) => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      const params: GetIndexerPaginatedRewardsParams = {
        limit: pageSize,
        startCursor: pageParam,
        address: addressForQuery,
      };
      return vertexClient.context.indexerClient.getPaginatedRewards(params);
    },
    getNextPageParam: (lastPage) => {
      if (lastPage == null || !lastPage.meta.nextCursor) {
        // No more entries
        return null;
      }
      return lastPage.meta.nextCursor;
    },
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
