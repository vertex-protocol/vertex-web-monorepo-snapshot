import { BigDecimals } from '@vertex-protocol/client';
import { removeDecimals } from '@vertex-protocol/utils';
import { StaticMarketData } from 'client/hooks/markets/marketsStaticData/types';
import { AllMarketsStats } from 'client/hooks/markets/useAllMarketsStats';

import { AllLatestMarketPricesData } from 'client/hooks/query/markets/useAllMarketsLatestPrices';
import { MarketSwitcherItem } from 'client/modules/trading/hooks/useMarketSwitcher/types';
import { bigDecimalComparator } from 'client/utils/comparators';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';

export function getMappedMarket(
  market: StaticMarketData,
  latestMarketPrices: AllLatestMarketPricesData | undefined,
  marketStats: AllMarketsStats | undefined,
  isFavoritedMarket: boolean,
  isNewMarket: boolean,
  href: string,
): MarketSwitcherItem {
  const { productId, metadata, priceIncrement, type: productType } = market;
  const { marketCategories: categories } = metadata;
  const { marketName, symbol, icon } = getSharedProductMetadata(metadata);
  const currentPrice = latestMarketPrices?.[productId]?.safeAverage;
  const priceChangeFrac =
    marketStats?.statsByMarket[productId]?.pastDayPriceChangeFrac;
  const volume24h = removeDecimals(
    marketStats?.statsByMarket[productId]?.pastDayVolumeInPrimaryQuote,
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
