import { useEdgeMarketSnapshotsAtHistoricalTimes } from 'client/hooks/useEdgeMarketSnapshotsAtHistoricalTimes';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { getTotalTradingFeesByProductId } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/utils/getTotalTradingFeesByProductId';
import { calcTotalDecimalAdjustedDeltasUsd } from 'client/utils/calcTotalDecimalAdjustedDeltasUsd';
import { calcTotalDecimalAdjustedValueUsd } from 'client/utils/calcTotalDecimalAdjustedValueUsd';
import { useMemo } from 'react';

export function useEdgeTradingFeesOverviewData() {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
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

    const edgeMarketSnapshotAt24h =
      marketSnapshotsAtHistoricalTimesData['24hr'].edge;

    const totalTradingFeesAtNowByProductId = getTotalTradingFeesByProductId(
      edgeMarketSnapshotAtNow,
    );

    const edgeTotalFeesAllTimeUsd = calcTotalDecimalAdjustedValueUsd(
      totalTradingFeesAtNowByProductId,
      primaryQuotePriceUsd,
    );

    const edgeTotalFees24hUsd = calcTotalDecimalAdjustedDeltasUsd(
      totalTradingFeesAtNowByProductId,
      getTotalTradingFeesByProductId(edgeMarketSnapshotAt24h),
      primaryQuotePriceUsd,
    );

    return {
      edgeTotalFeesAllTimeUsd,
      edgeTotalFees24hUsd,
    };
  }, [marketSnapshotsAtHistoricalTimesData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingMarketSnapshotsAtHistoricalTimesData,
  };
}
