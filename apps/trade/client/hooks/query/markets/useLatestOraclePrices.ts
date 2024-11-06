import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import { IndexerOraclePrice } from '@vertex-protocol/indexer-client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';

export function latestOraclePricesQueryKey(
  chainEnv?: ChainEnv,
  productIds?: number[],
) {
  return createQueryKey('latestOraclePrices', chainEnv, productIds);
}

/**
 * Latest oracle prices, in terms of the primary quote (Product ID of 0)
 */
export function useLatestOraclePrices() {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();
  const { filteredProductIds: allProductIds } = useFilteredMarkets();

  const disabled = !vertexClient || !allProductIds.length;

  return useQuery({
    queryKey: latestOraclePricesQueryKey(primaryChainEnv, allProductIds),
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
