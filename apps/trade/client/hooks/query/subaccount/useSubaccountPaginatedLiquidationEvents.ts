import { useInfiniteQuery } from '@tanstack/react-query';
import { IndexerLiquidationEvent } from '@vertex-protocol/client';
import { GetIndexerSubaccountLiquidationEventsParams } from '@vertex-protocol/indexer-client';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { isLiquidationFinalizationTx } from 'client/utils/isLiquidationFinalizationTx';
import { get } from 'lodash';

interface Params {
  // Defaults to 10
  pageSize?: number;
}

function subaccountPaginatedLiquidationEventsQueryKey(
  chainId?: PrimaryChainID,
  subaccountOwner?: string,
  subaccountName?: string,
  pageSize?: number,
) {
  return createQueryKey(
    'subaccountPaginatedLiquidationEvents',
    chainId,
    subaccountOwner,
    subaccountName,
    pageSize,
  );
}

/**
 * Fetches current subaccount liquidation events.
 */
export function useSubaccountPaginatedLiquidationEvents({
  pageSize = 10,
}: Params) {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
  const {
    currentSubaccount: { address: subaccountOwner, name: subaccountName },
  } = useSubaccountContext();
  const disabled = !vertexClient || !subaccountOwner;

  return useInfiniteQuery({
    queryKey: subaccountPaginatedLiquidationEventsQueryKey(
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

      // Fetch 1 more than the requested page size to determine pagination metadata, as nextCursor is inclusive
      const limit = pageSize + 1;
      const events: IndexerLiquidationEvent[] = [];

      let startCursor: string | undefined = pageParam;

      // Keep polling until we get enough, otherwise we might end up with an empty page when user has a lot of finalization transactions.
      while (events.length < limit) {
        const params: GetIndexerSubaccountLiquidationEventsParams = {
          subaccountOwner,
          subaccountName,
          limit,
          startCursor,
        };

        const liquidationEventsResponse =
          await vertexClient.context.indexerClient.getPaginatedSubaccountLiquidationEvents(
            params,
          );

        liquidationEventsResponse.events.forEach((event) => {
          if (isLiquidationFinalizationTx(event.quote.indexerEvent.tx)) {
            return;
          }

          events.push(event);
        });

        // Update the next cursor
        startCursor = liquidationEventsResponse.meta.nextCursor;

        // Break if there are no more events for pagination
        if (!liquidationEventsResponse.meta.hasMore || !startCursor) {
          break;
        }
      }

      const hasMore = events.length > pageSize;

      return {
        meta: {
          hasMore,
          // Cursor is inclusive, the last item in page should be the start of the next page if hasMore is true
          nextCursor: hasMore
            ? get(events, pageSize)?.submissionIndex
            : undefined,
        },
        events: events.slice(0, pageSize),
      };
    },
    getNextPageParam: (lastPage) => {
      if (lastPage == null || !lastPage.meta.nextCursor) {
        // No more entries
        return null;
      }
      return lastPage.meta.nextCursor;
    },
    enabled: !disabled,
    // We need a refresh interval here to listen to & emit liquidation events
    refetchInterval: 10000,
  });
}
