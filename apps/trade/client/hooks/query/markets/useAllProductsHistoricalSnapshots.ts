import { useQuery } from '@tanstack/react-query';
import { ChainEnv, IndexerProductSnapshot } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { nowInSeconds } from '@vertex-protocol/utils';
import { useFilteredMarkets } from 'client/hooks/markets/useFilteredMarkets';

export function allProductsHistoricalSnapshotsQueryKey(
  chainEnv?: ChainEnv,
  productIds?: number[],
  secondsBeforeNow?: number[],
) {
  return createQueryKey(
    'allProductsHistoricalSnapshot',
    chainEnv,
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
  const { primaryChainEnv } = useEVMContext();
  const { filteredProductIds: allProductIds } = useFilteredMarkets();

  const disabled = !vertexClient || allProductIds.length === 0;

  return useQuery({
    queryKey: allProductsHistoricalSnapshotsQueryKey(
      primaryChainEnv,
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
  });
}
