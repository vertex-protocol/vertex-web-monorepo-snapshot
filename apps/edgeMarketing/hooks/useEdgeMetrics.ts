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

export function useEdgeMetrics() {
  const { vertexClientsByChainEnv } = useVertexClientContext();

  const disabled = !vertexClientsByChainEnv;

  return useQuery({
    queryKey: ['edgeMetrics'],
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const {
        blast: blastClient,
        base: baseClient,
        arbitrum: arbitrumClient,
        mantle: mantleClient,
        sei: seiClient,
      } = vertexClientsByChainEnv;

      const snapshotParams = {
        granularity: TimeInSeconds.DAY,
        limit: 1,
      };

      // Blast chain snapshot
      const blastSnapshot =
        blastClient.client.market.getMarketSnapshots(snapshotParams);
      //Vertex chains snapshots
      const baseSnapshot =
        baseClient.client.market.getMarketSnapshots(snapshotParams);
      const seiSnapshot =
        seiClient.client.market.getMarketSnapshots(snapshotParams);
      const mantleSnapshot =
        mantleClient.client.market.getMarketSnapshots(snapshotParams);
      const arbitrumSnapshot =
        arbitrumClient.client.market.getMarketSnapshots(snapshotParams);

      let totalVertexVolume = BigDecimals.ZERO;
      let totalBlitzVolume = BigDecimals.ZERO;

      const [blastResult, ...vertexResults] = await Promise.allSettled([
        blastSnapshot,
        baseSnapshot,
        seiSnapshot,
        mantleSnapshot,
        arbitrumSnapshot,
      ]);

      if (blastResult.status === 'fulfilled') {
        const [blastSnapshot] = blastResult.value;

        totalBlitzVolume =
          getDecimalAdjustedSnapshotCumulativeVolume(blastSnapshot);
      }

      vertexResults.forEach((result) => {
        if (result.status === 'fulfilled') {
          const [vertexSnapshot] = result.value;

          totalVertexVolume = totalVertexVolume.plus(
            getDecimalAdjustedSnapshotCumulativeVolume(vertexSnapshot),
          );
        }
      });

      return {
        totalBlitzVolume,
        totalVertexVolume,
      };
    },
    enabled: !disabled,
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
