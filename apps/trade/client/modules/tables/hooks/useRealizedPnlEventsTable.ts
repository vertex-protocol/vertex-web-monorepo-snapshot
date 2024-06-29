import { removeDecimals } from '@vertex-protocol/utils';
import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';

import {
  RealizedPnlEvent,
  RealizedPnlEventsResponse,
  useSubaccountPaginatedRealizedPnlEvents,
} from 'client/hooks/query/subaccount/useSubaccountPaginatedRealizedPnlEvents';
import { MarketFilter } from 'client/types/MarketFilter';
import { calcPerpEntryCostBeforeLeverage } from 'client/utils/calcs/perpEntryCostCalcs';
import { calcPnlFrac } from 'client/utils/calcs/pnlCalcs';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';
import { RealizedPnlEventItem } from '../types/RealizedPnlEventItem';

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
  const quotePrice = usePrimaryQuotePriceUsd();
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
  const { data: allMarketsStaticData } = useAllMarketsStaticData();

  const { getPageData, pageCount, paginationState, setPaginationState } =
    useDataTablePagination<RealizedPnlEventsResponse, RealizedPnlEvent>({
      pageSize,
      numPagesFromQuery: realizedPnlEvents?.pages.length,
      hasNextPage,
      fetchNextPage,
      extractItems,
    });

  const mappedData: RealizedPnlEventItem[] | undefined = useMemo(() => {
    if (!realizedPnlEvents || !filteredMarkets || !allMarketsStaticData) {
      return;
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
          const marketData = filteredMarkets[productId];
          const quoteData = allMarketsStaticData.quotes[productId];

          if (!marketData || !quoteData) {
            return;
          }

          const { icon, symbol } = getBaseProductMetadata(marketData.metadata);

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
            calcPerpEntryCostBeforeLeverage(
              marketData,
              filledNetEntryUnrealized,
            ),
          );
          const realizedPnlUsd =
            decimalAdjustedRealizedPnl.multipliedBy(quotePrice);
          const marketPriceFormatSpecifier = getMarketPriceFormatSpecifier(
            marketData.priceIncrement,
          );

          return {
            timestampMillis: secondsToMilliseconds(timestamp.toNumber()),
            marketInfo: {
              marketName: marketData.metadata.marketName,
              icon,
              symbol,
              quoteSymbol: quoteData.symbol,
              isPrimaryQuote: quoteData.isPrimaryQuote,
              amountForSide: decimalAdjustedPreBalanceAmount,
              productType: marketData.type,
              priceIncrement: marketData.priceIncrement,
              sizeIncrement: marketData.sizeIncrement,
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
    allMarketsStaticData,
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
