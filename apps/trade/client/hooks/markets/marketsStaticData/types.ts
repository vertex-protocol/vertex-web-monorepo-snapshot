import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  PerpProductMetadata,
  SpotProductMetadata,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';

interface CommonStaticMarketData {
  productId: number;
  minSize: BigDecimal;
  priceIncrement: BigDecimal;
  sizeIncrement: BigDecimal;
  longWeightInitial: BigDecimal;
  shortWeightInitial: BigDecimal;
  longWeightMaintenance: BigDecimal;
  shortWeightMaintenance: BigDecimal;
}

export interface PerpStaticMarketData extends CommonStaticMarketData {
  type: ProductEngineType.PERP;
  metadata: PerpProductMetadata;
  maxLeverage: number;
}

export interface SpotStaticMarketData extends CommonStaticMarketData {
  type: ProductEngineType.SPOT;
  metadata: SpotProductMetadata;
}

export type StaticMarketData = SpotStaticMarketData | PerpStaticMarketData;

/**
 * Metadata corresponding to the quote currency for a given market. This is a more restrictive type than StaticMarketData
 * as we anticipate that future perp quotes may not actually be markets themselves (this is a bit unknown currently)
 */
export interface StaticMarketQuoteData {
  productId: number;
  isPrimaryQuote: boolean;
  symbol: string;
}

export interface AllMarketsStaticDataForChainEnv {
  /**
   * Primary quote is extracted for special treatment
   */
  primaryQuote: SpotStaticMarketData;
  /**
   * Keyed by product ID
   */
  all: Record<number, StaticMarketData>;
  spot: Record<number, SpotStaticMarketData>;
  perp: Record<number, PerpStaticMarketData>;
  /**
   * Product ID -> quote metadata for the market
   */
  quotes: Record<number, StaticMarketQuoteData>;
  allMarketsProductIds: number[];
  spotMarketsProductIds: number[];
  perpMarketsProductIds: number[];
}
