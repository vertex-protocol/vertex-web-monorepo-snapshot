import { safeDiv } from '@vertex-protocol/web-common';
import { useEdgeMarketSnapshotsAtHistoricalTimes } from 'client/hooks/useEdgeMarketSnapshotsAtHistoricalTimes';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { getTotalTradingFeesByProductId } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/utils/getTotalTradingFeesByProductId';
import { calcTotalDecimalAdjustedValueUsd } from 'client/utils/calcTotalDecimalAdjustedValueUsd';
import { useMemo } from 'react';

export function useEdgeUserBaseOverviewData() {
  const {
    data: marketSnapshotsAtHistoricalTimesData,
    isLoading: isLoadingMarketSnapshotsAtHistoricalTimesData,
  } = useEdgeMarketSnapshotsAtHistoricalTimes();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const mappedData = useMemo(() => {
    if (!marketSnapshotsAtHistoricalTimesData) {
      return;
    }

    const edgeMarketSnapshotAtNow =
      marketSnapshotsAtHistoricalTimesData.now.edge;
    const edgeMarketSnapshotAt24h =
      marketSnapshotsAtHistoricalTimesData['24h'].edge;

    const edgeNewUsers24h = edgeMarketSnapshotAt24h
      ? edgeMarketSnapshotAtNow?.cumulativeUsers?.minus(
          edgeMarketSnapshotAt24h.cumulativeUsers,
        )
      : undefined;

    const edgeTotalUsers = edgeMarketSnapshotAtNow?.cumulativeUsers;

    const edgeTotalFeesUsd = calcTotalDecimalAdjustedValueUsd(
      getTotalTradingFeesByProductId(edgeMarketSnapshotAtNow),
      primaryQuotePriceUsd,
    );

    // Total edge cumulative fees / number of edge total users.
    const edgeAvgUserFeesUsd = (() => {
      if (!edgeTotalFeesUsd || !edgeTotalUsers) {
        return;
      }

      return safeDiv(edgeTotalFeesUsd, edgeTotalUsers);
    })();

    return {
      edgeNewUsers24h,
      edgeTotalUsers,
      edgeAvgUserFeesUsd,
    };
  }, [marketSnapshotsAtHistoricalTimesData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingMarketSnapshotsAtHistoricalTimesData,
  };
}
