import { calcLpTokenValue } from '@vertex-protocol/contracts';
import {
  GetIndexerSubaccountLpEventsResponse,
  IndexerLpEvent,
} from '@vertex-protocol/indexer-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { removeDecimals } from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountPaginatedLpEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedLpEvents';
import { PairMetadata } from 'client/modules/pools/types';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

const PAGE_SIZE = 10;

export interface HistoricalLpEvent {
  timestampMillis: number;
  lpSize: BigDecimal;
  lpAmount: BigDecimal;
  lpValueUsd: BigDecimal;
  amountChanges: {
    baseAmount: BigDecimal;
    quoteAmount: BigDecimal;
  };
  metadata: PairMetadata;
}

function extractItems(data: GetIndexerSubaccountLpEventsResponse) {
  return data.events;
}

export function useHistoricalLpEventsTable() {
  const { data: allMarketsStaticData, isLoading: marketsDataLoading } =
    useAllMarketsStaticData();
  const quotePrice = usePrimaryQuotePriceUsd();
  const {
    data: subaccountPaginatedEvents,
    isLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useSubaccountPaginatedLpEvents({
    pageSize: PAGE_SIZE,
  });

  const { pageCount, paginationState, setPaginationState, getPageData } =
    useDataTablePagination<
      GetIndexerSubaccountLpEventsResponse,
      IndexerLpEvent
    >({
      numPagesFromQuery: subaccountPaginatedEvents?.pages.length,
      pageSize: PAGE_SIZE,
      hasNextPage,
      fetchNextPage,
      extractItems,
    });

  const mappedData = useMemo((): HistoricalLpEvent[] | undefined => {
    if (!subaccountPaginatedEvents || !allMarketsStaticData) {
      return undefined;
    }
    return getPageData(subaccountPaginatedEvents)
      .map((event) => {
        const { baseSnapshot, baseDelta, lpDelta, quoteDelta, timestamp } =
          event;

        const marketData =
          allMarketsStaticData.all[baseSnapshot.market.productId];

        if (!marketData) {
          console.warn('Pool market data not found');
          return undefined;
        }

        let metadata: PairMetadata = {
          base: getBaseProductMetadata(marketData.metadata),
          // LPs can only be in the primary quote
          quote: allMarketsStaticData.primaryQuote.metadata.token,
        };

        const decimalAdjustedLpAmountDelta = removeDecimals(lpDelta);

        return {
          timestampMillis: secondsToMilliseconds(timestamp.toNumber()),
          lpSize: decimalAdjustedLpAmountDelta.abs(),
          lpAmount: decimalAdjustedLpAmountDelta,
          lpValueUsd: removeDecimals(
            lpDelta
              .multipliedBy(calcLpTokenValue(baseSnapshot.market.product))
              .multipliedBy(quotePrice),
          ).abs(),
          amountChanges: {
            baseAmount: removeDecimals(baseDelta),
            quoteAmount: removeDecimals(quoteDelta),
          },
          metadata,
        };
      })
      .filter(nonNullFilter);
  }, [
    allMarketsStaticData,
    quotePrice,
    subaccountPaginatedEvents,
    getPageData,
  ]);

  return {
    isLoading: isLoading || isFetchingNextPage || marketsDataLoading,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
