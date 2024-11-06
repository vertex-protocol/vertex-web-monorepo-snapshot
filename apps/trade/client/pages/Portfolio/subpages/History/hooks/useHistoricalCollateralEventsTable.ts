import { BigDecimals } from '@vertex-protocol/client';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import {
  GetIndexerSubaccountCollateralEventsResponse,
  IndexerCollateralEvent,
} from '@vertex-protocol/indexer-client';
import { CollateralEventType } from '@vertex-protocol/indexer-client/dist/types/collateralEventType';
import { Token } from '@vertex-protocol/metadata';
import {
  BigDecimal,
  removeDecimals,
  toBigDecimal,
} from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import {
  SpotStaticMarketData,
  useAllMarketsStaticData,
} from 'client/hooks/markets/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountPaginatedCollateralEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedCollateralEvents';
import { useAllProductsWithdrawPoolLiquidity } from 'client/hooks/query/withdrawPool/useAllProductsWithdrawPoolLiquidity';
import { useAreWithdrawalsProcessing } from 'client/modules/collateral/hooks/useAreWithdrawalsProcessing';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

export interface HistoricalCollateralEventsTableItem {
  metadata: Token;
  timestampMillis: number;
  size: BigDecimal;
  valueUsd: BigDecimal;
  isProcessing: boolean | undefined;
  hasWithdrawPoolLiquidity: boolean;
  submissionIndex: string;
  amount: BigDecimal;
  productId: number;
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
  const { data: allProductsWithdrawPoolLiquidityData } =
    useAllProductsWithdrawPoolLiquidity();
  const { data: allMarketsStaticData, isLoading: allMarketsLoading } =
    useAllMarketsStaticData();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const {
    data: subaccountPaginatedEvents,
    isLoading: subaccountPaginatedEventsLoading,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    hasNextPage,
  } = useSubaccountPaginatedCollateralEvents({
    eventTypes,
    pageSize: PAGE_SIZE,
  });

  const {
    pageCount,
    paginationState,
    setPaginationState,
    getPageData,
    isFetchingCurrPage,
  } = useDataTablePagination<
    GetIndexerSubaccountCollateralEventsResponse,
    IndexerCollateralEvent
  >({
    numPagesFromQuery: subaccountPaginatedEvents?.pages.length,
    pageSize: PAGE_SIZE,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const pageDataEvents = useMemo(
    () => getPageData(subaccountPaginatedEvents),
    [getPageData, subaccountPaginatedEvents],
  );

  const submissionIndices = useMemo(
    () => pageDataEvents?.map((event) => event.submissionIndex),
    [pageDataEvents],
  );

  const areWithdrawalsProcessingData = useAreWithdrawalsProcessing({
    submissionIndices,
  });

  const mappedData: HistoricalCollateralEventsTableItem[] | undefined =
    useMemo(() => {
      if (!subaccountPaginatedEvents || !allMarketsStaticData) {
        return undefined;
      }
      return getPageData(subaccountPaginatedEvents)
        .map((event) => {
          const productId = event.snapshot.market.productId;
          const staticMarketData =
            productId === QUOTE_PRODUCT_ID
              ? allMarketsStaticData.primaryQuote
              : allMarketsStaticData.spot[productId];

          if (!staticMarketData) {
            console.warn(
              `[useHistoricalCollateralEventsTable] Product ${productId} not found`,
            );
            return undefined;
          }

          return getHistoricalCollateralEventsTableItem({
            event,
            staticMarketData,
            areWithdrawalsProcessingData,
            allProductsWithdrawPoolLiquidityData,
            primaryQuotePriceUsd,
          });
        })
        .filter(nonNullFilter);
    }, [
      subaccountPaginatedEvents,
      allMarketsStaticData,
      getPageData,
      areWithdrawalsProcessingData,
      allProductsWithdrawPoolLiquidityData,
      primaryQuotePriceUsd,
    ]);

  return {
    isLoading:
      subaccountPaginatedEventsLoading ||
      allMarketsLoading ||
      isFetchingCurrPage,
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
  };
}

interface GetHistoricalCollateralEventsTableItemParams {
  event: IndexerCollateralEvent;
  staticMarketData: SpotStaticMarketData;
  areWithdrawalsProcessingData: Record<string, boolean> | undefined;
  allProductsWithdrawPoolLiquidityData: Record<number, BigDecimal> | undefined;
  primaryQuotePriceUsd: BigDecimal;
}

export function getHistoricalCollateralEventsTableItem({
  event,
  staticMarketData,
  primaryQuotePriceUsd,
  areWithdrawalsProcessingData,
  allProductsWithdrawPoolLiquidityData,
}: GetHistoricalCollateralEventsTableItemParams) {
  const productId = event.snapshot.market.productId;
  const metadata = staticMarketData.metadata.token;
  const amount = removeDecimals(toBigDecimal(event.amount));
  const size = amount.abs();
  const isWithdraw = event.eventType === 'withdraw_collateral';
  const isProcessing =
    isWithdraw && areWithdrawalsProcessingData?.[event.submissionIndex];

  const oraclePrice = event.snapshot.market.product.oraclePrice;

  // If there is liquidity in the withdraw pool for this product, then a fast withdraw is available,
  // We enable fast withdraw button depending on this.
  const hasWithdrawPoolLiquidity =
    allProductsWithdrawPoolLiquidityData?.[productId]?.gt(BigDecimals.ZERO) ??
    false;

  return {
    metadata,
    timestampMillis: secondsToMilliseconds(event.timestamp.toNumber()),
    valueUsd: size.times(oraclePrice).times(primaryQuotePriceUsd),
    size,
    isProcessing,
    hasWithdrawPoolLiquidity,
    submissionIndex: event.submissionIndex,
    amount,
    productId,
  };
}
