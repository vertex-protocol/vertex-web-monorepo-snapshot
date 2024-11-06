import { SharedProductMetadata } from '@vertex-protocol/metadata';
import { StaticMarketData } from 'client/hooks/markets/useAllMarketsStaticData';

export interface TradingSidebarMarketItem {
  productId: number;
  marketData: StaticMarketData;
  sharedMetadata: SharedProductMetadata;
  href: string;
  isFavorited: boolean;
}
