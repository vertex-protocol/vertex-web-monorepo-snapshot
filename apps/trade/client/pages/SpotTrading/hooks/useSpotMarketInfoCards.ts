import { BigDecimal } from '@vertex-protocol/utils';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { useLatestPriceChange } from 'client/hooks/markets/useLatestPriceChange';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useSelectedSpotMarket } from 'client/pages/SpotTrading/hooks/useSelectedSpotMarket';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { AnnotatedSpotMarket } from 'common/productMetadata/types';
import { useMemo } from 'react';

export interface SpotMarketInfo {
  priceFormatSpecifier: string;
  currentPrice: BigDecimal | undefined;
  currentPriceValueUsd: BigDecimal | undefined;
  oraclePrice: BigDecimal;
  priceChange24hr: BigDecimal | undefined;
  priceChangeFrac24hr: BigDecimal | undefined;
  quoteVolume24hr: BigDecimal | undefined;
  latestPriceChange: BigDecimal | undefined;
}

interface UseSpotMarketInfoCards {
  productId: number | undefined;
  spotMarketInfo: SpotMarketInfo | undefined;
  quoteSymbol: string;
}

export function useSpotMarketInfoCards(): UseSpotMarketInfoCards {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { currentMarket } = useSelectedSpotMarket();
  const productId = currentMarket?.productId;

  const { data: spotMarket } = useMarket<AnnotatedSpotMarket>({ productId });
  const quotePrice = useQuotePriceUsd();
  const { data: marketMetricsData } = useAllMarketsHistoricalMetrics();
  const { data: latestOrderFillPrice } = useLatestOrderFill({ productId });
  const latestPriceChange = useLatestPriceChange(latestOrderFillPrice?.price);

  const spotMarketInfo = useMemo<SpotMarketInfo | undefined>(() => {
    if (spotMarket == null || !productId) {
      return;
    }

    const marketMetrics = marketMetricsData?.metricsByMarket[productId];
    const marketPriceChange = marketMetrics?.pastDayPriceChange;

    return {
      priceFormatSpecifier: getMarketPriceFormatSpecifier(
        spotMarket.priceIncrement,
      ),
      currentPrice: latestOrderFillPrice?.price,
      currentPriceValueUsd:
        latestOrderFillPrice?.price.multipliedBy(quotePrice),
      priceChange24hr: marketPriceChange,
      priceChangeFrac24hr: marketMetrics?.pastDayPriceChangeFrac,
      oraclePrice: spotMarket.product.oraclePrice,
      quoteVolume24hr: removeDecimals(marketMetrics?.pastDayVolumeQuote),
      latestPriceChange: latestPriceChange ?? marketPriceChange,
    };
  }, [
    spotMarket,
    productId,
    marketMetricsData,
    latestOrderFillPrice?.price,
    quotePrice,
    latestPriceChange,
  ]);

  return {
    productId,
    spotMarketInfo,
    quoteSymbol: primaryQuoteToken.symbol,
  };
}
