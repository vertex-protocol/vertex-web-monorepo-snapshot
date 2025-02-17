import {
  AnnotatedMarket,
  AnnotatedPerpMarket,
  AnnotatedSpotMarket,
} from '@vertex-protocol/react-client';

export interface AllMarketsForChainEnv {
  /**
   * This is a market for typing purposes but only the product is relevant
   */
  primaryQuoteProduct: AnnotatedSpotMarket;
  /**
   * Registered markets from product id -> data
   */
  allMarkets: Record<number, AnnotatedMarket>;
  spotMarkets: Record<number, AnnotatedSpotMarket>;
  perpMarkets: Record<number, AnnotatedPerpMarket>;
  allMarketsProductIds: number[];
  spotMarketsProductIds: number[];
  perpMarketsProductIds: number[];
}
