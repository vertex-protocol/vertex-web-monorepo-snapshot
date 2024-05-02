import {
  PrimaryChainID,
  usePrimaryChainId,
  useVertexClient,
} from '@vertex-protocol/web-data';
import { useQuery } from '@tanstack/react-query';
import { nowInSeconds } from '@vertex-protocol/utils';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';
import { QueryDisabledError } from 'client/hooks/query/QueryDisabledError';
import { createQueryKey } from '@vertex-protocol/web-data';

export function allProductsHistoricalSnapshotQueryKey(
  chainId?: PrimaryChainID,
  productIds?: number[],
  minimumSecondsBeforeNow?: number,
) {
  return createQueryKey(
    'allProductsHistoricalSnapshot',
    chainId,
    productIds,
    minimumSecondsBeforeNow,
  );
}

/**
 * Fetches the latest snapshot available BEFORE now - minimumSecondsBeforeNow. If a snapshot does not exist, the value
 * for the product ID key will be undefined.
 *
 * @param minimumSecondsBeforeNow
 */
export function useAllProductsHistoricalSnapshot(
  minimumSecondsBeforeNow: number,
) {
  const vertexClient = useVertexClient();
  const primaryChainId = usePrimaryChainId();
  const { filteredProductIds: allProductIds } = useFilteredMarkets();

  const disabled = !vertexClient || allProductIds.length === 0;

  return useQuery({
    queryKey: allProductsHistoricalSnapshotQueryKey(
      primaryChainId,
      allProductIds,
      minimumSecondsBeforeNow,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const now = nowInSeconds();
      return vertexClient.market.getMultiProductSnapshots({
        maxTimestampInclusive: now - minimumSecondsBeforeNow,
        productIds: allProductIds,
      });
    },
    enabled: !disabled,
    refetchInterval: 30000,
    staleTime: 10000,
  });
}
