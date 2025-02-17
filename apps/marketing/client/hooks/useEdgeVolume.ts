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

export function useEdgeVolume() {
  const { primaryChainVertexClient } = useVertexClientContext();

  const disabled = !primaryChainVertexClient;

  return useQuery({
    queryKey: ['edgeVolume'],
    queryFn: async () => {
      if (disabled) {
        throw new QueryDisabledError();
      }

      const snapshotParams = {
        granularity: TimeInSeconds.DAY,
        limit: 1,
      };

      const snapshotResults =
        await primaryChainVertexClient.client.market.getEdgeMarketSnapshots(
          snapshotParams,
        );

      let totalCumulativeVolume = BigDecimals.ZERO;

      Object.values(snapshotResults).forEach((snapshots) => {
        const latestSnapshot = last(snapshots);

        totalCumulativeVolume = totalCumulativeVolume.plus(
          getDecimalAdjustedSnapshotCumulativeVolume(latestSnapshot),
        );
      });

      return totalCumulativeVolume;
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
