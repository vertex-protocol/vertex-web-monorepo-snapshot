import {
  AnnotatedSpotMarket,
  useVertexMetadataContext,
} from '@vertex-protocol/metadata';
import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useLatestMarketPrice } from 'client/hooks/markets/useLatestMarketPrice';
import { useMarket } from 'client/hooks/markets/useMarket';

export function useVrtxMarketMetrics() {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { data: vrtxSpotMarket } = useMarket<AnnotatedSpotMarket>({
    productId: protocolTokenMetadata.productId,
  });
  const { data: latestVrtxMarketPrice } = useLatestMarketPrice({
    productId: protocolTokenMetadata.productId,
  });
  const { data: allMarketsHistoricalMetrics } =
    useAllMarketsHistoricalMetrics();

  const pastDayPriceChangeFrac =
    allMarketsHistoricalMetrics?.metricsByMarket?.[
      protocolTokenMetadata.productId
    ].pastDayPriceChangeFrac;

  return {
    marketName: vrtxSpotMarket?.metadata.marketName,
    marketPriceFormatSpecifier: getMarketPriceFormatSpecifier(
      vrtxSpotMarket?.priceIncrement,
    ),
    currentPrice: latestVrtxMarketPrice?.safeAverage,
    pastDayPriceChangeFrac,
  };
}
