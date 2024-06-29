import { removeDecimals } from '@vertex-protocol/utils';
import { AllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { StaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import { AllLatestMarketPricesData } from 'client/hooks/query/markets/types';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { MarketSwitcherItem } from './types';
import { BigDecimals } from '@vertex-protocol/client';
import { bigDecimalComparator } from 'client/utils/comparators';

export function getMappedMarket(
  market: StaticMarketData,
  latestMarketPrices: AllLatestMarketPricesData | undefined,
  marketMetricsData: AllMarketsHistoricalMetrics | undefined,
  isFavoritedMarket: boolean,
  isNewMarket: boolean,
  href: string,
): MarketSwitcherItem {
  const { productId, metadata, priceIncrement, type: productType } = market;
  const { marketName: name } = metadata;
  const { symbol, icon } = getBaseProductMetadata(metadata);
  const currentPrice = latestMarketPrices?.[productId]?.safeAverage;
  const priceChangeFrac =
    marketMetricsData?.metricsByMarket[productId]?.pastDayPriceChangeFrac;
  const volume24h = removeDecimals(
    marketMetricsData?.metricsByMarket[productId]?.pastDayVolumeInPrimaryQuote,
  );

  return {
    market: {
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
    productId,
    href,
  };
}

export function getSearchString(item: MarketSwitcherItem) {
  return item.market.name;
}

export function volumeComparator(a: MarketSwitcherItem, b: MarketSwitcherItem) {
  const volumeA = a.volume24h ?? BigDecimals.ZERO;
  const volumeB = b.volume24h ?? BigDecimals.ZERO;

  // Sort in desc order.
  return bigDecimalComparator(volumeA, volumeB) * -1;
}
