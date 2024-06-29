import {
  BigDecimal,
  GetIndexerInterestFundingPaymentsResponse,
  IndexerProductPayment,
} from '@vertex-protocol/client';
import { removeDecimals } from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountPaginatedPaymentEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedPaymentEvents';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';
import { MarketInfoCellData } from '../types/MarketInfoCellData';

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
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();
  const { data: allMarketsStaticData } = useAllMarketsStaticData();
  const quotePriceUsd = usePrimaryQuotePriceUsd();

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
      numPagesFromQuery: fundingPaymentsData?.pages.length,
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
              // Perps are always quoted in the primary quote token
              quoteSymbol: primaryQuoteSymbol,
              isPrimaryQuote: true,
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
    enablePagination,
    getPageData,
    primaryQuoteSymbol,
    quotePriceUsd,
  ]);

  return {
    mappedData,
    isLoading: isFetchingNextPage || isLoading,
    pageCount,
    paginationState,
    setPaginationState,
  };
}
