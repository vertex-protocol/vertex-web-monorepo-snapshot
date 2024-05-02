import {
  BigDecimal,
  GetIndexerInterestFundingPaymentsResponse,
  IndexerProductPayment,
} from '@vertex-protocol/client';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useSubaccountPaginatedPaymentEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedPaymentEvents';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { useMemo } from 'react';
import { MarketInfoCellData } from '../types/MarketInfoCellData';
import { secondsToMilliseconds } from 'date-fns';

export interface FundingPaymentsTableItem {
  timestampMillis: number;
  marketInfo: MarketInfoCellData;
  positionSize: BigDecimal;
  notionalValueUsd: BigDecimal;
  fundingRateFrac: BigDecimal;
  fundingPaymentQuote: BigDecimal;
}

interface Params {
  pageSize: number;
  enablePagination: boolean;
}

function extractItems(data: GetIndexerInterestFundingPaymentsResponse) {
  return data.fundingPayments;
}

export function useFundingPaymentsTable({
  pageSize,
  enablePagination,
}: Params) {
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const quotePriceUsd = useQuotePriceUsd();

  const {
    data: fundingPaymentsData,
    isLoading,
    isFetchingNextPage,
    hasNextPage,
    fetchNextPage,
  } = useSubaccountPaginatedPaymentEvents({
    productIds: allMarketsStaticData?.perpMarketsProductIds,
    pageSize,
  });

  const { getPageData, pageCount, paginationState, setPaginationState } =
    useDataTablePagination<
      GetIndexerInterestFundingPaymentsResponse,
      IndexerProductPayment
    >({
      pageSize,
      queryPageCount: fundingPaymentsData?.pages.length,
      hasNextPage,
      fetchNextPage,
      extractItems,
    });

  const mappedData: FundingPaymentsTableItem[] | undefined = useMemo(() => {
    if (!fundingPaymentsData || !allMarketsStaticData) {
      return;
    }

    // Default to first page if there isn't pagination
    const pageData = enablePagination
      ? getPageData(fundingPaymentsData)
      : fundingPaymentsData.pages[0]?.fundingPayments;

    const mappedData: FundingPaymentsTableItem[] = pageData
      .map(
        (item: IndexerProductPayment): FundingPaymentsTableItem | undefined => {
          const perpProduct = allMarketsStaticData.perp[item.productId];

          if (!perpProduct) {
            return;
          }

          const {
            metadata: { name: marketName, icon, symbol },
            type: productType,
            sizeIncrement,
            priceIncrement,
          } = perpProduct;
          const positionSize = removeDecimals(item.balanceAmount.abs());

          // Hourly funding rate is the annualized rate divided by number of days in a year into number of hours in a day
          const hourlyFundingRateFrac = item.annualPaymentRate.div(365 * 24);

          return {
            timestampMillis: secondsToMilliseconds(item.timestamp.toNumber()),
            marketInfo: {
              marketName,
              icon,
              symbol,
              amountForSide: item.balanceAmount,
              productType,
              sizeIncrement,
              priceIncrement,
            },
            positionSize,
            notionalValueUsd: positionSize
              .times(item.oraclePrice)
              .times(quotePriceUsd),
            fundingRateFrac: hourlyFundingRateFrac,
            fundingPaymentQuote: removeDecimals(item.paymentAmount),
          };
        },
      )
      .filter(nonNullFilter);

    return mappedData;
  }, [
    fundingPaymentsData,
    allMarketsStaticData,
    quotePriceUsd,
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
