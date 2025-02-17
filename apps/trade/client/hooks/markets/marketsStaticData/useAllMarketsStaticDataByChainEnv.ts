import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import { QueryDisabledError } from '@vertex-protocol/react-client';
import {
  AllMarketsStaticDataForChainEnv,
  PerpStaticMarketData,
  SpotStaticMarketData,
} from 'client/hooks/markets/marketsStaticData/types';
import { AllMarketsForChainEnv } from 'client/hooks/query/markets/allMarkets/types';
import { useAllMarketsByChainEnv } from 'client/hooks/query/markets/allMarkets/useAllMarketsByChainEnv';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { mapValues } from 'lodash';

function allStaticMarketsDataByChainEnvQueryKey() {
  return ['allMarketsStaticDataByChainEnv'];
}

type Data = Partial<Record<ChainEnv, AllMarketsStaticDataForChainEnv>>;

/**
 * Transforms all edge markets into a set of "static" metadata for each market, which is not expected to change
 * This is useful for components/hooks that need to display market metadata without needing to re-render on market updates
 */
export function useAllMarketsStaticDataByChainEnv() {
  const { data, isLoading: isLoadingMarkets } = useAllMarketsByChainEnv();

  const enabled = !!data;

  const queryFn = (): Data => {
    if (!data) {
      throw new QueryDisabledError();
    }

    return mapValues(data, (dataForChainEnv) =>
      dataForChainEnv
        ? getAllMarketsStaticDataForChainEnv(dataForChainEnv)
        : undefined,
    );
  };

  const query = useQuery({
    queryKey: allStaticMarketsDataByChainEnvQueryKey(),
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

function getAllMarketsStaticDataForChainEnv(
  data: AllMarketsForChainEnv,
): AllMarketsStaticDataForChainEnv {
  const quoteProduct = data.primaryQuoteProduct;
  const staticMarketDataByProductId: AllMarketsStaticDataForChainEnv = {
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
}
