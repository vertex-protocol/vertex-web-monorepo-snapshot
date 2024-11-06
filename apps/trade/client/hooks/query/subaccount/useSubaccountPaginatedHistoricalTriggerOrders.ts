import { useInfiniteQuery } from '@tanstack/react-query';
import { toBigDecimal } from '@vertex-protocol/utils';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useGetRecvTime } from 'client/hooks/util/useGetRecvTime';
import {
  getVertexClientHasLinkedSigner,
  useVertexClientHasLinkedSigner,
} from 'client/hooks/util/useVertexClientHasLinkedSigner';
import { get } from 'lodash';
import { ChainEnv } from '@vertex-protocol/client';

export function subaccountPaginatedHistoricalTriggerOrdersQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
  // Without this in the query key, the query will be disabled but data will not be reset, resulting in "stale"
  // data from when 1CT was still enabled
  hasLinkedSigner?: boolean,
  pageSize?: number,
) {
  return createQueryKey(
    'subaccountPaginatedHistoricalTriggerOrders',
    chainEnv,
    subaccountOwner,
    subaccountName,
    hasLinkedSigner,
    pageSize,
  );
}

interface Params {
  pageSize: number;
}

/**
 * Fetches historical trigger orders for the current subaccount
 *
 */
export function useSubaccountPaginatedHistoricalTriggerOrders({
  pageSize,
}: Params) {
  const vertexClient = usePrimaryChainVertexClient();
  const hasLinkedSigner = useVertexClientHasLinkedSigner();
  const getRecvTime = useGetRecvTime();
  const {
    currentSubaccount: {
      address: subaccountOwner,
      name: subaccountName,
      chainEnv,
    },
  } = useSubaccountContext();

  const disabled = !vertexClient || !subaccountOwner || !hasLinkedSigner;

  return useInfiniteQuery({
    queryKey: subaccountPaginatedHistoricalTriggerOrdersQueryKey(
      chainEnv,
      subaccountOwner,
      subaccountName,
      hasLinkedSigner,
      pageSize,
    ),
    initialPageParam: <number | undefined>undefined,
    queryFn: async ({ pageParam }) => {
      if (disabled || !getVertexClientHasLinkedSigner(vertexClient)) {
        throw new QueryDisabledError();
      }

      // Query for 1 more than the requested page size to determine if there is a next page
      const queryLimit = pageSize + 1;
      const recvTime = toBigDecimal(await getRecvTime());

      const baseResponse = await vertexClient.market.getTriggerOrders({
        subaccountOwner,
        subaccountName,
        pending: false,
        limit: queryLimit,
        maxUpdateTimeInclusive: pageParam,
        recvTime,
      });

      // This retrieves the (pageSize+1)th item in the response, which is used to determine if there is a next page
      const firstOrderOfNextPage = get(
        baseResponse.orders,
        pageSize,
        undefined,
      );
      // Null is used to indicate that there is no next page
      const nextPageParam = firstOrderOfNextPage?.updatedAt ?? null;

      return {
        orders: baseResponse.orders.slice(0, pageSize),
        nextPageParam,
      };
    },
    enabled: !disabled,
    getNextPageParam: (lastPage) => {
      return lastPage.nextPageParam;
    },
  });
}
