import { BigDecimal } from '@vertex-protocol/client';
import { useEVMContext } from '@vertex-protocol/web-data';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { useFavoritedMarkets } from 'client/modules/markets/hooks/useFavoritedMarkets';
import { calcBorrowAPR, calcDepositAPR } from 'client/utils/calcs/calcSpotApr';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { SpotProductMetadata } from 'common/productMetadata/types';
import { useMemo } from 'react';

export interface MoneyMarketsTableItem {
  metadata: SpotProductMetadata;
  productId: number;
  totalDepositedUsd: BigDecimal;
  totalBorrowedUsd: BigDecimal;
  depositAPR: BigDecimal | undefined;
  borrowAPR: BigDecimal | undefined;
  volume24h: BigDecimal | undefined;
  isNewMarket: boolean;
  isFavorited: boolean;
}

export function useMoneyMarketsTable() {
  const { getIsNewMarket } = useVertexMetadataContext();
  const { connectionStatus } = useEVMContext();

  const { favoritedMarketIds, toggleIsFavoritedMarket } = useFavoritedMarkets();

  const { data: allMarketData } = useAllMarkets();
  const { data: marketMetricsData } = useAllMarketsHistoricalMetrics();
  const quotePrice = useQuotePriceUsd();

  const mappedData: MoneyMarketsTableItem[] | undefined = useMemo(() => {
    if (!allMarketData) {
      return;
    }

    const allSpotMarkets = [
      allMarketData.quoteProduct,
      ...Object.values(allMarketData.spotMarkets),
    ];

    return allSpotMarkets.map((market) => {
      const productId = market.productId;
      const marketMetrics = marketMetricsData?.metricsByMarket[productId];

      const decimalAdjustedTotalDeposited = removeDecimals(
        market.product.totalDeposited,
      );

      const decimalAdjustedTotalBorrowed = removeDecimals(
        market.product.totalBorrowed,
      );

      return {
        metadata: market.metadata,
        productId: market.productId,
        totalDepositedUsd: market.product.oraclePrice
          .multipliedBy(decimalAdjustedTotalDeposited)
          .multipliedBy(quotePrice),
        totalBorrowedUsd: market.product.oraclePrice
          .multipliedBy(decimalAdjustedTotalBorrowed)
          .multipliedBy(quotePrice),
        depositAPR: calcDepositAPR(market.product),
        borrowAPR: calcBorrowAPR(market.product),
        volume24h: removeDecimals(marketMetrics?.pastDayVolumeQuote),
        isNewMarket: getIsNewMarket(productId),
        isFavorited: favoritedMarketIds.has(productId),
      };
    });
  }, [
    allMarketData,
    marketMetricsData?.metricsByMarket,
    quotePrice,
    getIsNewMarket,
    favoritedMarketIds,
  ]);

  return {
    moneyMarkets: mappedData,
    toggleIsFavoritedMarket,
    disableFavoriteButton: connectionStatus.type !== 'connected',
  };
}
