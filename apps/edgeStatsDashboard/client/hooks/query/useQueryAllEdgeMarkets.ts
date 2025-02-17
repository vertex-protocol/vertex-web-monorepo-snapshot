import { useQuery } from '@tanstack/react-query';
import {
  ChainEnv,
  ProductEngineType,
  QUOTE_PRODUCT_ID,
} from '@vertex-protocol/contracts';
import {
  createQueryKey,
  getPrimaryChain,
  QueryDisabledError,
  useVertexClientContext,
} from '@vertex-protocol/react-client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import {
  EdgeAnnotatedMarket,
  EdgeAnnotatedPerpMarket,
  EdgeAnnotatedSpotMarket,
} from 'client/hooks/types';

export interface AllEdgeMarketsData {
  /**
   * Registered markets from product id -> data
   */
  allMarkets: Record<number, EdgeAnnotatedMarket>;
  spotMarkets: Record<number, EdgeAnnotatedSpotMarket>;
  perpMarkets: Record<number, EdgeAnnotatedPerpMarket>;
  allMarketsProductIds: number[];
  spotMarketsProductIds: number[];
  perpMarketsProductIds: number[];
  /**
    Primary quote requires special treatment as these share same product id between chains
  */
  primaryQuoteProductByChainEnv: Record<ChainEnv, EdgeAnnotatedMarket>;
}

/**
 * Fetches all edge markets. Assumes that allProducts are unique per chain and only quote products need special treatment by chainEnv.
 * @returns
 */
export function useQueryAllEdgeMarkets() {
  const { getSpotMetadataByChainEnv, getPerpMetadata } =
    useVertexMetadataContext();
  const { vertexClientsByChainEnv, primaryChainVertexClient } =
    useVertexClientContext();

  const disabled = !vertexClientsByChainEnv || !primaryChainVertexClient;

  const queryFn = async () => {
    if (disabled) {
      throw new QueryDisabledError();
    }

    const spotMarkets: Record<number, EdgeAnnotatedSpotMarket> = {};
    const perpMarkets: Record<number, EdgeAnnotatedPerpMarket> = {};
    const primaryQuoteProductByChainEnv: Record<
      string,
      EdgeAnnotatedSpotMarket
    > = {};

    const edgeAllEngineMarketsResponse =
      await primaryChainVertexClient.client.market.getEdgeAllEngineMarkets();

    Object.values(vertexClientsByChainEnv).forEach(({ chainEnv }) => {
      const chainId = getPrimaryChain(chainEnv).id;
      const allEngineMarketsData = edgeAllEngineMarketsResponse[chainId];

      allEngineMarketsData.forEach((market) => {
        if (market.type === ProductEngineType.SPOT) {
          const metadata = getSpotMetadataByChainEnv(
            chainEnv,
            market.product.productId,
          );
          if (!metadata) {
            return;
          }

          const annotatedSpotMarket = {
            ...market,
            // We need to have chainEnv for spot markets. So we can differentiate wETH on arb from wETH on base for ex.
            chainEnv,
            metadata,
          };

          if (market.productId === QUOTE_PRODUCT_ID) {
            // Add quote market to primaryQuoteProductByChainEnv
            primaryQuoteProductByChainEnv[chainEnv] = annotatedSpotMarket;
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
            // Perp markets are common between all chains. So we use edge.
            chainEnv: 'edge',
            maxLeverage,
          };
        }
      });
    });

    const spotMarketsProductIds = Object.keys(spotMarkets).map(Number);
    const perpMarketsProductIds = Object.keys(perpMarkets).map(Number);

    return {
      spotMarkets,
      perpMarkets,
      allMarkets: { ...spotMarkets, ...perpMarkets },
      allMarketsProductIds: [
        ...spotMarketsProductIds,
        ...perpMarketsProductIds,
      ],
      spotMarketsProductIds,
      perpMarketsProductIds,
      primaryQuoteProductByChainEnv,
    };
  };

  return useQuery({
    queryKey: createQueryKey('allEdgeMarkets'),
    queryFn,
    enabled: !disabled,
  });
}
