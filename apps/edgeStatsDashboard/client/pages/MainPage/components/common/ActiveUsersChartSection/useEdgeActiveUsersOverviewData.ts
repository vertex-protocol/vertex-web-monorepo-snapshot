import { useEdgeMarketSnapshotsAtHistoricalTimes } from 'client/hooks/useEdgeMarketSnapshotsAtHistoricalTimes';
import { useMemo } from 'react';

export function useEdgeActiveUsersOverviewData() {
  const {
    data: marketSnapshotsAtHistoricalTimesData,
    isLoading: isLoadingMarketSnapshotsAtHistoricalTimesData,
  } = useEdgeMarketSnapshotsAtHistoricalTimes();

  const mappedData = useMemo(() => {
    if (!marketSnapshotsAtHistoricalTimesData) {
      return;
    }

    const edgeMarketSnapshotAtNow =
      marketSnapshotsAtHistoricalTimesData.now.edge;

    const edgeActiveUsers24h = edgeMarketSnapshotAtNow?.dailyActiveUsers;

    const edgeTotalUsers = edgeMarketSnapshotAtNow?.cumulativeUsers;

    return {
      edge24ActiveUsers: edgeActiveUsers24h,
      edgeTotalUsers,
    };
  }, [marketSnapshotsAtHistoricalTimesData]);

  return {
    data: mappedData,
    isLoading: isLoadingMarketSnapshotsAtHistoricalTimesData,
  };
}
