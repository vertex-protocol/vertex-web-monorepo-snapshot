import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import { AllMarketsStats } from 'client/hooks/markets/useAllMarketsStats';

import { AllLatestMarketPricesData } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { TradingSidebarMarketData } from 'client/modules/trading/tradingSidebar/markets/types';
import { TradingSidebarMarketItem } from 'client/modules/trading/tradingSidebar/types';
import { bigDecimalComparator } from 'client/utils/comparators';

export function getTradingSidebarMarketsSearchString(
  item: TradingSidebarMarketData,
) {
  return item.marketData.metadata.marketName;
}

export function toTradingSidebarMarketData(
  market: TradingSidebarMarketItem,
  latestMarketPrices: AllLatestMarketPricesData | undefined,
  marketStatsData: AllMarketsStats | undefined,
): TradingSidebarMarketData {
  const currentPrice = latestMarketPrices?.[market.productId]?.safeAverage;

  const marketStats = marketStatsData?.statsByMarket[market.productId];
  const pastDayPriceChangeFrac = marketStats?.pastDayPriceChangeFrac;
  const pastDayVolumeInPrimaryQuote = removeDecimals(
    marketStats?.pastDayVolumeInPrimaryQuote,
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
