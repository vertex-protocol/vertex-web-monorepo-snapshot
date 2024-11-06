import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useAllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { useLatestPriceChange } from 'client/hooks/markets/useLatestPriceChange';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSpotOrderFormContext } from 'client/pages/SpotTrading/context/SpotOrderFormContext';
import { AnnotatedSpotMarket } from '@vertex-protocol/metadata';
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
  quoteSymbol: string | undefined;
}

interface UseSpotMarketInfoCards {
  productId: number | undefined;
  spotMarketInfo: SpotMarketInfo | undefined;
}

export function useSpotMarketInfoCards(): UseSpotMarketInfoCards {
  const { currentMarket, quoteMetadata } = useSpotOrderFormContext();
  const productId = currentMarket?.productId;

  const { data: spotMarket } = useMarket<AnnotatedSpotMarket>({ productId });
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
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
        latestOrderFillPrice?.price.multipliedBy(primaryQuotePriceUsd),
      priceChange24hr: marketPriceChange,
      priceChangeFrac24hr: marketMetrics?.pastDayPriceChangeFrac,
      oraclePrice: spotMarket.product.oraclePrice,
      quoteVolume24hr: removeDecimals(marketMetrics?.pastDayVolumeInQuote),
      latestPriceChange: latestPriceChange ?? marketPriceChange,
      quoteSymbol: quoteMetadata?.symbol,
    };
  }, [
    spotMarket,
    productId,
    marketMetricsData?.metricsByMarket,
    quoteMetadata?.symbol,
    latestOrderFillPrice?.price,
    primaryQuotePriceUsd,
    latestPriceChange,
  ]);

  return {
    productId,
    spotMarketInfo,
  };
}
