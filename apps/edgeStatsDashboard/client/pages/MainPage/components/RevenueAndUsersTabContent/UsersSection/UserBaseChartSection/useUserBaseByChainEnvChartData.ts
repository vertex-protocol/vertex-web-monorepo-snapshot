import {
  ChainEnvWithEdge,
  useEdgeMarketSnapshots,
} from '@vertex-protocol/react-client';
import { ChainEnvBreakdownStatsChartDataItem } from 'client/components/charts/ChainEnvBreakdownStatsChart/types';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { processIndexerMarketSnapshots } from 'client/utils/processIndexerMarketSnapshots';
import { useMemo } from 'react';

export function useUserBaseByChainEnvChartData() {
  const { granularity, queryLimit } = useChartTimeframe();

  const {
    data: edgeMarketSnapshotsData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  } = useEdgeMarketSnapshots({
    granularity,
    limit: queryLimit,
  });

  const mappedData = useMemo(() => {
    if (!edgeMarketSnapshotsData) {
      return;
    }

    const usersByTimestamp: Record<
      number,
      ChainEnvBreakdownStatsChartDataItem
    > = {};

    Object.entries(edgeMarketSnapshotsData).forEach(([chainEnv, snapshots]) => {
      const chainEnvWithEdge = chainEnv as ChainEnvWithEdge;

      processIndexerMarketSnapshots(
        snapshots,
        (
          currentSnapshot,
          earlierSnapshot,
          currentTimestampMillis,
          earlierTimestampMillis,
        ) => {
          const deltaTotalUsers = currentSnapshot.cumulativeUsers.minus(
            earlierSnapshot.cumulativeUsers,
          );

          usersByTimestamp[currentTimestampMillis] = {
            data: {
              ...usersByTimestamp[currentTimestampMillis]?.data,
              [chainEnvWithEdge]: deltaTotalUsers.toNumber(),
              ...(chainEnvWithEdge === 'edge'
                ? {
                    edgeCumulative: currentSnapshot.cumulativeUsers.toNumber(),
                  }
                : {}),
            },
            currentTimestampMillis,
            earlierTimestampMillis,
          };
        },
      );
    });

    return {
      users: Object.values(usersByTimestamp),
    };
  }, [edgeMarketSnapshotsData]);

  return {
    data: mappedData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  };
}
