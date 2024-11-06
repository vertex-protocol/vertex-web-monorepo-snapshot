import { useQuery } from '@tanstack/react-query';
import { ChainEnv } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';

export function latestPerpPricesQueryKey(
  chainEnv?: ChainEnv,
  productIds?: number[],
) {
  return createQueryKey('latestPerpPrices', chainEnv, productIds);
}

export function useLatestPerpPrices() {
  const { primaryChainEnv } = useEVMContext();
  const vertexClient = usePrimaryChainVertexClient();
  const { filteredProductIds: allPerpProductIds } = useFilteredMarkets({
    marketCategory: 'perp',
  });

  const disabled = !vertexClient || !allPerpProductIds.length;

  return useQuery({
    queryKey: latestPerpPricesQueryKey(primaryChainEnv, allPerpProductIds),
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
