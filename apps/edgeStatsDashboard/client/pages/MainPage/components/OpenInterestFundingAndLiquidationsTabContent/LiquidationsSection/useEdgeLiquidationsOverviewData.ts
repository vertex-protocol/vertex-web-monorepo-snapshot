import { useEdgeMarketSnapshotsAtHistoricalTimes } from 'client/hooks/useEdgeMarketSnapshotsAtHistoricalTimes';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcTotalDecimalAdjustedDeltasUsd } from 'client/utils/calcTotalDecimalAdjustedDeltasUsd';
import { useMemo } from 'react';
import { calcTotalDecimalAdjustedValueUsd } from 'client/utils/calcTotalDecimalAdjustedValueUsd';

export function useEdgeLiquidationsOverviewData() {
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
      marketSnapshotsAtHistoricalTimesData['24h'].edge;

    const edgeLiquidationsAllTimeUsd = calcTotalDecimalAdjustedValueUsd(
      edgeMarketSnapshotAtNow?.cumulativeLiquidationAmounts,
      primaryQuotePriceUsd,
    );

    const edgeLiquidations24hUsd = calcTotalDecimalAdjustedDeltasUsd(
      edgeMarketSnapshotAtNow?.cumulativeLiquidationAmounts,
      edgeMarketSnapshotAt24h?.cumulativeLiquidationAmounts,
      primaryQuotePriceUsd,
    );

    return {
      edgeLiquidationsAllTimeUsd,
      edgeLiquidations24hUsd,
    };
  }, [marketSnapshotsAtHistoricalTimesData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingMarketSnapshotsAtHistoricalTimesData,
  };
}
