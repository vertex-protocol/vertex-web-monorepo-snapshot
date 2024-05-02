import { BigDecimal, ProductEngineType } from '@vertex-protocol/client';
import { TokenIconMetadata } from 'common/productMetadata/tokenIcons';

export interface TradeSwitcherItem {
  market: {
    productId: number;
    productType: ProductEngineType;
    symbol: string;
    name: string;
    icon: TokenIconMetadata;
  };
  price: {
    currentPrice: BigDecimal | undefined;
    priceChangeFrac: BigDecimal | undefined;
    priceIncrement: BigDecimal | undefined;
  };
  volume24h: BigDecimal | undefined;
  isNew: boolean;
  isFavorited: boolean;
}
