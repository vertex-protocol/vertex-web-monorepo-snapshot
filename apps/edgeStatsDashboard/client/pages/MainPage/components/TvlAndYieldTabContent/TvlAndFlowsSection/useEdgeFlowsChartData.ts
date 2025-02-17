import { StatsChartDataItem } from 'client/components/charts/StatsChart/types';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useEdgeMarketSnapshots } from 'client/hooks/useEdgeMarketSnapshots';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcTotalDecimalAdjustedDeltasUsd } from 'client/utils/calcTotalDecimalAdjustedDeltasUsd';
import { getAverageOraclePricesByProductId } from 'client/utils/getAverageOraclePricesByProductId';
import { getValuesInPrimaryQuoteByProductId } from 'client/utils/getValuesInPrimaryQuoteByProductId';
import { processIndexerMarketSnapshots } from 'client/utils/processIndexerMarketSnapshots';
import { useMemo } from 'react';

interface EdgeFlowsStatsChartDataItem
  extends StatsChartDataItem<
    'depositsUsd' | 'withdrawalsUsd' | 'netFlowsUsd'
  > {}

export function useEdgeFlowsChartData() {
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
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

    const flowsUsd: EdgeFlowsStatsChartDataItem[] = [];

    processIndexerMarketSnapshots(
      edgeMarketSnapshotsData.edge,
      (
        currentSnapshot,
        earlierSnapshot,
        currentTimestampMillis,
        earlierTimestampMillis,
      ) => {
        const avgOraclePricesByProductId = getAverageOraclePricesByProductId(
          currentSnapshot.oraclePrices,
          earlierSnapshot.oraclePrices,
        );

        const depositsDeltaUsd = calcTotalDecimalAdjustedDeltasUsd(
          getValuesInPrimaryQuoteByProductId(
            currentSnapshot.cumulativeInflows,
            avgOraclePricesByProductId,
          ),
          getValuesInPrimaryQuoteByProductId(
            earlierSnapshot.cumulativeInflows,
            avgOraclePricesByProductId,
          ),
          primaryQuotePriceUsd,
        );

        const withdrawalsDeltaUsd = calcTotalDecimalAdjustedDeltasUsd(
          getValuesInPrimaryQuoteByProductId(
            currentSnapshot.cumulativeOutflows,
            avgOraclePricesByProductId,
          ),
          getValuesInPrimaryQuoteByProductId(
            earlierSnapshot.cumulativeOutflows,
            avgOraclePricesByProductId,
          ),
          primaryQuotePriceUsd,
        );

        const netFlowsUsd = depositsDeltaUsd.plus(withdrawalsDeltaUsd);

        flowsUsd.push({
          data: {
            netFlowsUsd: netFlowsUsd.toNumber(),
            depositsUsd: depositsDeltaUsd.toNumber(),
            withdrawalsUsd: withdrawalsDeltaUsd.toNumber(),
          },
          currentTimestampMillis,
          earlierTimestampMillis,
        });
      },
    );

    return {
      flowsUsd,
    };
  }, [edgeMarketSnapshotsData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  };
}
