import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { BigDecimal, removeDecimals } from '@vertex-protocol/utils';
import { useAllMarketsStats } from 'client/hooks/markets/useAllMarketsStats';
import { useLatestOrderFill } from 'client/hooks/markets/useLatestOrderFill';
import { useLatestPriceChange } from 'client/hooks/markets/useLatestPriceChange';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useSpotOrderFormContext } from 'client/pages/SpotTrading/context/SpotOrderFormContext';
import { AnnotatedSpotMarket } from '@vertex-protocol/react-client';
import { useMemo } from 'react';

export interface SpotMarketInfo {
  priceFormatSpecifier: string;
  currentPrice: BigDecimal | undefined;
  currentPriceValueUsd: BigDecimal | undefined;
  oraclePrice: BigDecimal;
  priceChange24h: BigDecimal | undefined;
  priceChangeFrac24h: BigDecimal | undefined;
  quoteVolume24h: BigDecimal | undefined;
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
  const { data: marketStatsData } = useAllMarketsStats();
  const { data: latestOrderFillPrice } = useLatestOrderFill({ productId });
  const latestPriceChange = useLatestPriceChange(latestOrderFillPrice?.price);

  const spotMarketInfo = useMemo<SpotMarketInfo | undefined>(() => {
    if (spotMarket == null || !productId) {
      return;
    }

    const marketStats = marketStatsData?.statsByMarket[productId];
    const marketPriceChange = marketStats?.pastDayPriceChange;

    return {
      priceFormatSpecifier: getMarketPriceFormatSpecifier(
        spotMarket.priceIncrement,
      ),
      currentPrice: latestOrderFillPrice?.price,
      currentPriceValueUsd:
        latestOrderFillPrice?.price.multipliedBy(primaryQuotePriceUsd),
      priceChange24h: marketPriceChange,
      priceChangeFrac24h: marketStats?.pastDayPriceChangeFrac,
      oraclePrice: spotMarket.product.oraclePrice,
      quoteVolume24h: removeDecimals(marketStats?.pastDayVolumeInQuote),
      latestPriceChange: latestPriceChange ?? marketPriceChange,
      quoteSymbol: quoteMetadata?.symbol,
    };
  }, [
    spotMarket,
    productId,
    marketStatsData?.statsByMarket,
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
