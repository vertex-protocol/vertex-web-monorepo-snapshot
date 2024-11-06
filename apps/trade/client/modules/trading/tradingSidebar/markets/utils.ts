import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { AllMarketsHistoricalMetrics } from 'client/hooks/markets/useAllMarketsHistoricalMetrics';
import { AllLatestMarketPricesData } from 'client/hooks/query/markets/types';
import { TradingSidebarMarketItem } from 'client/modules/trading/tradingSidebar/types';
import { TradingSidebarMarketData } from 'client/modules/trading/tradingSidebar/markets/types';
import { bigDecimalComparator } from 'client/utils/comparators';

export function getTradingSidebarMarketsSearchString(
  item: TradingSidebarMarketData,
) {
  return item.marketData.metadata.marketName;
}

export function toTradingSidebarMarketData(
  market: TradingSidebarMarketItem,
  latestMarketPrices: AllLatestMarketPricesData | undefined,
  marketMetricsData: AllMarketsHistoricalMetrics | undefined,
): TradingSidebarMarketData {
  const currentPrice = latestMarketPrices?.[market.productId]?.safeAverage;

  const marketMetrics = marketMetricsData?.metricsByMarket[market.productId];
  const pastDayPriceChangeFrac = marketMetrics?.pastDayPriceChangeFrac;
  const pastDayVolumeInPrimaryQuote = removeDecimals(
    marketMetrics?.pastDayVolumeInPrimaryQuote,
  );

  return {
    ...market,
    currentPrice,
    pastDayPriceChangeFrac,
    priceIncrement: market.marketData.priceIncrement,
    pastDayVolumeInPrimaryQuote,
  };
}

export function tradingSidebarMarketsVolumeComparator(
  a: TradingSidebarMarketData,
  b: TradingSidebarMarketData,
) {
  const volumeA = a.pastDayVolumeInPrimaryQuote ?? BigDecimals.ZERO;
  const volumeB = b.pastDayVolumeInPrimaryQuote ?? BigDecimals.ZERO;
  // Sort by volume descending
  return bigDecimalComparator(volumeA, volumeB) * -1;
}
