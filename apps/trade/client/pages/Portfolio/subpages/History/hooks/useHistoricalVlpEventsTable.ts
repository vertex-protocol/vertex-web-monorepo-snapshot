import {
  GetIndexerSubaccountVlpEventsResponse,
  IndexerVlpEvent,
} from '@vertex-protocol/client';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useSubaccountPaginatedVlpEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedVlpEvents';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

const PAGE_SIZE = 10;

export interface HistoricalVlpEventsTableItem {
  timestampMillis: number;
  action: 'provide' | 'redeem';
  amountChanges: {
    vlpAmount: BigDecimal;
    primaryQuoteAmount: BigDecimal;
  };
}

function extractItems(data: GetIndexerSubaccountVlpEventsResponse) {
  return data.events;
}

// TODO: Export history
export function useHistoricalVlpEventsTable() {
  const {
    data: subaccountPaginatedEvents,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
  } = useSubaccountPaginatedVlpEvents({
    pageSize: PAGE_SIZE,
  });

  const {
    pageCount,
    paginationState,
    setPaginationState,
    getPageData,
    isFetchingCurrPage,
  } = useDataTablePagination<
    GetIndexerSubaccountVlpEventsResponse,
    IndexerVlpEvent
  >({
    numPagesFromQuery: subaccountPaginatedEvents?.pages.length,
    pageSize: PAGE_SIZE,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const mappedData = useMemo((): HistoricalVlpEventsTableItem[] | undefined => {
    if (!subaccountPaginatedEvents) {
      return undefined;
    }
    return getPageData(subaccountPaginatedEvents).map((event) => {
      return getHistoricalVlpEventsTableItem({
        event,
      });
    });
  }, [subaccountPaginatedEvents, getPageData]);

  return {
    isLoading: isLoading || isFetchingCurrPage,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}

interface GetHistoricalVlpEventsTableItemParams {
  event: IndexerVlpEvent;
}

export function getHistoricalVlpEventsTableItem({
  event,
}: GetHistoricalVlpEventsTableItemParams): HistoricalVlpEventsTableItem {
  const { vlpDelta, primaryQuoteDelta, timestamp } = event;

  return {
    timestampMillis: secondsToMilliseconds(timestamp.toNumber()),
    action: vlpDelta.isPositive() ? 'provide' : 'redeem',
    amountChanges: {
      vlpAmount: removeDecimals(vlpDelta),
      primaryQuoteAmount: removeDecimals(primaryQuoteDelta),
    },
  };
}
