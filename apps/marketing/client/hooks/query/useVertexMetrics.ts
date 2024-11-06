import { useQuery } from '@tanstack/react-query';
import {
  BigDecimals,
  IndexerMarketSnapshot,
  TimeInSeconds,
  removeDecimals,
  sumBigDecimalBy,
} from '@vertex-protocol/client';
import {
  QueryDisabledError,
  useVertexClientContext,
} from '@vertex-protocol/react-client';

export function useVertexMetrics() {
  const { vertexClientsByChainEnv } = useVertexClientContext();

  const disabled = !vertexClientsByChainEnv;

  const queryFn = async () => {
    if (disabled) {
      throw new QueryDisabledError();
    }
    const {
      base: baseClient,
      arbitrum: arbitrumClient,
      mantle: mantleClient,
      sei: seiClient,
    } = vertexClientsByChainEnv;

    const snapshotParams = {
      granularity: TimeInSeconds.DAY,
      limit: 1,
    };

    const baseSnapshot =
      baseClient.client.market.getMarketSnapshots(snapshotParams);
    const seiSnapshot =
      seiClient.client.market.getMarketSnapshots(snapshotParams);
    const mantleSnapshot =
      mantleClient.client.market.getMarketSnapshots(snapshotParams);
    const arbitrumSnapshot =
      arbitrumClient.client.market.getMarketSnapshots(snapshotParams);

    let totalCumulativeVolume = BigDecimals.ZERO;

    const snapshotResults = await Promise.allSettled([
      baseSnapshot,
      seiSnapshot,
      mantleSnapshot,
      arbitrumSnapshot,
    ]);

    snapshotResults.forEach((result) => {
      if (result.status === 'fulfilled') {
        const [snapshot] = result.value;

        totalCumulativeVolume = totalCumulativeVolume.plus(
          getDecimalAdjustedSnapshotCumulativeVolume(snapshot),
        );
      }
    });

    return {
      totalCumulativeVolume,
    };
  };

  return useQuery({
    queryKey: ['marketSnapshotMetrics'],
    queryFn,
    enabled: !disabled,
    refetchInterval: 60000,
  });
}

function getDecimalAdjustedSnapshotCumulativeVolume(
  snapshot: IndexerMarketSnapshot | undefined,
) {
  if (!snapshot) {
    return BigDecimals.ZERO;
  }

  return removeDecimals(
    sumBigDecimalBy(Object.values(snapshot.cumulativeVolumes), (val) => val),
  );
}
