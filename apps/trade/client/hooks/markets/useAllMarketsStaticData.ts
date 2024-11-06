import { useQuery } from '@tanstack/react-query';
import {
  ChainEnv,
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import {
  QueryDisabledError,
  useEVMContext,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import {
  PerpProductMetadata,
  SpotProductMetadata,
} from '@vertex-protocol/metadata';

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

export interface AllMarketsStaticData {
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

function allStaticMarketsDataQueryKey(chainEnv: ChainEnv) {
  return ['staticMarketDataByProductId', chainEnv];
}

export function useAllMarketsStaticData() {
  const { primaryChainEnv } = useEVMContext();
  const { data, isLoading: isLoadingMarkets } = useAllMarkets();

  const enabled = !!data;

  const queryFn = (): AllMarketsStaticData => {
    if (!data) {
      throw new QueryDisabledError();
    }

    const quoteProduct = data.primaryQuoteProduct;
    const staticMarketDataByProductId: AllMarketsStaticData = {
      primaryQuote: {
        type: ProductEngineType.SPOT,
        metadata: quoteProduct.metadata,
        minSize: quoteProduct.minSize,
        priceIncrement: quoteProduct.priceIncrement,
        sizeIncrement: quoteProduct.sizeIncrement,
        productId: quoteProduct.productId,
        longWeightInitial: quoteProduct.product.longWeightInitial,
        shortWeightInitial: quoteProduct.product.shortWeightInitial,
        longWeightMaintenance: quoteProduct.product.longWeightMaintenance,
        shortWeightMaintenance: quoteProduct.product.shortWeightMaintenance,
      },
      all: {},
      spot: {},
      perp: {},
      quotes: {},
      allMarketsProductIds: data.allMarketsProductIds,
      spotMarketsProductIds: data.spotMarketsProductIds,
      perpMarketsProductIds: data.perpMarketsProductIds,
    };

    Object.values(data.spotMarkets).forEach((spotMarket) => {
      const staticData: SpotStaticMarketData = {
        type: ProductEngineType.SPOT,
        metadata: spotMarket.metadata,
        minSize: spotMarket.minSize,
        priceIncrement: spotMarket.priceIncrement,
        sizeIncrement: spotMarket.sizeIncrement,
        productId: spotMarket.productId,
        longWeightInitial: spotMarket.product.longWeightInitial,
        shortWeightInitial: spotMarket.product.shortWeightInitial,
        longWeightMaintenance: spotMarket.product.longWeightMaintenance,
        shortWeightMaintenance: spotMarket.product.shortWeightMaintenance,
      };

      staticMarketDataByProductId.all[spotMarket.productId] = staticData;
      staticMarketDataByProductId.spot[spotMarket.productId] = staticData;
    });

    Object.values(data.perpMarkets).forEach((perpMarket) => {
      const staticData: PerpStaticMarketData = {
        type: ProductEngineType.PERP,
        metadata: perpMarket.metadata,
        minSize: perpMarket.minSize,
        priceIncrement: perpMarket.priceIncrement,
        sizeIncrement: perpMarket.sizeIncrement,
        productId: perpMarket.productId,
        maxLeverage: perpMarket.maxLeverage,
        longWeightInitial: perpMarket.product.longWeightInitial,
        shortWeightInitial: perpMarket.product.shortWeightInitial,
        longWeightMaintenance: perpMarket.product.longWeightMaintenance,
        shortWeightMaintenance: perpMarket.product.shortWeightMaintenance,
      };

      staticMarketDataByProductId.all[perpMarket.productId] = staticData;
      staticMarketDataByProductId.perp[perpMarket.productId] = staticData;
    });

    Object.values(staticMarketDataByProductId.all).forEach((market) => {
      const quoteProductIdForMarket = market.metadata.quoteProductId;

      const { symbol, isPrimaryQuote } = (() => {
        if (quoteProductIdForMarket === QUOTE_PRODUCT_ID) {
          return {
            symbol:
              staticMarketDataByProductId.primaryQuote.metadata.token.symbol,
            isPrimaryQuote: true,
          };
        }

        const quoteStaticData =
          staticMarketDataByProductId.all[quoteProductIdForMarket];

        if (!quoteStaticData) {
          throw new Error(
            `Quote for market ${market.productId} not found (${quoteProductIdForMarket})`,
          );
        }

        const { symbol } = getSharedProductMetadata(quoteStaticData.metadata);
        return {
          symbol,
          isPrimaryQuote: false,
        };
      })();

      staticMarketDataByProductId.quotes[market.productId] = {
        productId: quoteProductIdForMarket,
        symbol,
        isPrimaryQuote,
      };
    });

    return staticMarketDataByProductId;
  };

  const query = useQuery({
    queryKey: allStaticMarketsDataQueryKey(primaryChainEnv),
    queryFn,
    enabled,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  return {
    ...query,
    isLoading: isLoadingMarkets || query.isLoading,
  };
}
