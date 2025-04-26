import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import {
  AnnotatedSpotMarket,
  QueryDisabledError,
} from '@vertex-protocol/react-client';
import {
  AllMarketsStaticDataForChainEnv,
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
  allMarketsData: AllMarketsForChainEnv,
): AllMarketsStaticDataForChainEnv {
  const quoteProduct = allMarketsData.primaryQuoteProduct;
  const vlpProduct = allMarketsData.vlpProduct;

  const data: AllMarketsStaticDataForChainEnv = {
    primaryQuoteProduct: getSpotStaticMarketData(quoteProduct),
    vlpProduct: vlpProduct ? getSpotStaticMarketData(vlpProduct) : undefined,
    allMarkets: {},
    spotProducts: {},
    spotMarkets: {},
    perpMarkets: {},
    quotes: {},
    allMarketsProductIds: allMarketsData.allMarketsProductIds,
    spotMarketsProductIds: allMarketsData.spotMarketsProductIds,
    perpMarketsProductIds: allMarketsData.perpMarketsProductIds,
  };

  /*
  Process all spot / perp markets
   */

  Object.values(allMarketsData.spotMarkets).forEach((spotMarket) => {
    data.spotMarkets[spotMarket.productId] =
      getSpotStaticMarketData(spotMarket);
  });

  Object.values(allMarketsData.perpMarkets).forEach((perpMarket) => {
    data.perpMarkets[perpMarket.productId] = {
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
  });

  /*
  Update all markets & all spot products
   */
  data.allMarkets = {
    ...data.spotMarkets,
    ...data.perpMarkets,
  };
  data.spotProducts = {
    ...data.spotMarkets,
    [QUOTE_PRODUCT_ID]: data.primaryQuoteProduct,
    ...(data.vlpProduct
      ? { [data.vlpProduct.productId]: data.vlpProduct }
      : {}),
  };

  /*
  Construct the quotes for each market
   */
  Object.values(data.allMarkets).forEach((market) => {
    const quoteProductIdForMarket = market.metadata.quoteProductId;

    const { symbol, isPrimaryQuote } = (() => {
      if (quoteProductIdForMarket === QUOTE_PRODUCT_ID) {
        return {
          symbol: data.primaryQuoteProduct.metadata.token.symbol,
          isPrimaryQuote: true,
        };
      }

      const quoteStaticData = data.allMarkets[quoteProductIdForMarket];

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

    data.quotes[market.productId] = {
      productId: quoteProductIdForMarket,
      symbol,
      isPrimaryQuote,
    };
  });

  return data;
}

function getSpotStaticMarketData(
  spotMarket: AnnotatedSpotMarket,
): SpotStaticMarketData {
  return {
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
}
