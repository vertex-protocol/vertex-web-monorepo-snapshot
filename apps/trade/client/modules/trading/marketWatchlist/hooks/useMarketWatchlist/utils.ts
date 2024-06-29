import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { AllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { StaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import { AllLatestMarketPricesData } from 'client/hooks/query/markets/types';
import { MarketWatchlistItemData } from 'client/modules/trading/marketWatchlist/types';
import { bigDecimalComparator } from 'client/utils/comparators';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';

export function getSearchString(item: MarketWatchlistItemData) {
  return item.marketData.metadata.marketName;
}

export function toMarketWatchlistItemData(
  staticMarketData: StaticMarketData,
  latestMarketPrices: AllLatestMarketPricesData | undefined,
  marketMetricsData: AllMarketsHistoricalMetrics | undefined,
  href: string,
  isFavoritedMarket: boolean,
): MarketWatchlistItemData {
  const currentPrice =
    latestMarketPrices?.[staticMarketData.productId]?.safeAverage;

  const marketMetrics =
    marketMetricsData?.metricsByMarket[staticMarketData.productId];
  const pastDayPriceChangeFrac = marketMetrics?.pastDayPriceChangeFrac;
  const pastDayVolumeInPrimaryQuote = removeDecimals(
    marketMetrics?.pastDayVolumeInPrimaryQuote,
  );

  return {
    marketData: staticMarketData,
    href,
    baseMetadata: getBaseProductMetadata(staticMarketData.metadata),
    currentPrice,
    pastDayPriceChangeFrac,
    priceIncrement: staticMarketData.priceIncrement,
    productId: staticMarketData.productId,
    pastDayVolumeInPrimaryQuote,
    isFavorited: isFavoritedMarket,
  };
}

export function marketWatchlistItemVolumeComparator(
  a: MarketWatchlistItemData,
  b: MarketWatchlistItemData,
) {
  const volumeA = a.pastDayVolumeInPrimaryQuote ?? BigDecimals.ZERO;
  const volumeB = b.pastDayVolumeInPrimaryQuote ?? BigDecimals.ZERO;
  // Sort by volume descending
  return bigDecimalComparator(volumeA, volumeB) * -1;
}
