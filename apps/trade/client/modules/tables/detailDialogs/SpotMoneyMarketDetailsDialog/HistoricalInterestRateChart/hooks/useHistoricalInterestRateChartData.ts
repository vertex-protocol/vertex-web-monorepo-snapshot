import {
  calcAnnualizedInterestRate,
  useEdgeMarketSnapshots,
  useEVMContext,
} from '@vertex-protocol/react-client';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { useHistoricalInterestRateChartQueryParams } from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/HistoricalInterestRateChart/hooks/useHistoricalInterestRateChartQueryParams';
import { HistoricalInterestRateChartTimespan } from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/HistoricalInterestRateChart/types';
import { secondsToMilliseconds } from 'date-fns';
import { get } from 'lodash';
import { useMemo } from 'react';

interface Params {
  productId: number;
  timespan: HistoricalInterestRateChartTimespan;
}

export interface HistoricalInterestRateChartDataItem {
  timestampMillis: number;
  borrowAprFraction: number | undefined;
  depositAprFraction: number | undefined;
}

export function useHistoricalInterestRateChartData({
  productId,
  timespan,
}: Params) {
  const { primaryChainEnv } = useEVMContext();

  const queryParams = useHistoricalInterestRateChartQueryParams(timespan);

  const {
    data: edgeMarketSnapshotsData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  } = useEdgeMarketSnapshots(queryParams);

  const mappedData: HistoricalInterestRateChartDataItem[] | undefined =
    useMemo(() => {
      if (!edgeMarketSnapshotsData?.[primaryChainEnv]) {
        return;
      }

      return (
        edgeMarketSnapshotsData[primaryChainEnv]
          .map((currentSnapshot) => {
            if (!currentSnapshot) {
              return;
            }

            const timestampMillis = secondsToMilliseconds(
              currentSnapshot.timestamp.toNumber(),
            );

            const borrowAprFraction = calcAnnualizedInterestRate(
              get(currentSnapshot.borrowRates, productId, undefined),
            )?.toNumber();

            const depositAprFraction = calcAnnualizedInterestRate(
              get(currentSnapshot.depositRates, productId, undefined),
            )?.toNumber();

            return {
              borrowAprFraction,
              depositAprFraction,
              timestampMillis,
            };
          })
          .filter(nonNullFilter)
          // Data from query needs to be reversed so we have the most recent timestamps last.
          .reverse()
      );
    }, [edgeMarketSnapshotsData, primaryChainEnv, productId]);

  return {
    data: mappedData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  };
}
