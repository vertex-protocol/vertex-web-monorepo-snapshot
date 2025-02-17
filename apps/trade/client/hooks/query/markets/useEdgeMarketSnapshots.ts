import { useQuery } from '@tanstack/react-query';
import { nowInSeconds } from '@vertex-protocol/client';
import {
  createQueryKey,
  QueryDisabledError,
  usePrimaryChainVertexClient,
} from '@vertex-protocol/react-client';
import { useOperationTimeLogger } from 'client/hooks/util/useOperationTimeLogger';

interface Params {
  granularity: number;
  limit: number;
  disabled?: boolean;
  /** The max timestamp to be queried. This needs to be a stable value to avoid re-fetching on every re-render. If not provided it defaults to now. */
  maxTimeInclusive?: number;
}

export function edgeMarketsSnapshotsQueryKey(
  granularity?: number,
  limit?: number,
  maxTimeInclusive?: number,
) {
  return createQueryKey(
    'edgeMarketsSnapshots',
    granularity,
    limit,
    maxTimeInclusive,
  );
}

export function useEdgeMarketSnapshots({
  granularity,
  limit,
  disabled: disabledOverride,
  maxTimeInclusive,
}: Params) {
  const { startProfiling, endProfiling } = useOperationTimeLogger(
    'edgeMarketSnapshots',
    true,
  );
  const vertexClient = usePrimaryChainVertexClient();

  const disabled = !vertexClient || disabledOverride;

  return useQuery({
    queryKey: edgeMarketsSnapshotsQueryKey(
      granularity,
      limit,
      maxTimeInclusive,
    ),
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      startProfiling();
      const data = await vertexClient.market.getEdgeMarketSnapshots({
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
