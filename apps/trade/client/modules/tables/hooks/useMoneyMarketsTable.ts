import { BigDecimal } from '@vertex-protocol/client';
import { useEVMContext } from '@vertex-protocol/react-client';
import { removeDecimals } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { useSpotBalances } from 'client/hooks/subaccount/useSpotBalances';
import { calcBorrowAPR, calcDepositAPR } from 'client/utils/calcs/calcSpotApr';
import { nonNullFilter } from 'client/utils/nonNullFilter';
import { SpotProductMetadata } from 'common/productMetadata/types';
import { useMemo } from 'react';

export interface MoneyMarketsTableItem {
  metadata: SpotProductMetadata;
  productId: number;
  totalDeposited: {
    amount: BigDecimal;
    valueUsd?: BigDecimal;
  };
  totalBorrowed: {
    amount: BigDecimal;
    valueUsd?: BigDecimal;
  };
  spotBalance: {
    amount?: BigDecimal;
    valueUsd?: BigDecimal;
  };
  depositAPR: BigDecimal;
  borrowAPR: BigDecimal;
  volume24h?: BigDecimal;
  isNewMarket: boolean;
  isFavorited: boolean;
}

export function useMoneyMarketsTable() {
  const { getIsNewMarket } = useVertexMetadataContext();
  const { connectionStatus } = useEVMContext();

  const { balances: balancesData } = useSpotBalances();
  const { data: allMarketData, isLoading: allMarketsDataLoading } =
    useAllMarkets();
  const { data: marketMetricsData } = useAllMarketsHistoricalMetrics();

  const { favoritedMarketIds, toggleIsFavoritedMarket } = useFavoritedMarkets();

  const mappedData: MoneyMarketsTableItem[] | undefined = useMemo(() => {
    if (!allMarketData) {
      return;
    }

    const allSpotMarkets = [
      allMarketData.primaryQuoteProduct,
      ...Object.values(allMarketData.spotMarkets),
    ];

    return allSpotMarkets
      .map((market) => {
        const marketMetrics =
          marketMetricsData?.metricsByMarket[market.productId];

        const spotBalance = balancesData?.find(
          (balance) => balance.productId === market.productId,
        );

        const decimalAdjustedTotalDepositedAmount = removeDecimals(
          market.product.totalDeposited,
        );

        const decimalAdjustedTotalBorrowedAmount = removeDecimals(
          market.product.totalBorrowed,
        );

        return {
          metadata: market.metadata,
          productId: market.productId,
          totalDeposited: {
            amount: decimalAdjustedTotalDepositedAmount,
            valueUsd: spotBalance?.oraclePriceUsd.multipliedBy(
              decimalAdjustedTotalDepositedAmount,
            ),
          },
          totalBorrowed: {
            amount: decimalAdjustedTotalBorrowedAmount,
            valueUsd: spotBalance?.oraclePriceUsd.multipliedBy(
              decimalAdjustedTotalBorrowedAmount,
            ),
          },
          spotBalance: {
            amount: spotBalance?.amount,
            valueUsd: spotBalance?.valueUsd,
          },
          depositAPR: calcDepositAPR(market.product),
          borrowAPR: calcBorrowAPR(market.product),
          volume24h: removeDecimals(marketMetrics?.pastDayVolumeInPrimaryQuote),
          isNewMarket: getIsNewMarket(market.productId),
          isFavorited: favoritedMarketIds.has(market.productId),
        };
      })
      .filter(nonNullFilter);
  }, [
    allMarketData,
    balancesData,
    marketMetricsData?.metricsByMarket,
    getIsNewMarket,
    favoritedMarketIds,
  ]);

  return {
    moneyMarkets: mappedData,
    isLoading: allMarketsDataLoading,
    toggleIsFavoritedMarket,
    disableFavoriteButton: connectionStatus.type !== 'connected',
  };
}
