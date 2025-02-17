import { useQueryAllEdgeMarkets } from 'client/hooks/query/useQueryAllEdgeMarkets';
import { useEdgeMarketSnapshotsAtHistoricalTimes } from 'client/hooks/useEdgeMarketSnapshotsAtHistoricalTimes';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcTotalDecimalAdjustedDeltasUsd } from 'client/utils/calcTotalDecimalAdjustedDeltasUsd';
import { calcTotalDecimalAdjustedValueUsd } from 'client/utils/calcTotalDecimalAdjustedValueUsd';
import { getVolumesInPrimaryQuoteByProductId } from 'client/utils/getVolumesInPrimaryQuoteByProductId';
import { useMemo } from 'react';

export function useEdgeVolumeOverviewData() {
  const { data: allEdgeMarketsData } = useQueryAllEdgeMarkets();
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

    const cumulativeVolumesAtNowInPrimaryQuote =
      getVolumesInPrimaryQuoteByProductId(
        edgeMarketSnapshotAtNow?.cumulativeVolumes,
        allEdgeMarketsData,
      );

    const cumulativeVolumesAt24hInPrimaryQuote =
      getVolumesInPrimaryQuoteByProductId(
        edgeMarketSnapshotAt24h?.cumulativeVolumes,
        allEdgeMarketsData,
      );

    const edgeTotalVolume24hUsd = calcTotalDecimalAdjustedDeltasUsd(
      cumulativeVolumesAtNowInPrimaryQuote,
      cumulativeVolumesAt24hInPrimaryQuote,
      primaryQuotePriceUsd,
    );

    const edgeTotalVolumeAllTimeUsd = calcTotalDecimalAdjustedValueUsd(
      cumulativeVolumesAtNowInPrimaryQuote,
      primaryQuotePriceUsd,
    );

    return {
      edgeTotalVolume24hUsd,
      edgeTotalVolumeAllTimeUsd,
    };
  }, [
    allEdgeMarketsData,
    marketSnapshotsAtHistoricalTimesData,
    primaryQuotePriceUsd,
  ]);

  return {
    data: mappedData,
    isLoading: isLoadingMarketSnapshotsAtHistoricalTimesData,
  };
}
