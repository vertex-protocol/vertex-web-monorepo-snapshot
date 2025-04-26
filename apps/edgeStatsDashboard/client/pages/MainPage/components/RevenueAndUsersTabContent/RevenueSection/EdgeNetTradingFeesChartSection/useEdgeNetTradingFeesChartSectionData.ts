import { useEdgeMarketSnapshots } from '@vertex-protocol/react-client';
import { StatsChartDataItem } from 'client/components/charts/StatsChart/types';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { getTotalTradingFeesByProductId } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/utils/getTotalTradingFeesByProductId';
import { calcTotalDecimalAdjustedDeltasUsd } from 'client/utils/calcTotalDecimalAdjustedDeltasUsd';
import { processIndexerMarketSnapshots } from 'client/utils/processIndexerMarketSnapshots';
import { useMemo } from 'react';

interface NetTradingFeesStatsChartDataItem
  extends StatsChartDataItem<
    'takerTradingFeesUsd' | 'makerTradingFeesUsd' | 'netTradingFeesUsd'
  > {}

export function useEdgeNetTradingFeesChartSectionData() {
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

    const netTradingFeesUsd: NetTradingFeesStatsChartDataItem[] = [];

    processIndexerMarketSnapshots(
      edgeMarketSnapshotsData.edge,
      (
        currentSnapshot,
        earlierSnapshot,
        currentTimestampMillis,
        earlierTimestampMillis,
      ) => {
        const makerTradingFeesUsd = calcTotalDecimalAdjustedDeltasUsd(
          currentSnapshot.cumulativeMakerFees,
          earlierSnapshot.cumulativeMakerFees,
          primaryQuotePriceUsd,
        );

        const takerTradingFeesUsd = calcTotalDecimalAdjustedDeltasUsd(
          getTotalTradingFeesByProductId(currentSnapshot),
          getTotalTradingFeesByProductId(earlierSnapshot),
          primaryQuotePriceUsd,
        );

        const totalNetTradingFeesUsd =
          takerTradingFeesUsd.plus(makerTradingFeesUsd);

        netTradingFeesUsd.push({
          data: {
            takerTradingFeesUsd: takerTradingFeesUsd.toNumber(),
            makerTradingFeesUsd: makerTradingFeesUsd.toNumber(),
            netTradingFeesUsd: totalNetTradingFeesUsd.toNumber(),
          },
          currentTimestampMillis,
          earlierTimestampMillis,
        });
      },
    );

    return {
      netTradingFeesUsd,
    };
  }, [edgeMarketSnapshotsData, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  };
}
