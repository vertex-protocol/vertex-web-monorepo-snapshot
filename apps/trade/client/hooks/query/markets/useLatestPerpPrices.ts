import { useQuery } from '@tanstack/react-query';
import { ProductEngineType } from '@vertex-protocol/contracts';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';

export function latestPerpPricesQueryKey(
  chainId?: PrimaryChainID,
  productIds?: number[],
) {
  return createQueryKey('latestPerpPrices', chainId, productIds);
}

export function useLatestPerpPrices() {
  const primaryChainId = usePrimaryChainId();
  const vertexClient = usePrimaryChainVertexClient();
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
