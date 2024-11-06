import { useInfiniteQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  GetIndexerSubaccountMatchEventParams,
  IndexerMatchEvent,
  PaginatedIndexerEventsResponse,
} from '@vertex-protocol/indexer-client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { calcOrderFillPrice } from 'client/utils/calcs/calcOrderFillPrice';
import { calcPreMatchEventBalanceAmount } from 'client/utils/calcs/calcPreMatchEventBalanceAmount';
import { isReducePositionMatchEvent } from 'client/utils/isReducePositionMatchEvent';
import { get } from 'lodash';

interface Params {
  // Defaults to 10
  pageSize?: number;
  productIds?: number[];
}

export function subaccountPaginatedRealizedPnlEventsQueryKey(
  chainEnv?: ChainEnv,
  subaccountOwner?: string,
  subaccountName?: string,
  productIds?: number[],
  pageSize?: number,
) {
  return createQueryKey(
    'subaccountPaginatedRealizedPnlEvents',
    chainEnv,
    subaccountOwner,
    subaccountName,
    productIds,
    pageSize,
  );
}

export interface RealizedPnlEvent extends IndexerMatchEvent {
  entryPrice: BigDecimal;
  exitPrice: BigDecimal;
  realizedPnl: BigDecimal;
  // Amount base that was filled for the reduce portion of the event. This is usually the same as baseFilled and is only different
  // when a portion of the fill goes towards opening a new position
  reduceOnlyBaseFilledAmount: BigDecimal;
  // preBalances give the pre-tx balance, which is shared across multiple events within the same tx. This is the preBalance for only the event
  preEventBalanceAmount: BigDecimal;
}

// Mimic the response type of the indexer historical trades response
export type RealizedPnlEventsResponse =
  PaginatedIndexerEventsResponse<RealizedPnlEvent>;

/**
 * Realized PnL events are simply reduce-position match events
 */
export function useSubaccountPaginatedRealizedPnlEvents({
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
    queryKey: subaccountPaginatedRealizedPnlEventsQueryKey(
      chainEnv,
      subaccountOwner,
      subaccountName,
      productIds,
      pageSize,
    ),
    initialPageParam: <string | undefined>undefined,
    queryFn: async ({ pageParam }): Promise<RealizedPnlEventsResponse> => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      // Fetch 1 more than the requested page size to determine pagination metadata, as nextCursor is inclusive
      const limit = pageSize + 1;
      const events: RealizedPnlEvent[] = [];

      let startCursor: string | undefined = pageParam;

      // Indexer can't filter on reduce position events, so we have to keep polling until we get enough
      while (events.length < limit) {
        const params: GetIndexerSubaccountMatchEventParams = {
          subaccountOwner,
          subaccountName,
          // Hardcode a limit of 50 per polling query
          limit: 50,
          startCursor,
          productIds,
        };

        const matchEventsResponse =
          await vertexClient.context.indexerClient.getPaginatedSubaccountMatchEvents(
            params,
          );

        matchEventsResponse.events.forEach((event) => {
          const realizedPnlEvent = getRealizedPnlEvent({ matchEvent: event });

          if (!realizedPnlEvent) {
            return;
          }

          events.push(realizedPnlEvent);
        });

        // Update the next cursor
        startCursor = matchEventsResponse.meta.nextCursor;
        // Break if there are no more events for pagination
        if (!matchEventsResponse.meta.hasMore || !startCursor) {
          break;
        }
      }

      const hasMore = events.length > pageSize;

      return {
        meta: {
          hasMore: hasMore,
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
    // This query is refreshed via `OrderFillQueryRefetchListener` so we shouldn't need "dumb" refresh intervals
  });
}

/**
 * From an indexer match event, create a realized pnl event, or null if the event is not a reduce position event
 * @param matchEvent
 */
export function getRealizedPnlEvent({
  matchEvent,
}: {
  matchEvent: IndexerMatchEvent;
}): RealizedPnlEvent | null {
  const preTradeBalanceAmount = matchEvent.preBalances.base.amount;
  const baseFilled = matchEvent.baseFilled;
  const preEventBalanceAmount = calcPreMatchEventBalanceAmount(matchEvent);

  if (!isReducePositionMatchEvent(matchEvent)) {
    return null;
  }

  const reduceOnlyBaseFilledAmount = BigDecimal.min(
    baseFilled.abs(),
    preEventBalanceAmount.abs(),
  ).multipliedBy(baseFilled.isPositive() ? 1 : -1);
  const entryPrice = matchEvent.preEventTrackedVars.netEntryUnrealized
    .div(preTradeBalanceAmount)
    .abs();
  const fillPrice = matchEvent.quoteFilled.div(baseFilled).abs();
  const realizedPnl = reduceOnlyBaseFilledAmount.multipliedBy(
    entryPrice.minus(fillPrice),
  );

  return {
    ...matchEvent,
    realizedPnl,
    entryPrice,
    reduceOnlyBaseFilledAmount,
    preEventBalanceAmount,
    exitPrice: calcOrderFillPrice(
      matchEvent.quoteFilled,
      matchEvent.totalFee,
      matchEvent.baseFilled,
    ),
  };
}
