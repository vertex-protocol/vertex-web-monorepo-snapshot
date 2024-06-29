import { BigDecimal } from '@vertex-protocol/client';
import { removeDecimals } from '@vertex-protocol/utils';
import {
  getMarketPriceFormatSpecifier,
  NumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import {
  RealizedPnlEvent,
  RealizedPnlEventsResponse,
  useSubaccountPaginatedRealizedPnlEvents,
} from 'client/hooks/query/subaccount/useSubaccountPaginatedRealizedPnlEvents';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
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
  const quotePrice = usePrimaryQuotePriceUsd();

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
      numPagesFromQuery: realizedPnlEvents?.pages.length,
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
          const marketData = staticMarketsData.all[productId];
          const quoteData = staticMarketsData.quotes[productId];

          if (!marketData || !quoteData) {
            return;
          }

          const { icon, symbol } = getBaseProductMetadata(marketData.metadata);
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
            marketData.priceIncrement,
          );

          return {
            timestampMillis: secondsToMilliseconds(timestamp.toNumber()),
            marketInfo: {
              marketName: marketData.metadata.marketName,
              quoteSymbol: quoteData.symbol,
              isPrimaryQuote: quoteData.isPrimaryQuote,
              icon,
              symbol,
              amountForSide: decimalAdjustedPreEventBalanceAmount,
              productType: marketData.type,
              priceIncrement: marketData.priceIncrement,
              sizeIncrement: marketData.sizeIncrement,
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
