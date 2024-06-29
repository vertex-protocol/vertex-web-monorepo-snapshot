import { BigDecimal } from '@vertex-protocol/client';
import { StaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';
import { BaseProductMetadata } from 'common/productMetadata/types';

export interface MarketWatchlistItemData {
  productId: number;
  href: string;
  marketData: StaticMarketData;
  baseMetadata: BaseProductMetadata;
  pastDayVolumeInPrimaryQuote: BigDecimal | undefined;
  currentPrice: BigDecimal | undefined;
  pastDayPriceChangeFrac: BigDecimal | undefined;
  priceIncrement: BigDecimal | undefined;
  isFavorited: boolean;
}
