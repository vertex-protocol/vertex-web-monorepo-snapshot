import {
  BigDecimal,
  GetIndexerInterestFundingPaymentsResponse,
  IndexerProductPayment,
} from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { removeDecimals } from '@vertex-protocol/utils';
import { useDataTablePagination } from 'client/components/DataTable/hooks/useDataTablePagination';
import { useAllMarketsStaticData } from 'client/hooks/markets/marketsStaticData/useAllMarketsStaticData';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSubaccountPaginatedPaymentEvents } from 'client/hooks/query/subaccount/useSubaccountPaginatedPaymentEvents';
import { MarketInfoCellData } from 'client/modules/tables/types/MarketInfoCellData';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';
import { MarginModeType } from 'client/modules/localstorage/userSettings/types/tradingSettings';

export interface FundingPaymentsTableItem {
  timestampMillis: number;
  marketInfo: MarketInfoCellData;
  positionSize: BigDecimal;
  notionalValueUsd: BigDecimal;
  fundingRateFrac: BigDecimal;
  fundingPaymentQuote: BigDecimal;
  marginModeType: MarginModeType;
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
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const {
    data: fundingPaymentsData,
    isLoading,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
  } = useSubaccountPaginatedPaymentEvents({
    productIds: allMarketsStaticData?.perpMarketsProductIds,
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
    numPagesFromQuery: fundingPaymentsData?.pages.length,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    isFetching,
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
            metadata: { marketName, icon, symbol },
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
              .times(primaryQuotePriceUsd),
            fundingRateFrac: hourlyFundingRateFrac,
            fundingPaymentQuote: removeDecimals(item.paymentAmount),
            marginModeType: item.isolated ? 'isolated' : 'cross',
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
