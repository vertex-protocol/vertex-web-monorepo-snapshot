import { useEdgeMarketSnapshotsAtHistoricalTimes } from 'client/hooks/useEdgeMarketSnapshotsAtHistoricalTimes';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcTotalDecimalAdjustedValueUsd } from 'client/utils/calcTotalDecimalAdjustedValueUsd';
import { useMemo } from 'react';

export function useEdgeMakerRebatesOverviewData() {
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

    const edgeTotalMakerRebatesUsd = calcTotalDecimalAdjustedValueUsd(
      edgeMarketSnapshotAtNow?.cumulativeMakerFees,
      primaryQuotePriceUsd,
    )?.abs();

    return {
      edgeTotalMakerRebatesUsd,
    };
  }, [marketSnapshotsAtHistoricalTimesData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingMarketSnapshotsAtHistoricalTimesData,
  };
}
