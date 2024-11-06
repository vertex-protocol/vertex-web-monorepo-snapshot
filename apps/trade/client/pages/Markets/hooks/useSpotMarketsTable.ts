import { BigDecimal } from '@vertex-protocol/client';
import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { removeDecimals } from '@vertex-protocol/utils';
import {
  SpotProductMetadata,
  useVertexMetadataContext,
} from '@vertex-protocol/metadata';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useMemo } from 'react';

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
  const { data: allMarketData, isLoading: isAllMarketDataLoading } =
    useAllMarkets();
  const { data: marketMetricsData } = useAllMarketsHistoricalMetrics();
  const { data: latestMarketPricesData } = useAllMarketsLatestPrices();
  const { favoritedMarketIds, toggleIsFavoritedMarket } = useFavoritedMarkets();
  const isConnected = useIsConnected();
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
          volume24h: removeDecimals(marketMetrics?.pastDayVolumeInPrimaryQuote),
          isNewMarket: getIsNewMarket(productId),
          isFavorited: favoritedMarketIds.has(productId),
          marketPriceFormatSpecifier: getMarketPriceFormatSpecifier(
            market.priceIncrement,
          ),
        };
      });
  }, [
    spotMarkets,
    getIsHiddenMarket,
    marketMetricsData?.metricsByMarket,
    latestMarketPricesData,
    getIsNewMarket,
    favoritedMarketIds,
  ]);

  return {
    isLoading: isAllMarketDataLoading,
    spotProducts: mappedData,
    toggleIsFavoritedMarket,
    disableFavoriteButton: !isConnected,
  };
}
