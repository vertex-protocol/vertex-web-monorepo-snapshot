import { useQuery } from '@tanstack/react-query';
import { ChainEnv, nowInSeconds } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  useEVMContext,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useOperationTimeLogger } from 'client/hooks/util/useOperationTimeLogger';

interface Params {
  productIds?: number[];
  granularity: number;
  limit: number;
  disabled?: boolean;
  /** The max timestamp to be queried. This needs to be a stable value to avoid re-fetching on every re-render. If not provided it defaults to now. */
  maxTimeInclusive?: number;
}

export function marketsSnapshotsQueryKey(
  chainEnv?: ChainEnv,
  productIds?: number[] | 'all',
  granularity?: number,
  limit?: number,
  maxTimeInclusive?: number,
) {
  return createQueryKey(
    'marketsSnapshots',
    chainEnv,
    productIds,
    granularity,
    limit,
    maxTimeInclusive,
  );
}

export function useMarketSnapshots({
  productIds,
  granularity,
  limit,
  disabled: disabledOverride,
  maxTimeInclusive,
}: Params) {
  const { primaryChainEnv } = useEVMContext();
  const { startProfiling, endProfiling } = useOperationTimeLogger(
    'marketSnapshots',
    true,
  );
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient || disabledOverride;

  return useQuery({
    queryKey: marketsSnapshotsQueryKey(
      primaryChainEnv,
      productIds ?? 'all',
      granularity,
      limit,
      maxTimeInclusive,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      startProfiling();
      const data = await vertexClient.market.getMarketSnapshots({
        productIds,
        granularity,
        limit,
        maxTimeInclusive: maxTimeInclusive ?? nowInSeconds(),
      });
      endProfiling();
      return data;
    },
    enabled: !disabled,
    refetchInterval: 30000,
  });
}
