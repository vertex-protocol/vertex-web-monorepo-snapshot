import { useQuery } from '@tanstack/react-query';
import { IndexerProductSnapshot } from '@vertex-protocol/client';
import { nowInSeconds } from '@vertex-protocol/utils';
import {
  createQueryKey,
  PrimaryChainID,
  QueryDisabledError,
  usePrimaryChainId,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';

export function allProductsHistoricalSnapshotsQueryKey(
  chainId?: PrimaryChainID,
  productIds?: number[],
  secondsBeforeNow?: number[],
) {
  return createQueryKey(
    'allProductsHistoricalSnapshot',
    chainId,
    productIds,
    secondsBeforeNow,
  );
}

/**
 * Fetches the latest snapshot available BEFORE now - each value in `secondsBeforeNow`.
 * If a snapshot does not exist, the value for the product ID key will be undefined.
 *
 * @param secondsBeforeNow
 */
export function useAllProductsHistoricalSnapshots(secondsBeforeNow: number[]) {
  const vertexClient = usePrimaryChainVertexClient();
  const primaryChainId = usePrimaryChainId();
  const { filteredProductIds: allProductIds } = useFilteredMarkets();

  const disabled = !vertexClient || allProductIds.length === 0;

  return useQuery({
    queryKey: allProductsHistoricalSnapshotsQueryKey(
      primaryChainId,
      allProductIds,
      secondsBeforeNow,
    ),
    queryFn: async (): Promise<Record<number, IndexerProductSnapshot>[]> => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const now = nowInSeconds();
      const maxTimestampInclusive = secondsBeforeNow.map((s) => now - s);

      const baseResponse = await vertexClient.market.getMultiProductSnapshots({
        maxTimestampInclusive,
        productIds: allProductIds,
      });

      // The base response is a map keyed by the values in `maxTimestampInclusive`.
      // We instead just return an array in the same order, so the caller can more
      // easily access the data.
      return maxTimestampInclusive.map((t) => baseResponse[t]);
    },
    enabled: !disabled,
    refetchInterval: 30000,
    staleTime: 10000,
  });
}
