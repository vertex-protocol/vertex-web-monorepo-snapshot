import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  GetIndexerSubaccountSettlementEventsResponse,
  IndexerSettlementEvent,
} from '@vertex-protocol/indexer-client';
import {
  BigDecimal,
  BigDecimals,
  removeDecimals,
} from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useSubaccountPaginatedSettlementEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedSettlementEvents';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

export interface HistoricalSettlementsTableItem {
  marketInfo: MarketInfoCellData;
  timestampMillis: number;
  settlementQuoteAmount: BigDecimal;
}

const PAGE_SIZE = 10;

function extractItems(data: GetIndexerSubaccountSettlementEventsResponse) {
  return data.events;
}

export function useHistoricalSettlementsTable() {
  const { data: marketsStaticData, isLoading: marketsDataLoading } =
    useAllMarketsStaticData();
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();

  const {
    data: subaccountPaginatedEvents,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isFetching,
  } = useSubaccountPaginatedSettlementEvents({
    pageSize: PAGE_SIZE,
  });

  const {
    pageCount,
    paginationState,
    setPaginationState,
    getPageData,
    isFetchingCurrPage,
  } = useDataTablePagination<
    GetIndexerSubaccountSettlementEventsResponse,
    IndexerSettlementEvent
  >({
    pageSize: PAGE_SIZE,
    numPagesFromQuery: subaccountPaginatedEvents?.pages.length,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const mappedData: HistoricalSettlementsTableItem[] | undefined =
    useMemo(() => {
      if (!subaccountPaginatedEvents || !marketsStaticData) {
        return;
      }
      return getPageData(subaccountPaginatedEvents)
        .map((item): HistoricalSettlementsTableItem | undefined => {
          const { timestamp, snapshot, quoteDelta } = item;

          const productId = snapshot.market.productId;
          const perpMarketData = marketsStaticData?.perp?.[productId];

          if (!perpMarketData) {
            console.warn(`ProductId ${productId} not found`);
            return undefined;
          }

          return {
            marketInfo: {
              marketName: perpMarketData.metadata.marketName,
              icon: perpMarketData.metadata.icon,
              symbol: perpMarketData.metadata.symbol,
              // Perps are always quoted in the primary quote token
              quoteSymbol: primaryQuoteSymbol,
              isPrimaryQuote: true,
              sizeIncrement: perpMarketData.sizeIncrement,
              priceIncrement: perpMarketData.priceIncrement,
              // We don't have access to the prior position side here, so we just set to zero
              amountForSide: BigDecimals.ZERO,
              productType: ProductEngineType.PERP,
            },
            timestampMillis: secondsToMilliseconds(timestamp.toNumber()),
            settlementQuoteAmount: removeDecimals(quoteDelta),
          };
        })
        .filter(nonNullFilter);
    }, [
      subaccountPaginatedEvents,
      marketsStaticData,
      getPageData,
      primaryQuoteSymbol,
    ]);

  return {
    isLoading: isLoading || marketsDataLoading || isFetchingCurrPage,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
