import { BigDecimal } from '@vertex-protocol/client';
import {
  getMarketPriceFormatSpecifier,
  getMarketSizeFormatSpecifier,
} from '@vertex-protocol/react-client';
import { removeDecimals } from '@vertex-protocol/utils';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import {
  StaticMarketData,
  StaticMarketQuoteData,
} from 'client/hooks/markets/marketsStaticData/types';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import {
  RealizedPnlEvent,
  RealizedPnlEventsResponse,
  useSubaccountPaginatedRealizedPnlEvents,
} from 'client/hooks/query/subaccount/useSubaccountPaginatedRealizedPnlEvents';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import { RealizedPnlEventsTableItem } from 'client/modules/tables/types/RealizedPnlEventsTableItem';
import { MarketFilter } from 'client/types/MarketFilter';
import { calcPerpEntryCostBeforeLeverage } from 'client/utils/calcs/perp/perpEntryCostCalcs';
import { calcPnlFrac } from 'client/utils/calcs/pnlCalcs';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

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
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const { filteredProductIds, isLoading: isLoadingFilteredMarkets } =
    useFilteredMarkets(marketFilter);
  const {
    data: realizedPnlEvents,
    isLoading: isLoadingRealizedPnlEvents,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useSubaccountPaginatedRealizedPnlEvents({
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
  } = useDataTablePagination<RealizedPnlEventsResponse, RealizedPnlEvent>({
    pageSize,
    numPagesFromQuery: realizedPnlEvents?.pages.length,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const mappedData: RealizedPnlEventsTableItem[] | undefined = useMemo(() => {
    if (!realizedPnlEvents || !allMarketsStaticData) {
      return;
    }

    // Default to first page if there isn't pagination
    const pageData = enablePagination
      ? getPageData(realizedPnlEvents)
      : realizedPnlEvents.pages[0]?.events;

    return pageData
      .map((event): RealizedPnlEventsTableItem | undefined => {
        const staticMarketData =
          allMarketsStaticData.allMarkets[event.productId];
        const staticQuoteData = allMarketsStaticData.quotes[event.productId];

        if (!staticMarketData || !staticQuoteData) {
          return;
        }

        return getRealizedPnlEventsTableItem({
          event,
          staticMarketData,
          staticQuoteData,
          primaryQuotePriceUsd,
        });
      })
      .filter(nonNullFilter);
  }, [
    allMarketsStaticData,
    enablePagination,
    getPageData,
    primaryQuotePriceUsd,
    realizedPnlEvents,
  ]);

  return {
    isLoading:
      isLoadingRealizedPnlEvents ||
      isLoadingFilteredMarkets ||
      isFetchingCurrPage,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
};

interface GetRealizedPnlEventsTableItemParams {
  event: RealizedPnlEvent;
  staticMarketData: StaticMarketData;
  staticQuoteData: StaticMarketQuoteData;
  primaryQuotePriceUsd: BigDecimal;
}

export function getRealizedPnlEventsTableItem({
  event,
  staticMarketData,
  staticQuoteData,
  primaryQuotePriceUsd,
}: GetRealizedPnlEventsTableItemParams): RealizedPnlEventsTableItem {
  const {
    reduceOnlyBaseFilledAmount,
    productId,
    realizedPnl,
    timestamp,
    preEventTrackedVars,
    entryPrice,
    exitPrice,
    preBalances,
    isolated,
  } = event;
  const { icon, symbol } = getSharedProductMetadata(staticMarketData.metadata);

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
      staticMarketData.longWeightInitial,
      filledNetEntryUnrealized,
    ),
  );
  const realizedPnlUsd =
    decimalAdjustedRealizedPnl.multipliedBy(primaryQuotePriceUsd);
  const marketPriceFormatSpecifier = getMarketPriceFormatSpecifier(
    staticMarketData.priceIncrement,
  );
  const marketSizeFormatSpecifier = getMarketSizeFormatSpecifier(
    staticMarketData.sizeIncrement,
  );

  const marginModeType: MarginModeType = isolated ? 'isolated' : 'cross';

  return {
    timestampMillis: secondsToMilliseconds(timestamp.toNumber()),
    marketInfo: {
      marketName: staticMarketData.metadata.marketName,
      icon,
      symbol,
      quoteSymbol: staticQuoteData.symbol,
      isPrimaryQuote: staticQuoteData.isPrimaryQuote,
      amountForSide: decimalAdjustedPreBalanceAmount,
      productType: staticMarketData.type,
      priceIncrement: staticMarketData.priceIncrement,
      sizeIncrement: staticMarketData.sizeIncrement,
    },
    pnlInfo: {
      realizedPnlFrac,
      realizedPnlUsd,
    },
    marginModeType,
    filledAmountAbs: decimalAdjustedFilledAmount.abs(),
    marketPriceFormatSpecifier,
    marketSizeFormatSpecifier,
    entryPrice,
    exitPrice,
    productId,
  };
}
