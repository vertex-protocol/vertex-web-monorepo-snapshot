import { useQuery } from '@tanstack/react-query';
import { IndexerOraclePrice } from '@vertex-protocol/indexer-client';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';

export function latestOraclePricesQueryKey(
  chainId?: PrimaryChainID,
  productIds?: number[],
) {
  return createQueryKey('latestOraclePrices', chainId, productIds);
}

/**
 * Latest oracle prices, in terms of the primary quote (Product ID of 0)
 */
export function useLatestOraclePrices() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = usePrimaryChainVertexClient();
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
