import { AllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { StaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import { AllLatestMarketPricesData } from 'client/hooks/query/markets/types';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { TradeSwitcherItem } from './types';

export function getSearchString(item: TradeSwitcherItem) {
  return item.market.name;
}

export function getMappedMarket(
  market: StaticMarketData,
  latestMarketPrices: AllLatestMarketPricesData | undefined,
  marketMetricsData: AllMarketsHistoricalMetrics | undefined,
  isFavoritedMarket: boolean,
  isNewMarket: boolean,
): TradeSwitcherItem {
  const { productId, metadata, priceIncrement, type: productType } = market;
  const { marketName: name } = metadata;
  const { symbol, icon } = getBaseProductMetadata(metadata);
  const currentPrice = latestMarketPrices?.[productId]?.safeAverage;
  const priceChangeFrac =
    marketMetricsData?.metricsByMarket[productId]?.pastDayPriceChangeFrac;
  const volume24h = removeDecimals(
    marketMetricsData?.metricsByMarket[productId]?.pastDayVolumeQuote,
  );

  return {
    market: {
      productId,
      productType,
      symbol,
      name,
      icon,
    },
    price: {
      currentPrice,
      priceChangeFrac,
      priceIncrement,
    },
    volume24h,
    isNew: isNewMarket,
    isFavorited: isFavoritedMarket,
  };
}
