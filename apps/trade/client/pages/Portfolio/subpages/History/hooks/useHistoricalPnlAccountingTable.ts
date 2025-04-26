import { BigDecimal } from '@vertex-protocol/client';
import {
  getMarketPriceFormatSpecifier,
  NumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { removeDecimals } from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import {
  RealizedPnlEvent,
  RealizedPnlEventsResponse,
  useSubaccountPaginatedRealizedPnlEvents,
} from 'client/hooks/query/subaccount/useSubaccountPaginatedRealizedPnlEvents';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';

export interface HistoricalPnlAccountingTableItem {
  productId: number;
  timestampMillis: number;
  marketInfo: MarketInfoCellData;
  realizedPnlUsd: BigDecimal;
  filledAmount: BigDecimal;
  preEventBalanceAmount: BigDecimal;
  entryPrice: BigDecimal;
  exitPrice: BigDecimal;
  marketPriceFormatSpecifier: NumberFormatSpecifier | string;
  marginModeType: MarginModeType;
}

const PAGE_SIZE = 10;

function extractItems(data: RealizedPnlEventsResponse) {
  return data.events;
}

export function useHistoricalPnlAccountingTable() {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const { data: staticMarketsData, isLoading: isLoadingMarkets } =
    useAllMarketsStaticData();

  const {
    data: realizedPnlEvents,
    isLoading: isLoadingRealizedPnlEvents,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useSubaccountPaginatedRealizedPnlEvents({
    pageSize: PAGE_SIZE,
    productIds: staticMarketsData?.allMarketsProductIds,
  });

  const {
    getPageData,
    pageCount,
    paginationState,
    setPaginationState,
    isFetchingCurrPage,
  } = useDataTablePagination<RealizedPnlEventsResponse, RealizedPnlEvent>({
    pageSize: PAGE_SIZE,
    numPagesFromQuery: realizedPnlEvents?.pages.length,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const mappedData: HistoricalPnlAccountingTableItem[] | undefined =
    useMemo(() => {
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
            isolated,
            reduceOnlyBaseFilledAmount,
          }): HistoricalPnlAccountingTableItem | undefined => {
            const marketData = staticMarketsData.allMarkets[productId];
            const quoteData = staticMarketsData.quotes[productId];

            if (!marketData || !quoteData) {
              return;
            }

            const { icon, symbol } = getSharedProductMetadata(
              marketData.metadata,
            );
            const decimalAdjustedFilledAmount = removeDecimals(
              reduceOnlyBaseFilledAmount,
            );
            const decimalAdjustedPreEventBalanceAmount = removeDecimals(
              preEventBalanceAmount,
            );
            const decimalAdjustedRealizedPnl = removeDecimals(realizedPnl);

            const realizedPnlUsd =
              decimalAdjustedRealizedPnl.multipliedBy(primaryQuotePriceUsd);
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
              marginModeType: isolated ? 'isolated' : 'cross',
            };
          },
        )
        .filter(nonNullFilter);
    }, [
      getPageData,
      primaryQuotePriceUsd,
      realizedPnlEvents,
      staticMarketsData,
    ]);

  return {
    isLoading:
      isLoadingRealizedPnlEvents || isLoadingMarkets || isFetchingCurrPage,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
