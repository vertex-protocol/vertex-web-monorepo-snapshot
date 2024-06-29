import {
  GetIndexerSubaccountMatchEventsResponse,
  IndexerMatchEvent,
} from '@vertex-protocol/indexer-client';
import { toBigDecimal } from '@vertex-protocol/utils';
import { removeDecimals } from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { useSubaccountPaginatedHistoricalTrades } from 'client/hooks/query/subaccount/useSubaccountPaginatedHistoricalTrades';
import { HistoricalTradeItem } from 'client/modules/tables/types/HistoricalTradeItem';
import { getOrderType } from 'client/modules/trading/utils/getOrderType';
import { MarketFilter } from 'client/types/MarketFilter';
import { calcOrderFillPrice } from 'client/utils/calcs/calcOrderFillPrice';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

interface Params {
  pageSize: number;
  enablePagination: boolean;
  marketFilter?: MarketFilter;
}

function extractItems(data: GetIndexerSubaccountMatchEventsResponse) {
  return data.events;
}

export function useHistoricalTradesTable({
  pageSize,
  enablePagination,
  marketFilter,
}: Params) {
  const {
    filteredMarkets,
    filteredProductIds,
    isLoading: loadingFilteredMarkets,
  } = useFilteredMarkets(marketFilter);
  const {
    data: historicalTrades,
    isLoading: historicalOrdersLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSubaccountPaginatedHistoricalTrades({
    pageSize,
    productIds: filteredProductIds,
  });
  const { data: allMarketsStaticData } = useAllMarketsStaticData();

  const { getPageData, pageCount, paginationState, setPaginationState } =
    useDataTablePagination<
      GetIndexerSubaccountMatchEventsResponse,
      IndexerMatchEvent
    >({
      pageSize,
      numPagesFromQuery: historicalTrades?.pages.length,
      hasNextPage,
      fetchNextPage,
      extractItems,
    });

  const mappedData: HistoricalTradeItem[] | undefined = useMemo(() => {
    if (!historicalTrades || !filteredMarkets || !allMarketsStaticData) {
      return undefined;
    }

    // Default to first page if there isn't pagination
    const pageData = enablePagination
      ? getPageData(historicalTrades)
      : historicalTrades.pages[0]?.events;

    return pageData
      .map((item): HistoricalTradeItem | undefined => {
        const {
          timestamp,
          quoteFilled,
          baseFilled,
          totalFee,
          sequencerFee,
          productId,
        } = item;

        const marketData = filteredMarkets[productId];
        const quoteData = allMarketsStaticData.quotes[productId];

        if (!marketData || !quoteData) {
          return;
        }

        const { icon, symbol } = getBaseProductMetadata(marketData.metadata);
        const orderType = getOrderType(item);

        const decimalAdjustedTotalFee = removeDecimals(totalFee);

        // Inclusive of fee
        const quoteAmount = removeDecimals(toBigDecimal(quoteFilled));
        const filledAmount = removeDecimals(toBigDecimal(baseFilled));

        return {
          marketInfo: {
            marketName: marketData.metadata.marketName,
            icon,
            symbol,
            quoteSymbol: quoteData.symbol,
            isPrimaryQuote: quoteData.isPrimaryQuote,
            amountForSide: filledAmount,
            productType: marketData.type,
            sizeIncrement: marketData.sizeIncrement,
            priceIncrement: marketData.priceIncrement,
          },
          orderType,
          timestampMillis: secondsToMilliseconds(timestamp.toNumber()),
          tradeFeeQuote: decimalAdjustedTotalFee,
          filledPrice: calcOrderFillPrice(
            quoteAmount,
            decimalAdjustedTotalFee,
            filledAmount,
          ),
          filledAmount: filledAmount,
          filledAmountAbs: filledAmount.abs(),
          tradeTotalCost: quoteAmount.abs(),
        };
      })
      .filter(nonNullFilter);
  }, [
    historicalTrades,
    filteredMarkets,
    allMarketsStaticData,
    enablePagination,
    getPageData,
  ]);

  return {
    isLoading:
      historicalOrdersLoading || loadingFilteredMarkets || isFetchingNextPage,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
