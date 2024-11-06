import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useFavoritedMarkets } from 'client/hooks/markets/useFavoritedMarkets';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { useAllMarketsLatestPrices } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import {
  PerpProductMetadata,
  SpotProductMetadata,
  MarketCategory,
} from '@vertex-protocol/metadata';
import { useMemo } from 'react';

export interface MarketTableItem {
  metadata: SpotProductMetadata | PerpProductMetadata;
  productId: number;
  price: {
    currentPrice: BigDecimal | undefined;
    priceChangeFrac24h: BigDecimal | undefined;
    marketPriceFormatSpecifier: string;
  };
  volume24hr: BigDecimal | undefined;
  isFavorited: boolean;
  isNewMarket: boolean;
  action: () => void;
  searchKey: string;
  type: 'markets';
}

interface Params {
  marketCategory: MarketCategory | undefined;
}

export function useCommandCenterMarketItems({ marketCategory }: Params) {
  const { getIsHiddenMarket, getIsNewMarket } = useVertexMetadataContext();
  const { trackEvent } = useAnalyticsContext();

  const { filteredMarkets } = useFilteredMarkets({ marketCategory });
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
          price: {
            currentPrice: latestMarketPrices?.safeAverage,
            priceChangeFrac24h: marketMetrics?.pastDayPriceChangeFrac,
            marketPriceFormatSpecifier: getMarketPriceFormatSpecifier(
              market.priceIncrement,
            ),
          },
          volume24hr: removeDecimals(marketMetrics?.pastDayVolumeInQuote),
          isNewMarket: getIsNewMarket(market.productId),
          isFavorited: favoritedMarketIds.has(market.productId),
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
