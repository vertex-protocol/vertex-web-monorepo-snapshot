import { useQuery } from '@tanstack/react-query';
import { IndexerOraclePrice } from '@vertex-protocol/indexer-client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useQueryAllEdgeMarkets } from 'client/hooks/query/useQueryAllEdgeMarkets';

/**
 * Oracle prices for all products, in terms of the chain primary quote (Product ID of 0)
 */
export function useQueryOraclePrices() {
  const { data: allEdgeMarketsData } = useQueryAllEdgeMarkets();
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient || !allEdgeMarketsData;

  return useQuery({
    queryKey: createQueryKey('latestOraclePrices'),
    queryFn: async (): Promise<Record<number, IndexerOraclePrice>> => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const latestOraclePriceByProductId: Record<number, IndexerOraclePrice> =
        {};

      const queryData =
        await vertexClient.context.indexerClient.getOraclePrices({
          productIds: allEdgeMarketsData.allMarketsProductIds,
        });

      queryData.forEach((price) => {
        latestOraclePriceByProductId[price.productId] = price;
      });

      return latestOraclePriceByProductId;
    },
    enabled: !disabled,
  });
}
