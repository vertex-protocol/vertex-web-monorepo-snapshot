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
import { SpotProductMetadata } from 'common/productMetadata/types';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

export interface InterestPaymentsTableItem {
  timestampMillis: number;
  metadata: SpotProductMetadata;
  balanceAmount: BigDecimal;
  interestRateFrac: BigDecimal;
  interestPaidAmount: BigDecimal;
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
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSubaccountPaginatedPaymentEvents({
    productIds,
    pageSize,
  });

  const { getPageData, pageCount, paginationState, setPaginationState } =
    useDataTablePagination<
      GetIndexerInterestFundingPaymentsResponse,
      IndexerProductPayment
    >({
      pageSize,
      numPagesFromQuery: interestPaymentsData?.pages.length,
      hasNextPage,
      fetchNextPage,
      extractItems,
    });

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

        return {
          timestampMillis: secondsToMilliseconds(item.timestamp.toNumber()),
          metadata,
          balanceAmount: removeDecimals(item.balanceAmount),
          interestRateFrac: item.annualPaymentRate,
          interestPaidAmount: removeDecimals(item.paymentAmount),
        };
      })
      .filter(nonNullFilter);
  }, [
    allMarketsStaticData,
    interestPaymentsData,
    enablePagination,
    getPageData,
  ]);

  return {
    mappedData,
    isLoading: isFetchingNextPage || isLoading,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
