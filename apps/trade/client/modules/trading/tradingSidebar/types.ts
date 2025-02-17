import { SharedProductMetadata } from '@vertex-protocol/react-client';
import { StaticMarketData } from 'client/hooks/markets/marketsStaticData/types';

export interface TradingSidebarMarketItem {
  productId: number;
  marketData: StaticMarketData;
  sharedMetadata: SharedProductMetadata;
  href: string;
  isFavorited: boolean;
}
