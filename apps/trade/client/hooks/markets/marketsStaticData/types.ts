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
  primaryQuoteProduct: SpotStaticMarketData;
  vlpProduct: SpotStaticMarketData | undefined;
  /**
   * Product ID -> data
   */
  allMarkets: Record<number, StaticMarketData>;
  /**
   * This includes all spot markets as well as primary quote / VLP
   */
  spotProducts: Record<number, SpotStaticMarketData>;
  /**
   * This excludes primary quote & VLP because they do not have markets
   */
  spotMarkets: Record<number, SpotStaticMarketData>;
  perpMarkets: Record<number, PerpStaticMarketData>;
  /**
   * Product ID -> quote metadata for the market
   */
  quotes: Record<number, StaticMarketQuoteData>;
  allMarketsProductIds: number[];
  spotMarketsProductIds: number[];
  perpMarketsProductIds: number[];
}
