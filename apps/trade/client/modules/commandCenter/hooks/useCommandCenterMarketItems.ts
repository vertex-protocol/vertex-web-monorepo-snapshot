import { ProductEngineType } from '@vertex-protocol/client';
import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import {
  PerpProductMetadata,
  SpotProductMetadata,
} from 'common/productMetadata/types';
import { useMemo } from 'react';

export interface MarketTableItem {
  metadata: SpotProductMetadata | PerpProductMetadata;
  productId: number;
  currentPrice: BigDecimal | undefined;
  priceChangeFrac24hr: BigDecimal | undefined;
  volume24hr: BigDecimal | undefined;
  isFavorited: boolean;
  isNewMarket: boolean;
  marketPriceFormatSpecifier: string;
  action: () => void;
  searchKey: string;
  type: 'markets';
}

interface Params {
  marketType: ProductEngineType | undefined;
}

export function useCommandCenterMarketItems({ marketType }: Params) {
  const { getIsHiddenMarket, getIsNewMarket } = useVertexMetadataContext();
  const { trackEvent } = useAnalyticsContext();

  const { filteredMarkets } = useFilteredMarkets({ marketType });
  const { data: latestMarketPricesData } = useAllMarketsLatestPrices();
  const { data: marketMetricsData } = useAllMarketsHistoricalMetrics();
  const { favoritedMarketIds } = useFavoritedMarkets();

  const pushTradePage = usePushTradePage();

  const mappedData: MarketTableItem[] = useMemo(() => {
    if (!filteredMarkets) {
      return [];
    }

    return Object.values(filteredMarkets)
      .filter((market) => !getIsHiddenMarket(market.productId))
      .map((market) => {
        const productId = market.productId;
        const marketMetrics = marketMetricsData?.metricsByMarket[productId];
        const latestMarketPrices = latestMarketPricesData?.[productId];

        return {
          metadata: market.metadata,
          productId: market.productId,
          currentPrice: latestMarketPrices?.safeAverage,
          priceChangeFrac24hr: marketMetrics?.pastDayPriceChangeFrac,
          volume24hr: removeDecimals(marketMetrics?.pastDayVolumeInQuote),
          isNewMarket: getIsNewMarket(market.productId),
          isFavorited: favoritedMarketIds.has(market.productId),
          marketPriceFormatSpecifier: getMarketPriceFormatSpecifier(
            market.priceIncrement,
          ),
          action: () => {
            trackEvent({
              type: 'market_entrypoint_clicked',
              data: {
                entrypoint: 'command_center',
              },
            });
            pushTradePage({ productId: market.productId });
          },
          searchKey: market.metadata.marketName,
          type: 'markets',
        };
      });
  }, [
    filteredMarkets,
    getIsHiddenMarket,
    marketMetricsData?.metricsByMarket,
    latestMarketPricesData,
    getIsNewMarket,
    favoritedMarketIds,
    trackEvent,
    pushTradePage,
  ]);

  return { markets: mappedData };
}
