import { TimeInSeconds } from '@vertex-protocol/client';
import { useEdgeMarketSnapshots } from '@vertex-protocol/react-client';
import { nonNullFilter } from '@vertex-protocol/web-common';
import { useAllMarkets24hFundingRates as useAllMarkets24hFundingRates } from 'client/hooks/query/markets/useAllMarkets24hFundingRates';
import { useFundingRatePeriod } from 'client/modules/trading/hooks/useFundingRatePeriod';
import { getFundingRates } from 'client/utils/calcs/perp/funding';
import { secondsToMilliseconds } from 'date-fns';
import { useMemo } from 'react';

export interface FundingChartItem {
  timestampMillis: number;
  fundingRate: number;
}

interface Params {
  productId: number | undefined;
}

export function useFundingChart({ productId }: Params) {
  const { fundingRatePeriod } = useFundingRatePeriod();

  const {
    data: edgeMarketSnapshotsData,
    isLoading: isLoadingEdgeMarketSnapshotsData,
  } = useEdgeMarketSnapshots({
    granularity: TimeInSeconds.HOUR,
    limit: 30,
    disabled: productId == null,
  });
  const { data: currentFundingRates } = useAllMarkets24hFundingRates();

  const predictedFundingRates = useMemo(() => {
    if (!productId || !currentFundingRates) {
      return;
    }
    return getFundingRates(currentFundingRates[productId].fundingRate);
  }, [currentFundingRates, productId]);

  const mappedFundingRates = useMemo((): FundingChartItem[] => {
    if (!productId || !edgeMarketSnapshotsData) {
      return [];
    }

    return (
      edgeMarketSnapshotsData.edge
        .map((currentSnapshot) => {
          const timestampMillis = secondsToMilliseconds(
            currentSnapshot.timestamp.toNumber(),
          );

          const fundingRate = (() => {
            const snapshotFundingRate = currentSnapshot.fundingRates[productId];

            if (!snapshotFundingRate) {
              return 0;
            }

            // Funding rate from market snapshots is an hourly average and `getFundingRates` is based on a daily figure
            const fundingRates = getFundingRates(
              snapshotFundingRate.multipliedBy(24),
            );

            return fundingRates[fundingRatePeriod].toNumber();
          })();

          return {
            timestampMillis,
            fundingRate,
          };
        })
        .filter(nonNullFilter)
        // Data from query needs to be reversed so we have the most recent timestamps last.
        .reverse()
    );
  }, [edgeMarketSnapshotsData, productId, fundingRatePeriod]);

  return {
    mappedFundingRates,
    predictedFundingRate: predictedFundingRates?.[fundingRatePeriod],
    isLoadingEdgeMarketSnapshotsData,
    fundingRatePeriod,
  };
}
