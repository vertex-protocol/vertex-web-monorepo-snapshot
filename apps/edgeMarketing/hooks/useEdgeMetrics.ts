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
import { last } from 'lodash';
import { berachain, blast } from 'wagmi/chains';

export function useEdgeMetrics() {
  const { primaryChainVertexClient } = useVertexClientContext();

  const disabled = !primaryChainVertexClient;

  return useQuery({
    queryKey: ['edgeMetrics'],
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const snapshotParams = {
        granularity: TimeInSeconds.DAY,
        limit: 1,
      };

      // All Edge chains snapshots (incl Blast)
      const edgeSnapshots =
        await primaryChainVertexClient.client.market.getEdgeMarketSnapshots(
          snapshotParams,
        );

      let totalBlitzVolume = BigDecimals.ZERO;
      let totalVertexVolume = BigDecimals.ZERO;
      let totalBroTradeVolume = BigDecimals.ZERO;

      Object.entries(edgeSnapshots).forEach(([chainId, snapshots]) => {
        const latestSnapshot = last(snapshots);
        const totalCumulativeVolume =
          getDecimalAdjustedSnapshotCumulativeVolume(latestSnapshot);

        if (chainId === blast.id.toString()) {
          totalBlitzVolume = totalCumulativeVolume;
        } else if (chainId === berachain.id.toString()) {
          totalBroTradeVolume = totalCumulativeVolume;
        } else {
          totalVertexVolume = totalVertexVolume.plus(totalCumulativeVolume);
        }
      });

      return {
        totalBlitzVolume,
        totalVertexVolume,
        totalBroTradeVolume,
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
