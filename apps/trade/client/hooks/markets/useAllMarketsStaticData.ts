import { useQuery } from '@tanstack/react-query';
import { ProductEngineType } from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { PrimaryChainID, usePrimaryChainId } from '@vertex-protocol/web-data';
import { useAllMarkets } from 'client/hooks/query/markets/useAllMarkets';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import {
  PerpProductMetadata,
  SpotProductMetadata,
} from 'common/productMetadata/types';

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

interface AllMarketsStaticData {
  // Quote is extracted for special treatment
  quote: SpotStaticMarketData;
  // Keyed by product ID
  all: Record<number, StaticMarketData>;
  spot: Record<number, SpotStaticMarketData>;
  perp: Record<number, PerpStaticMarketData>;
  allMarketsProductIds: number[];
  spotMarketsProductIds: number[];
  perpMarketsProductIds: number[];
}

function allStaticMarketsDataQueryKey(chainId: PrimaryChainID) {
  return ['staticMarketDataByProductId', chainId];
}

export function useAllMarketsStaticData() {
  const primaryChainId = usePrimaryChainId();
  const { data } = useAllMarkets();

  const enabled = !!data;

  const queryFn = (): AllMarketsStaticData => {
    if (!data) {
      throw new QueryDisabledError();
    }

    const quoteProduct = data.quoteProduct;
    const staticMarketDataByProductId: AllMarketsStaticData = {
      quote: {
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

    return staticMarketDataByProductId;
  };

  return useQuery({
    queryKey: allStaticMarketsDataQueryKey(primaryChainId),
    queryFn,
    enabled,
    staleTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
}
