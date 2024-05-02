import { useQuery } from '@tanstack/react-query';
import { IndexerOraclePrice } from '@vertex-protocol/indexer-client';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function latestOraclePricesQueryKey(
  chainId?: PrimaryChainID,
  productIds?: number[],
) {
  return createQueryKey('latestOraclePrices', chainId, productIds);
}

export function useLatestOraclePrices() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
  const { filteredProductIds: allProductIds } = useFilteredMarkets();

  const disabled = !vertexClient || !allProductIds.length;

  return useQuery({
    queryKey: latestOraclePricesQueryKey(primaryChainId, allProductIds),
    // Keyed by product ID
    queryFn: async (): Promise<Record<number, IndexerOraclePrice>> => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      const queryData =
        await vertexClient.context.indexerClient.getOraclePrices({
          productIds: allProductIds,
        });

      const keyedData: Record<number, IndexerOraclePrice> = {};
      queryData.forEach((price) => {
        keyedData[price.productId] = price;
      });

      return keyedData;
    },
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
