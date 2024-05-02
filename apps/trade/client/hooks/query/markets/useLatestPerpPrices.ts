import { useQuery } from '@tanstack/react-query';
import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  PrimaryChainID,
  createQueryKey,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';

export function latestPerpPricesQueryKey(
  chainId?: PrimaryChainID,
  productIds?: number[],
) {
  return createQueryKey('latestPerpPrices', chainId, productIds);
}

export function useLatestPerpPrices() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = useVertexClient();
  const { filteredProductIds: allPerpProductIds } = useFilteredMarkets({
    marketType: ProductEngineType.PERP,
  });

  const disabled = !vertexClient || !allPerpProductIds.length;

  return useQuery({
    queryKey: latestPerpPricesQueryKey(primaryChainId, allPerpProductIds),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }
      return vertexClient.perp.getMultiProductPerpPrices({
        productIds: allPerpProductIds,
      });
    },
    enabled: !disabled,
    refetchInterval: 10000,
  });
}
