import {
  ChainEnvWithEdge,
  useEdgeMarketSnapshots,
} from '@vertex-protocol/react-client';
import { ChainEnvBreakdownStatsChartDataItem } from 'client/components/charts/ChainEnvBreakdownStatsChart/types';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { usePrimaryQuotePriceUsd } from 'client/hooks/usePrimaryQuotePriceUsd';
import { calcTotalDecimalAdjustedValueUsd } from 'client/utils/calcTotalDecimalAdjustedValueUsd';
import { getValuesInPrimaryQuoteByProductId } from 'client/utils/getValuesInPrimaryQuoteByProductId';
import { useMemo } from 'react';

export function useDepositsByChainEnvChartData() {
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

    const depositsUsdByTimestamp: Record<
      number,
      ChainEnvBreakdownStatsChartDataItem
    > = {};

    Object.entries(edgeMarketSnapshotsData).forEach(([chainEnv, snapshots]) => {
      const chainEnvWithEdge = chainEnv as ChainEnvWithEdge;

      snapshots.forEach((currentSnapshot) => {
        if (!currentSnapshot) {
          return;
        }

        const currentTimestampMillis = currentSnapshot.timestamp
          .times(1000)
          .toNumber();

        const earlierTimestampMillis = currentSnapshot.timestamp
          .minus(granularity)
          .times(1000)
          .toNumber();

        const totalDepositsUsd = calcTotalDecimalAdjustedValueUsd(
          getValuesInPrimaryQuoteByProductId(
            currentSnapshot.totalDeposits,
            currentSnapshot.oraclePrices,
          ),
          primaryQuotePriceUsd,
        );

        depositsUsdByTimestamp[currentTimestampMillis] = {
          data: {
            ...depositsUsdByTimestamp[currentTimestampMillis]?.data,
            [chainEnvWithEdge]: totalDepositsUsd.toNumber(),
          },
          currentTimestampMillis,
          earlierTimestampMillis,
        };
      });
    });

    return {
      depositsUsd: Object.values(depositsUsdByTimestamp),
    };
  }, [edgeMarketSnapshotsData, granularity, primaryQuotePriceUsd]);

  return {
    data: mappedData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  };
}
