import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  GetIndexerSubaccountMatchEventsResponse,
  IndexerMatchEvent,
} from '@vertex-protocol/indexer-client';
import {
  CustomNumberFormatSpecifier,
  getMarketPriceFormatSpecifier,
  getMarketQuoteSizeFormatSpecifier,
  getMarketSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import { removeDecimals, toBigDecimal } from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import {
  StaticMarketData,
  StaticMarketQuoteData,
  useAllMarketsStaticData,
} from 'client/hooks/markets/useAllMarketsStaticData';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { useSubaccountPaginatedHistoricalTrades } from 'client/hooks/query/subaccount/useSubaccountPaginatedHistoricalTrades';
import { HistoricalTradesTableItem } from 'client/modules/tables/types/HistoricalTradesTableItem';
import { getOrderType } from 'client/modules/trading/utils/getOrderType';
import { MarketFilter } from 'client/types/MarketFilter';
import { calcOrderFillPrice } from 'client/utils/calcs/calcOrderFillPrice';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
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
  const { filteredProductIds, isLoading: loadingFilteredMarkets } =
    useFilteredMarkets(marketFilter);
  const {
    data: historicalTrades,
    isLoading: historicalOrdersLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useSubaccountPaginatedHistoricalTrades({
    pageSize,
    productIds: filteredProductIds,
  });
  const { data: allMarketsStaticData } = useAllMarketsStaticData();

  const {
    getPageData,
    pageCount,
    paginationState,
    setPaginationState,
    isFetchingCurrPage,
  } = useDataTablePagination<
    GetIndexerSubaccountMatchEventsResponse,
    IndexerMatchEvent
  >({
    pageSize,
    numPagesFromQuery: historicalTrades?.pages.length,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const mappedData: HistoricalTradesTableItem[] | undefined = useMemo(() => {
    if (!historicalTrades || !allMarketsStaticData) {
      return undefined;
    }

    // Default to first page if there isn't pagination
    const pageData = enablePagination
      ? getPageData(historicalTrades)
      : historicalTrades.pages[0]?.events;

    return pageData
      .map((event): HistoricalTradesTableItem | undefined => {
        const staticMarketData = allMarketsStaticData.all[event.productId];
        const staticQuoteData = allMarketsStaticData.quotes[event.productId];

        if (!staticMarketData || !staticQuoteData) {
          return;
        }

        return getHistoricalTradesTableItem({
          event: event,
          staticMarketData,
          staticQuoteData,
        });
      })
      .filter(nonNullFilter);
  }, [historicalTrades, allMarketsStaticData, enablePagination, getPageData]);

  return {
    isLoading:
      historicalOrdersLoading || loadingFilteredMarkets || isFetchingCurrPage,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}

interface GetHistoricalTradesTableItemParams {
  event: IndexerMatchEvent;
  staticMarketData: StaticMarketData;
  staticQuoteData: StaticMarketQuoteData;
}

export function getHistoricalTradesTableItem({
  event,
  staticMarketData,
  staticQuoteData,
}: GetHistoricalTradesTableItemParams): HistoricalTradesTableItem {
  const { timestamp, quoteFilled, baseFilled, totalFee } = event;

  const { icon, symbol } = getSharedProductMetadata(staticMarketData.metadata);
  const orderType = getOrderType(event);

  const decimalAdjustedTotalFee = removeDecimals(totalFee);

  // Inclusive of fee
  const quoteAmount = removeDecimals(toBigDecimal(quoteFilled));
  const filledAmount = removeDecimals(toBigDecimal(baseFilled));

  return {
    marketInfo: {
      marketName: staticMarketData.metadata.marketName,
      icon,
      symbol,
      quoteSymbol: staticQuoteData.symbol,
      isPrimaryQuote: staticQuoteData.isPrimaryQuote,
      amountForSide: filledAmount,
      productType: staticMarketData.type,
      sizeIncrement: staticMarketData.sizeIncrement,
      priceIncrement: staticMarketData.priceIncrement,
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
    marketPriceFormatSpecifier: getMarketPriceFormatSpecifier(
      staticMarketData.priceIncrement,
    ),
    // Spot market orders can be of arbitrary size, so we show as much precision as possible
    marketSizeFormatSpecifier:
      staticMarketData.type === ProductEngineType.SPOT
        ? CustomNumberFormatSpecifier.NUMBER_PRECISE
        : getMarketSizeFormatSpecifier(staticMarketData.sizeIncrement),
    quoteSizeFormatSpecifier: getMarketQuoteSizeFormatSpecifier(
      staticQuoteData.isPrimaryQuote,
    ),
  };
}
