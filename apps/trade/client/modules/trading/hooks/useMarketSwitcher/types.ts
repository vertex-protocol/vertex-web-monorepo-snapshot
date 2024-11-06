import { BigDecimal, ProductEngineType } from '@vertex-protocol/client';
import { TokenIconMetadata } from '@vertex-protocol/metadata';
import { MarketCategory } from '@vertex-protocol/metadata';

export interface MarketSwitcherItem {
  market: {
    productType: ProductEngineType;
    symbol: string;
    marketName: string;
    icon: TokenIconMetadata;
    categories: Set<MarketCategory>;
  };
  price: {
    currentPrice: BigDecimal | undefined;
    priceChangeFrac: BigDecimal | undefined;
    priceIncrement: BigDecimal | undefined;
  };
  volume24h: BigDecimal | undefined;
  isNew: boolean;
  isFavorited: boolean;
  productId: number;
  href: string;
}
