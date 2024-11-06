import {
  PerpBalanceWithProduct,
  PerpMarket,
  SpotBalanceWithProduct,
  SpotMarket,
} from '@vertex-protocol/contracts';
import { TokenIconMetadata } from './tokenIcons';

export interface SharedProductMetadata {
  marketName: string;
  symbol: string;
  icon: TokenIconMetadata;
}

export interface Token {
  tokenDecimals: number; // Backend / contracts normalize to the same decimal places, so we have to track the decimals of the underlying token separately
  address: string;
  chainId: number;
  symbol: string;
  icon: TokenIconMetadata;
}

export type MarketCategory =
  | 'spot'
  | 'perp'
  | 'meme'
  | 'defi'
  | 'chain'
  | 'index'
  | 'prediction';

export interface SpotProductMetadata {
  token: Token;
  // For usual cases, this is the product ID of 0
  quoteProductId: number;
  // Whether LPs are enabled
  marketName: string;
  marketCategories: Set<MarketCategory>;
}

export interface PerpProductMetadata extends SharedProductMetadata {
  // For usual cases, this is the product ID of 0
  quoteProductId: number;
  // Whether LPs are enabled
  marketCategories: Set<MarketCategory>;
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
