import { useEdgeMarketSnapshots } from '@vertex-protocol/react-client';
import { StatsChartDataItem } from 'client/components/charts/StatsChart/types';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useMemo } from 'react';

export function useEdgeActiveUsersChartData() {
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

    const activeUsers: StatsChartDataItem<'activeUsers'>[] = [];

    edgeMarketSnapshotsData.edge.forEach((currentSnapshot) => {
      // If there is no data at current snapshots we skip.
      if (!currentSnapshot) {
        return;
      }

      // Use current snapshot timestamp here, as the value is daily, we don't need to calculate deltas.
      const currentTimestampMillis = currentSnapshot.timestamp
        .times(1000)
        .toNumber();

      const earlierTimestampMillis = currentSnapshot.timestamp
        .minus(granularity)
        .times(1000)
        .toNumber();

      activeUsers.push({
        data: {
          activeUsers: currentSnapshot.dailyActiveUsers.toNumber(),
        },
        currentTimestampMillis,
        earlierTimestampMillis,
      });
    });

    return {
      activeUsers,
    };
  }, [edgeMarketSnapshotsData, granularity]);

  return {
    data: mappedData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  };
}
