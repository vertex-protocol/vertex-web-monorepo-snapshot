import {
  BigDecimal,
  GetIndexerInterestFundingPaymentsResponse,
  IndexerProductPayment,
} from '@vertex-protocol/client';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { removeDecimals } from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useSubaccountPaginatedPaymentEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedPaymentEvents';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { SpotProductMetadata } from '@vertex-protocol/metadata';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';

export interface InterestPaymentsTableItem {
  timestampMillis: number;
  metadata: SpotProductMetadata;
  balanceAmount: BigDecimal;
  interestRateFrac: BigDecimal;
  interestPaidAmount: BigDecimal;
  valueUsd: BigDecimal;
}

interface Params {
  pageSize: number;
  enablePagination: boolean;
}

function extractItems(data: GetIndexerInterestFundingPaymentsResponse) {
  return data.interestPayments;
}

export function useInterestPaymentsTable({
  pageSize,
  enablePagination,
}: Params) {
  const { data: allMarketsStaticData } = useAllMarketsStaticData();

  const productIds = allMarketsStaticData
    ? [QUOTE_PRODUCT_ID, ...allMarketsStaticData.spotMarketsProductIds]
    : undefined;
  const {
    data: interestPaymentsData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useSubaccountPaginatedPaymentEvents({
    productIds,
    pageSize,
  });

  const {
    getPageData,
    pageCount,
    paginationState,
    setPaginationState,
    isFetchingCurrPage,
  } = useDataTablePagination<
    GetIndexerInterestFundingPaymentsResponse,
    IndexerProductPayment
  >({
    pageSize,
    numPagesFromQuery: interestPaymentsData?.pages.length,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
    extractItems,
  });

  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const mappedData: InterestPaymentsTableItem[] | undefined = useMemo(() => {
    if (!interestPaymentsData || !allMarketsStaticData) {
      return;
    }

    // Default to first page if there isn't pagination
    const pageData = enablePagination
      ? getPageData(interestPaymentsData)
      : interestPaymentsData.pages[0]?.interestPayments;

    return pageData
      .map((item: IndexerProductPayment) => {
        const spotProduct =
          item.productId === QUOTE_PRODUCT_ID
            ? allMarketsStaticData.primaryQuote
            : allMarketsStaticData.spot[item.productId];

        if (!spotProduct) {
          return;
        }

        const { metadata } = spotProduct;
        const interestPaidAmount = removeDecimals(item.paymentAmount);

        return {
          timestampMillis: secondsToMilliseconds(item.timestamp.toNumber()),
          metadata,
          balanceAmount: removeDecimals(item.balanceAmount),
          interestRateFrac: item.annualPaymentRate,
          interestPaidAmount,
          valueUsd: interestPaidAmount
            .multipliedBy(item.oraclePrice)
            .multipliedBy(primaryQuotePriceUsd),
        };
      })
      .filter(nonNullFilter);
  }, [
    allMarketsStaticData,
    interestPaymentsData,
    enablePagination,
    getPageData,
    primaryQuotePriceUsd,
  ]);

  return {
    mappedData,
    isLoading: isLoading || isFetchingCurrPage,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
