import { BigDecimals } from '@vertex-protocol/client';
import { removeDecimals } from '@vertex-protocol/utils';
import { AllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { StaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import { AllLatestMarketPricesData } from 'client/hooks/query/markets/types';
import { MarketSwitcherItem } from 'client/modules/trading/hooks/useMarketSwitcher/types';
import { bigDecimalComparator } from 'client/utils/comparators';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';

export function getMappedMarket(
  market: StaticMarketData,
  latestMarketPrices: AllLatestMarketPricesData | undefined,
  marketMetricsData: AllMarketsHistoricalMetrics | undefined,
  isFavoritedMarket: boolean,
  isNewMarket: boolean,
  href: string,
): MarketSwitcherItem {
  const { productId, metadata, priceIncrement, type: productType } = market;
  const { marketCategories: categories } = metadata;
  const { marketName, symbol, icon } = getSharedProductMetadata(metadata);
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
      marketName,
      icon,
      categories,
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
  return item.market.marketName;
}

export function volumeComparator(a: MarketSwitcherItem, b: MarketSwitcherItem) {
  const volumeA = a.volume24h ?? BigDecimals.ZERO;
  const volumeB = b.volume24h ?? BigDecimals.ZERO;

  // Sort in desc order.
  return bigDecimalComparator(volumeA, volumeB) * -1;
}
