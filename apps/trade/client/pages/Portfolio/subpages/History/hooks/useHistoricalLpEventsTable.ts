import { calcLpTokenValue } from '@vertex-protocol/contracts';
import {
  GetIndexerSubaccountLpEventsResponse,
  IndexerLpEvent,
} from '@vertex-protocol/indexer-client';
import { Token } from '@vertex-protocol/react-client';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { StaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountPaginatedLpEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedLpEvents';
import { PairMetadata } from 'client/modules/pools/types';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

const PAGE_SIZE = 10;

export interface HistoricalLpEventsTableItem {
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
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const {
    data: subaccountPaginatedEvents,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
  } = useSubaccountPaginatedLpEvents({
    pageSize: PAGE_SIZE,
  });

  const {
    pageCount,
    paginationState,
    setPaginationState,
    getPageData,
    isFetchingCurrPage,
  } = useDataTablePagination<
    GetIndexerSubaccountLpEventsResponse,
    IndexerLpEvent
  >({
    numPagesFromQuery: subaccountPaginatedEvents?.pages.length,
    pageSize: PAGE_SIZE,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const mappedData = useMemo((): HistoricalLpEventsTableItem[] | undefined => {
    if (!subaccountPaginatedEvents || !allMarketsStaticData) {
      return undefined;
    }
    return getPageData(subaccountPaginatedEvents)
      .map((event) => {
        const marketProductId = event.baseSnapshot.market.productId;
        const staticMarketData =
          allMarketsStaticData.allMarkets[marketProductId];

        if (!staticMarketData) {
          console.warn(
            `[useHistoricalLpEventsTable] Product ${marketProductId} not found`,
          );
          return;
        }

        return getHistoricalLpEventsTableItem({
          event,
          staticMarketData,
          primaryQuoteToken:
            allMarketsStaticData.primaryQuoteProduct.metadata.token,
          primaryQuotePriceUsd,
        });
      })
      .filter(nonNullFilter);
  }, [
    subaccountPaginatedEvents,
    allMarketsStaticData,
    getPageData,
    primaryQuotePriceUsd,
  ]);

  return {
    isLoading: isLoading || marketsDataLoading || isFetchingCurrPage,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}

interface GetHistoricalLpEventsTableItemParams {
  event: IndexerLpEvent;
  staticMarketData: StaticMarketData;
  primaryQuoteToken: Token;
  primaryQuotePriceUsd: BigDecimal;
}

export function getHistoricalLpEventsTableItem({
  event,
  staticMarketData,
  primaryQuoteToken,
  primaryQuotePriceUsd,
}: GetHistoricalLpEventsTableItemParams) {
  const { baseSnapshot, baseDelta, lpDelta, quoteDelta, timestamp } = event;

  let metadata: PairMetadata = {
    base: getSharedProductMetadata(staticMarketData.metadata),
    // LPs can only be in the primary quote
    quote: primaryQuoteToken,
  };

  const decimalAdjustedLpAmountDelta = removeDecimals(lpDelta);

  return {
    timestampMillis: secondsToMilliseconds(timestamp.toNumber()),
    lpSize: decimalAdjustedLpAmountDelta.abs(),
    lpAmount: decimalAdjustedLpAmountDelta,
    lpValueUsd: removeDecimals(
      lpDelta
        .multipliedBy(calcLpTokenValue(baseSnapshot.market.product))
        .multipliedBy(primaryQuotePriceUsd),
    ).abs(),
    amountChanges: {
      baseAmount: removeDecimals(baseDelta),
      quoteAmount: removeDecimals(quoteDelta),
    },
    metadata,
  };
}
