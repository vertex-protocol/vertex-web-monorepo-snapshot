import { IndexerMarketSnapshot, TimeInSeconds } from '@vertex-protocol/client';
import { ChainEnvWithEdge } from 'client/hooks/types';
import { useEdgeMarketSnapshots } from 'client/hooks/useEdgeMarketSnapshots';
import { getRecordKeyedByChainEnvWithEdge } from 'client/hooks/utils';
import { first, get } from 'lodash';
import { useMemo } from 'react';

type SnapshotByChainEnv = Record<
  ChainEnvWithEdge,
  IndexerMarketSnapshot | undefined
>;

interface EdgeMarketSnapshotsAtHistoricalTimesData {
  now: SnapshotByChainEnv;
  ['24hr']: SnapshotByChainEnv;
  ['7d']: SnapshotByChainEnv;
  ['30d']: SnapshotByChainEnv;
}

/**
 * Provides historical snapshots at specific times (now, 24h, 7d, 30d).
 */
export function useEdgeMarketSnapshotsAtHistoricalTimes() {
  const {
    data: edgeMarketSnapshotsData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  } = useEdgeMarketSnapshots({
    limit: 2,
    granularity: TimeInSeconds.DAY,
  });

  const {
    data: edgeMarketSnapshots7dData,
    isLoading: isLoadingEdgeMarketSnapshots7dData,
  } = useEdgeMarketSnapshots({
    limit: 2,
    granularity: 7 * TimeInSeconds.DAY,
  });

  const {
    data: edgeMarketSnapshots30dData,
    isLoading: isLoadingEdgeMarketSnapshots30dData,
  } = useEdgeMarketSnapshots({
    limit: 2,
    granularity: 30 * TimeInSeconds.DAY,
  });

  const mappedData = useMemo(() => {
    if (
      !edgeMarketSnapshotsData ||
      !edgeMarketSnapshots7dData ||
      !edgeMarketSnapshots30dData
    ) {
      return;
    }

    const edgeMarketSnapshotsAtHistoricalTimesData: EdgeMarketSnapshotsAtHistoricalTimesData =
      {
        now: getRecordKeyedByChainEnvWithEdge(undefined),
        ['24hr']: getRecordKeyedByChainEnvWithEdge(undefined),
        ['7d']: getRecordKeyedByChainEnvWithEdge(undefined),
        ['30d']: getRecordKeyedByChainEnvWithEdge(undefined),
      };

    Object.keys(edgeMarketSnapshotsData).forEach((chainEnv) => {
      const chainEnvWithEdge = chainEnv as ChainEnvWithEdge;

      // Snapshots are in descending time. We always assume that there's a "latest" snapshot and use it as now.
      edgeMarketSnapshotsAtHistoricalTimesData.now[chainEnvWithEdge] = first(
        edgeMarketSnapshotsData[chainEnvWithEdge],
      );

      // Second snapshot might not exist if markets have not been up at that time (ex. 24hr, 7d...). This is relevant for the new chain launches.
      edgeMarketSnapshotsAtHistoricalTimesData['24hr'][chainEnvWithEdge] = get(
        edgeMarketSnapshotsData[chainEnvWithEdge],
        1,
        undefined,
      );

      edgeMarketSnapshotsAtHistoricalTimesData['7d'][chainEnvWithEdge] = get(
        edgeMarketSnapshots7dData[chainEnvWithEdge],
        1,
        undefined,
      );

      edgeMarketSnapshotsAtHistoricalTimesData['30d'][chainEnvWithEdge] = get(
        edgeMarketSnapshots30dData[chainEnvWithEdge],
        1,
        undefined,
      );
    });

    return edgeMarketSnapshotsAtHistoricalTimesData;
  }, [
    edgeMarketSnapshots30dData,
    edgeMarketSnapshots7dData,
    edgeMarketSnapshotsData,
  ]);

  return {
    data: mappedData,
    isLoading:
      isLoadingEdgeMarketSnapshotsData ||
      isLoadingEdgeMarketSnapshots7dData ||
      isLoadingEdgeMarketSnapshots30dData,
  };
}
