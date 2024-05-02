import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';

import {
  RealizedPnlEvent,
  RealizedPnlEventsResponse,
  useSubaccountPaginatedRealizedPnlEvents,
} from 'client/hooks/query/subaccount/useSubaccountPaginatedRealizedPnlEvents';
import { MarketFilter } from 'client/types/MarketFilter';
import { calcPerpEntryCostBeforeLeverage } from 'client/utils/calcs/perpEntryCostCalcs';
import { calcPnlFrac } from 'client/utils/calcs/pnlCalcs';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { useMemo } from 'react';
import { RealizedPnlEventItem } from '../types/RealizedPnlEventItem';
import { secondsToMilliseconds } from 'date-fns';

interface Params {
  marketFilter?: MarketFilter;
  pageSize: number;
  enablePagination: boolean;
}

function extractItems(data: RealizedPnlEventsResponse) {
  return data.events;
}

export const useRealizedPnlEventsTable = ({
  marketFilter,
  pageSize,
  enablePagination,
}: Params) => {
  const quotePrice = useQuotePriceUsd();
  const {
    filteredMarkets,
    filteredProductIds,
    isLoading: loadingFilteredMarkets,
  } = useFilteredMarkets(marketFilter);

  const {
    data: realizedPnlEvents,
    isLoading: loadingRealizedPnlEvents,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSubaccountPaginatedRealizedPnlEvents({
    pageSize,
    productIds: filteredProductIds,
  });

  const { getPageData, pageCount, paginationState, setPaginationState } =
    useDataTablePagination<RealizedPnlEventsResponse, RealizedPnlEvent>({
      pageSize,
      queryPageCount: realizedPnlEvents?.pages.length,
      hasNextPage,
      fetchNextPage,
      extractItems,
    });

  const mappedData: RealizedPnlEventItem[] | undefined = useMemo(() => {
    if (!realizedPnlEvents || !filteredMarkets) {
      return undefined;
    }
    // Default to first page if there isn't pagination
    const pageData = enablePagination
      ? getPageData(realizedPnlEvents)
      : realizedPnlEvents.pages[0]?.events;

    return pageData
      .map(
        ({
          reduceOnlyBaseFilledAmount,
          productId,
          realizedPnl,
          timestamp,
          preEventTrackedVars,
          entryPrice,
          exitPrice,
          preBalances,
        }): RealizedPnlEventItem | undefined => {
          const market = filteredMarkets[productId];

          if (!market) {
            console.warn(
              '[useRealizedPnlTable] Could not find product',
              productId,
            );
            return;
          }

          const { icon, symbol } = getBaseProductMetadata(market.metadata);

          const decimalAdjustedFilledAmount = removeDecimals(
            reduceOnlyBaseFilledAmount,
          );
          const decimalAdjustedPreBalanceAmount = removeDecimals(
            preBalances.base.amount,
          );
          const decimalAdjustedRealizedPnl = removeDecimals(realizedPnl);

          // Scale the entry cost of the position by the % filled
          const filledFraction = decimalAdjustedFilledAmount
            .dividedBy(decimalAdjustedPreBalanceAmount)
            .abs();
          const filledNetEntryUnrealized =
            preEventTrackedVars.netEntryUnrealized.multipliedBy(filledFraction);
          const realizedPnlFrac = calcPnlFrac(
            realizedPnl,
            calcPerpEntryCostBeforeLeverage(market, filledNetEntryUnrealized),
          );
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
              amountForSide: decimalAdjustedPreBalanceAmount,
              productType: market.type,
              priceIncrement: market.priceIncrement,
              sizeIncrement: market.sizeIncrement,
            },
            pnlInfo: {
              realizedPnlFrac,
              realizedPnlUsd,
            },
            filledAmountAbs: decimalAdjustedFilledAmount.abs(),
            marketPriceFormatSpecifier,
            entryPrice,
            exitPrice,
            productId,
          };
        },
      )
      .filter(nonNullFilter);
  }, [
    enablePagination,
    filteredMarkets,
    getPageData,
    quotePrice,
    realizedPnlEvents,
  ]);

  return {
    isLoading:
      loadingRealizedPnlEvents || loadingFilteredMarkets || isFetchingNextPage,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
};
