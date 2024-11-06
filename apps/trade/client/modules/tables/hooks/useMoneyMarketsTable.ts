import { BigDecimal } from '@vertex-protocol/client';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/contracts';
import { removeDecimals } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { SpotProductMetadata } from '@vertex-protocol/metadata';
import { useMemo } from 'react';

export interface MoneyMarketsTableItem {
  metadata: SpotProductMetadata;
  productId: number;
  totalDeposited: {
    amount: BigDecimal;
    valueUsd: BigDecimal;
  };
  totalBorrowed: {
    amount: BigDecimal;
    valueUsd: BigDecimal;
  };
  spotBalance: {
    amount: BigDecimal;
    valueUsd: BigDecimal;
  };
  depositAPR: BigDecimal | undefined;
  borrowAPR: BigDecimal | undefined;
  volume24h: BigDecimal | undefined;
  isNewMarket: boolean;
  isFavorited: boolean;
}

export function useMoneyMarketsTable() {
  const { getIsNewMarket } = useVertexMetadataContext();
  const isConnected = useIsConnected();

  const { balances, isLoading: isLoadingBalances } = useSpotBalances();
  const { data: allMarketsData, isLoading: isLoadingMarkets } = useAllMarkets();
  const { data: marketMetricsData } = useAllMarketsHistoricalMetrics();

  const { favoritedMarketIds, toggleIsFavoritedMarket } = useFavoritedMarkets();

  const mappedData: MoneyMarketsTableItem[] | undefined = useMemo(() => {
    if (!balances || !allMarketsData) {
      return;
    }

    return balances
      .map((balance) => {
        const marketMetrics =
          marketMetricsData?.metricsByMarket[balance.productId];

        const market =
          balance.productId === QUOTE_PRODUCT_ID
            ? allMarketsData.primaryQuoteProduct
            : allMarketsData.spotMarkets[balance.productId];

        if (!market) {
          return;
        }

        const decimalAdjustedTotalDepositedAmount = removeDecimals(
          market.product.totalDeposited,
        );
        const decimalAdjustedTotalBorrowedAmount = removeDecimals(
          market.product.totalBorrowed,
        );

        return {
          metadata: balance.metadata,
          productId: balance.productId,
          totalDeposited: {
            amount: decimalAdjustedTotalDepositedAmount,
            valueUsd: decimalAdjustedTotalDepositedAmount.multipliedBy(
              balance.oraclePriceUsd,
            ),
          },
          totalBorrowed: {
            amount: decimalAdjustedTotalBorrowedAmount,
            valueUsd: decimalAdjustedTotalBorrowedAmount.multipliedBy(
              balance.oraclePriceUsd,
            ),
          },
          spotBalance: {
            amount: balance.amount,
            valueUsd: balance.valueUsd,
          },
          depositAPR: balance.depositAPR,
          borrowAPR: balance.borrowAPR,
          volume24h: removeDecimals(marketMetrics?.pastDayVolumeInPrimaryQuote),
          isNewMarket: getIsNewMarket(balance.productId),
          isFavorited: favoritedMarketIds.has(balance.productId),
        };
      })
      .filter(nonNullFilter);
  }, [
    balances,
    allMarketsData,
    marketMetricsData?.metricsByMarket,
    getIsNewMarket,
    favoritedMarketIds,
  ]);

  return {
    moneyMarkets: mappedData,
    isLoading: isLoadingBalances || isLoadingMarkets,
    toggleIsFavoritedMarket,
    disableFavoriteButton: !isConnected,
  };
}
