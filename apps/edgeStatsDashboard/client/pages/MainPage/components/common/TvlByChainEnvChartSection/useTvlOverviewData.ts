import { useEdgeMarketSnapshotsAtHistoricalTimes } from 'client/hooks/useEdgeMarketSnapshotsAtHistoricalTimes';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcDecimalAdjustedUsdValue } from 'client/utils/calcDecimalAdjustedUsdValue';
import { calcTotalDecimalAdjustedDeltasUsd } from 'client/utils/calcTotalDecimalAdjustedDeltasUsd';
import { getAverageOraclePricesByProductId } from 'client/utils/getAverageOraclePricesByProductId';
import { getValuesInPrimaryQuoteByProductId } from 'client/utils/getValuesInPrimaryQuoteByProductId';
import { useMemo } from 'react';

export function useTvlOverviewData() {
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

    const avgOraclePricesByProductId = getAverageOraclePricesByProductId(
      edgeMarketSnapshotAtNow?.oraclePrices,
      edgeMarketSnapshotAt24h?.oraclePrices,
    );

    const edgeTvlAtNowUsd = calcDecimalAdjustedUsdValue(
      edgeMarketSnapshotAtNow?.tvl,
      primaryQuotePriceUsd,
    );

    const edgeDeposits24hUsd = calcTotalDecimalAdjustedDeltasUsd(
      getValuesInPrimaryQuoteByProductId(
        edgeMarketSnapshotAtNow?.cumulativeInflows,
        avgOraclePricesByProductId,
      ),
      getValuesInPrimaryQuoteByProductId(
        edgeMarketSnapshotAt24h?.cumulativeInflows,
        avgOraclePricesByProductId,
      ),
      primaryQuotePriceUsd,
    );

    const edgeWithdrawals24hUsd = calcTotalDecimalAdjustedDeltasUsd(
      getValuesInPrimaryQuoteByProductId(
        edgeMarketSnapshotAtNow?.cumulativeOutflows,
        avgOraclePricesByProductId,
      ),
      getValuesInPrimaryQuoteByProductId(
        edgeMarketSnapshotAt24h?.cumulativeOutflows,
        avgOraclePricesByProductId,
      ),
      primaryQuotePriceUsd,
    );

    return {
      edgeTvlAtNowUsd,
      edgeDeposits24hUsd,
      edgeWithdrawals24hUsd,
    };
  }, [marketSnapshotsAtHistoricalTimesData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingMarketSnapshotsAtHistoricalTimesData,
  };
}
