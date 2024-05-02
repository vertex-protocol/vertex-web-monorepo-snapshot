import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { BigDecimal } from '@vertex-protocol/client';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { useMemo } from 'react';
import { SpotProductMetadata } from 'common/productMetadata/types';
import { useFavoritedMarkets } from 'client/modules/markets/hooks/useFavoritedMarkets';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { useEVMContext } from '@vertex-protocol/web-data';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';

export interface SpotMarketTableItem {
  metadata: SpotProductMetadata;
  productId: number;
  currentPrice: BigDecimal | undefined;
  priceChange24hr: BigDecimal | undefined;
  priceChangeFrac24hr: BigDecimal | undefined;
  volume24h: BigDecimal | undefined;
  isNewMarket: boolean;
  isFavorited: boolean;
  marketPriceFormatSpecifier: string;
}

export function useSpotMarketsTable() {
  const { data: allMarketData } = useAllMarkets();
  const { data: marketMetricsData } = useAllMarketsHistoricalMetrics();
  const { data: latestMarketPricesData } = useAllMarketsLatestPrices();
  const { favoritedMarketIds, toggleIsFavoritedMarket } = useFavoritedMarkets();
  const { connectionStatus } = useEVMContext();
  const { getIsHiddenMarket, getIsNewMarket } = useVertexMetadataContext();

  const spotMarkets = allMarketData?.spotMarkets;

  const mappedData: SpotMarketTableItem[] | undefined = useMemo(() => {
    if (!spotMarkets) {
      return;
    }

    return Object.values(spotMarkets)
      .filter((market) => !getIsHiddenMarket(market.productId))
      .map((market) => {
        const productId = market.productId;
        const marketMetrics = marketMetricsData?.metricsByMarket[productId];
        const latestMarketPrices = latestMarketPricesData?.[productId];

        return {
          metadata: market.metadata,
          productId: market.productId,
          currentPrice: latestMarketPrices?.safeAverage,
          priceChange24hr: marketMetrics?.pastDayPriceChange,
          priceChangeFrac24hr: marketMetrics?.pastDayPriceChangeFrac,
          volume24h: removeDecimals(marketMetrics?.pastDayVolumeQuote),
          isNewMarket: getIsNewMarket(productId),
          isFavorited: favoritedMarketIds.has(productId),
          marketPriceFormatSpecifier: getMarketPriceFormatSpecifier(
            market.priceIncrement,
          ),
        };
      });
  }, [
    latestMarketPricesData,
    marketMetricsData,
    favoritedMarketIds,
    spotMarkets,
    getIsHiddenMarket,
    getIsNewMarket,
  ]);

  return {
    spotProducts: mappedData,
    toggleIsFavoritedMarket,
    disableFavoriteButton: connectionStatus.type !== 'connected',
  };
}
