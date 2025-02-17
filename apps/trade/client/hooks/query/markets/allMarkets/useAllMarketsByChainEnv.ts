import { useQuery } from '@tanstack/react-query';
import { GetEngineAllMarketsResponse } from '@vertex-protocol/client';
import {
  ChainEnv,
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import {
  AnnotatedPerpMarket,
  AnnotatedSpotMarket,
  useVertexMetadataContext,
  VertexMetadataContextData,
} from '@vertex-protocol/react-client';
import {
  getPrimaryChain,
  QueryDisabledError,
  useVertexClientContext,
} from '@vertex-protocol/react-client';
import { AllMarketsForChainEnv } from 'client/hooks/query/markets/allMarkets/types';
import { useOperationTimeLogger } from 'client/hooks/util/useOperationTimeLogger';
import { mapValues } from 'lodash';

type Data = Partial<Record<ChainEnv, AllMarketsForChainEnv>>;

export function allMarketsByChainEnvQueryKey() {
  return ['allMarketsByChainEnv'];
}

/**
 * Query hook that returns all markets for all chain envs
 */
export function useAllMarketsByChainEnv() {
  const { startProfiling, endProfiling } = useOperationTimeLogger(
    'allMarketsByChainEnv',
    true,
  );
  const { vertexClientsByChainEnv, primaryChainVertexClient } =
    useVertexClientContext();
  const { getPerpMetadata, getSpotMetadataByChainEnv } =
    useVertexMetadataContext();

  const disabled = !primaryChainVertexClient || !vertexClientsByChainEnv;

  const queryFn = async (): Promise<Data> => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    startProfiling();
    const baseResponse =
      await primaryChainVertexClient.client.market.getEdgeAllEngineMarkets();
    endProfiling();

    return mapValues(vertexClientsByChainEnv, (vertexClient) => {
      const dataForChainEnv =
        baseResponse[getPrimaryChain(vertexClient.chainEnv).id];
      return getAllMarketsForChainEnv({
        data: dataForChainEnv,
        chainEnv: vertexClient.chainEnv,
        getSpotMetadataByChainEnv,
        getPerpMetadata,
      });
    });
  };

  return useQuery({
    queryKey: allMarketsByChainEnvQueryKey(),
    queryFn,
    enabled: !disabled,
    refetchInterval: 60000,
    staleTime: 60000,
  });
}

function getAllMarketsForChainEnv({
  data,
  chainEnv,
  getSpotMetadataByChainEnv,
  getPerpMetadata,
}: {
  data: GetEngineAllMarketsResponse;
  chainEnv: ChainEnv;
  getSpotMetadataByChainEnv: VertexMetadataContextData['getSpotMetadataByChainEnv'];
  getPerpMetadata: VertexMetadataContextData['getPerpMetadata'];
}): AllMarketsForChainEnv {
  let primaryQuoteProduct: AnnotatedSpotMarket | undefined = undefined;
  const spotMarkets: Record<number, AnnotatedSpotMarket> = {};
  const perpMarkets: Record<number, AnnotatedPerpMarket> = {};

  data.forEach((market) => {
    if (market.type === ProductEngineType.SPOT) {
      const metadata = getSpotMetadataByChainEnv(
        chainEnv,
        market.product.productId,
      );
      if (!metadata) {
        return;
      }

      const annotatedSpotMarket = { ...market, metadata };

      if (market.productId === QUOTE_PRODUCT_ID) {
        primaryQuoteProduct = annotatedSpotMarket;
      } else {
        spotMarkets[market.productId] = annotatedSpotMarket;
      }
    } else if (market.type === ProductEngineType.PERP) {
      const metadata = getPerpMetadata(market.product.productId);
      if (!metadata) {
        return;
      }

      // For example, if initial weight is 0.9, then max leverage is 1 / 0.1 = 10x
      const maxLeverage = Math.round(
        1 / (1 - market.product.longWeightInitial.toNumber()),
      );

      perpMarkets[market.productId] = {
        ...market,
        metadata,
        maxLeverage,
      };
    }
  });

  if (primaryQuoteProduct == null) {
    throw Error('Quote product not found');
  }

  const spotMarketsProductIds = Object.keys(spotMarkets).map(Number);
  const perpMarketsProductIds = Object.keys(perpMarkets).map(Number);

  return {
    primaryQuoteProduct,
    spotMarkets,
    perpMarkets,
    allMarkets: { ...spotMarkets, ...perpMarkets },
    allMarketsProductIds: [...spotMarketsProductIds, ...perpMarketsProductIds],
    spotMarketsProductIds,
    perpMarketsProductIds,
  };
}
