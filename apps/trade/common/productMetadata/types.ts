import {
  PerpBalanceWithProduct,
  PerpMarket,
  SpotBalanceWithProduct,
  SpotMarket,
} from '@vertex-protocol/contracts';
import { MarketDetailsMetadata } from './marketDetailsMetadata';
import { TokenIconMetadata } from './tokenIcons';

export interface BaseProductMetadata {
  name: string;
  symbol: string;
  icon: TokenIconMetadata;
}

export interface Token extends BaseProductMetadata {
  tokenDecimals: number; // Backend / contracts normalize to the same decimal places, so we have to track the decimals of the underlying token separately
  address: string;
  chainId: number;
}

export interface SpotProductMetadata {
  token: Token;
  // For usual cases, this is the product ID of 0
  quoteProductId: number;
  // Whether LPs are enabled
  hasLpPool: boolean;
  marketName: string;
  marketDetails: MarketDetailsMetadata;
}

export interface PerpProductMetadata extends BaseProductMetadata {
  marketName: string;
  marketDetails: MarketDetailsMetadata;
  // For usual cases, this is the product ID of 0
  quoteProductId: number;
  // Whether LPs are enabled
  hasLpPool: boolean;
}

export interface AnnotatedSpotBalanceWithProduct
  extends SpotBalanceWithProduct {
  metadata: SpotProductMetadata;
}

export interface AnnotatedPerpBalanceWithProduct
  extends PerpBalanceWithProduct {
  metadata: PerpProductMetadata;
}

export type AnnotatedBalanceWithProduct =
  | AnnotatedSpotBalanceWithProduct
  | AnnotatedPerpBalanceWithProduct;

export interface AnnotatedSpotMarket extends SpotMarket {
  metadata: SpotProductMetadata;
}

export interface AnnotatedPerpMarket extends PerpMarket {
  metadata: PerpProductMetadata;
  maxLeverage: number;
}

export type AnnotatedMarket = AnnotatedSpotMarket | AnnotatedPerpMarket;
