import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  GetIndexerSubaccountCollateralEventsResponse,
  IndexerCollateralEvent,
} from '@vertex-protocol/indexer-client';
import { CollateralEventType } from '@vertex-protocol/indexer-client/dist/types/collateralEventType';
import { BigDecimal, toBigDecimal } from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useSubaccountPaginatedCollateralEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedCollateralEvents';
import { useNSubmissions } from 'client/hooks/query/useNSubmissions';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { Token } from 'common/productMetadata/types';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

export interface HistoricalCollateralItem {
  metadata: Token;
  timestampMillis: number;
  size: BigDecimal;
  valueUsd: BigDecimal;
  isPending: boolean;
}

const PAGE_SIZE = 10;

function extractItems(
  data: GetIndexerSubaccountCollateralEventsResponse,
): IndexerCollateralEvent[] {
  return data.events;
}

export function useHistoricalCollateralEventsTable({
  eventTypes,
}: {
  eventTypes: CollateralEventType[];
}) {
  const { data: allMarketsStaticData, isLoading: allMarketsLoading } =
    useAllMarketsStaticData();
  const quotePrice = useQuotePriceUsd();
  const { data: nSubmissions, isLoading: nSubmissionsLoading } =
    useNSubmissions();

  const {
    data: subaccountPaginatedEvents,
    isLoading: subaccountPaginatedEventsLoading,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useSubaccountPaginatedCollateralEvents({
    eventTypes,
    pageSize: PAGE_SIZE,
  });

  const { pageCount, paginationState, setPaginationState, getPageData } =
    useDataTablePagination<
      GetIndexerSubaccountCollateralEventsResponse,
      IndexerCollateralEvent
    >({
      queryPageCount: subaccountPaginatedEvents?.pages.length,
      pageSize: PAGE_SIZE,
      hasNextPage,
      fetchNextPage,
      extractItems,
    });

  const mappedData: HistoricalCollateralItem[] | undefined = useMemo(() => {
    if (!subaccountPaginatedEvents || !allMarketsStaticData || !nSubmissions) {
      return undefined;
    }

    return getPageData(subaccountPaginatedEvents)
      .map((event) => {
        const productId = event.snapshot.market.productId;
        const productData =
          productId === QUOTE_PRODUCT_ID
            ? allMarketsStaticData.quote
            : allMarketsStaticData.spot[productId];

        if (!productData) {
          console.warn(
            `Product ${productId} not found for historical deposits/withdrawals`,
          );
          return undefined;
        }

        const metadata = productData.metadata.token;
        const amount = removeDecimals(toBigDecimal(event.amount));
        const size = amount.abs();
        const isPending = nSubmissions.lt(event.submissionIndex);

        const oraclePrice = event.snapshot.market.product.oraclePrice;

        return {
          metadata,
          timestampMillis: secondsToMilliseconds(event.timestamp.toNumber()),
          valueUsd: size.times(oraclePrice).times(quotePrice),
          size,
          isPending,
        };
      })
      .filter(nonNullFilter);
  }, [
    subaccountPaginatedEvents,
    allMarketsStaticData,
    getPageData,
    quotePrice,
    nSubmissions,
  ]);

  return {
    isLoading:
      subaccountPaginatedEventsLoading ||
      nSubmissionsLoading ||
      isFetchingNextPage ||
      allMarketsLoading,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
