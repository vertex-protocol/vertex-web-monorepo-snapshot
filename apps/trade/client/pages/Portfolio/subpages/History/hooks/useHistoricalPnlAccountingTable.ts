import { BigDecimal } from '@vertex-protocol/client';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import {
  RealizedPnlEvent,
  RealizedPnlEventsResponse,
  useSubaccountPaginatedRealizedPnlEvents,
} from 'client/hooks/query/subaccount/useSubaccountPaginatedRealizedPnlEvents';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { NumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

export interface HistoricalPnlAccountingItem {
  productId: number;
  timestampMillis: number;
  marketInfo: MarketInfoCellData;
  realizedPnlUsd: BigDecimal;
  filledAmount: BigDecimal;
  preEventBalanceAmount: BigDecimal;
  entryPrice: BigDecimal;
  exitPrice: BigDecimal;
  marketPriceFormatSpecifier: NumberFormatSpecifier | string;
}

const PAGE_SIZE = 10;

function extractItems(data: RealizedPnlEventsResponse) {
  return data.events;
}

export function useHistoricalPnlAccountingTable() {
  const quotePrice = useQuotePriceUsd();

  const { data: staticMarketsData, isLoading: loadingMarkets } =
    useAllMarketsStaticData();

  const {
    data: realizedPnlEvents,
    isLoading: loadingRealizedPnlEvents,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSubaccountPaginatedRealizedPnlEvents({
    pageSize: PAGE_SIZE,
    productIds: staticMarketsData?.allMarketsProductIds,
  });

  const { getPageData, pageCount, paginationState, setPaginationState } =
    useDataTablePagination<RealizedPnlEventsResponse, RealizedPnlEvent>({
      pageSize: PAGE_SIZE,
      queryPageCount: realizedPnlEvents?.pages.length,
      hasNextPage,
      fetchNextPage,
      extractItems,
    });

  const mappedData: HistoricalPnlAccountingItem[] | undefined = useMemo(() => {
    if (!realizedPnlEvents || !staticMarketsData) {
      return undefined;
    }

    return getPageData(realizedPnlEvents)
      .map(
        ({
          timestamp,
          productId,
          realizedPnl,
          preEventBalanceAmount,
          entryPrice,
          exitPrice,
          reduceOnlyBaseFilledAmount,
        }): HistoricalPnlAccountingItem | undefined => {
          const market = staticMarketsData.all[productId];

          if (!market) {
            console.warn(
              '[useHistoricalPnlAccountingTable] Could not find product',
              productId,
            );
            return;
          }

          const { icon, symbol } = getBaseProductMetadata(market.metadata);
          const decimalAdjustedFilledAmount = removeDecimals(
            reduceOnlyBaseFilledAmount,
          );
          const decimalAdjustedPreEventBalanceAmount = removeDecimals(
            preEventBalanceAmount,
          );
          const decimalAdjustedRealizedPnl = removeDecimals(realizedPnl);

          const realizedPnlUsd =
            decimalAdjustedRealizedPnl.multipliedBy(quotePrice);
          const marketPriceFormatSpecifier = getMarketPriceFormatSpecifier(
            market.priceIncrement,
          );

          return {
            timestampMillis: secondsToMilliseconds(timestamp.toNumber()),
            marketInfo: {
              marketName: market.metadata.marketName,
              icon,
              symbol,
              amountForSide: decimalAdjustedPreEventBalanceAmount,
              productType: market.type,
              priceIncrement: market.priceIncrement,
              sizeIncrement: market.sizeIncrement,
            },
            preEventBalanceAmount: decimalAdjustedPreEventBalanceAmount,
            realizedPnlUsd,
            filledAmount: decimalAdjustedFilledAmount,
            marketPriceFormatSpecifier,
            entryPrice,
            exitPrice,
            productId,
          };
        },
      )
      .filter(nonNullFilter);
  }, [getPageData, quotePrice, realizedPnlEvents, staticMarketsData]);

  return {
    isLoading: loadingRealizedPnlEvents || loadingMarkets || isFetchingNextPage,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
