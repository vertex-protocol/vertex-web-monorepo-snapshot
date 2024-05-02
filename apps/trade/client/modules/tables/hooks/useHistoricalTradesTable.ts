import {
  GetIndexerSubaccountMatchEventsResponse,
  IndexerMatchEvent,
} from '@vertex-protocol/indexer-client';
import { toBigDecimal } from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { useSubaccountPaginatedHistoricalTrades } from 'client/hooks/query/subaccount/useSubaccountPaginatedHistoricalTrades';
import { HistoricalTradeItem } from 'client/modules/tables/types/HistoricalTradeItem';
import { getOrderType } from 'client/modules/trading/utils/getOrderType';
import { MarketFilter } from 'client/types/MarketFilter';
import { calcOrderFillPrice } from 'client/utils/calcs/calcOrderFillPrice';
import { removeDecimals } from 'client/utils/decimalAdjustment';
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

  const { getPageData, pageCount, paginationState, setPaginationState } =
    useDataTablePagination<
      GetIndexerSubaccountMatchEventsResponse,
      IndexerMatchEvent
    >({
      pageSize,
      queryPageCount: historicalTrades?.pages.length,
      hasNextPage,
      fetchNextPage,
      extractItems,
    });

  const mappedData: HistoricalTradeItem[] | undefined = useMemo(() => {
    if (!historicalTrades || !filteredMarkets) {
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

        const market = filteredMarkets[productId];

        if (!market) {
          console.warn(
            '[usePaginatedHistoricalTradesTable] Could not find product',
            productId,
          );
          return;
        }

        const { icon, symbol } = getBaseProductMetadata(market.metadata);
        const orderType = getOrderType(item);

        const decimalAdjustedTotalFee = removeDecimals(totalFee);
        const decimalAdjustedSequencerFee = removeDecimals(sequencerFee);

        // Inclusive of fee
        const quoteAmount = removeDecimals(toBigDecimal(quoteFilled));
        const filledAmount = removeDecimals(toBigDecimal(baseFilled));

        return {
          marketInfo: {
            marketName: market.metadata.marketName,
            icon,
            symbol,
            amountForSide: filledAmount,
            productType: market.type,
            sizeIncrement: market.sizeIncrement,
            priceIncrement: market.priceIncrement,
          },
          orderType,
          timestampMillis: secondsToMilliseconds(timestamp.toNumber()),
          tradeFee: decimalAdjustedTotalFee.minus(decimalAdjustedSequencerFee),
          sequencerFee: decimalAdjustedSequencerFee,
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
  }, [historicalTrades, filteredMarkets, enablePagination, getPageData]);

  return {
    isLoading:
      historicalOrdersLoading || loadingFilteredMarkets || isFetchingNextPage,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
