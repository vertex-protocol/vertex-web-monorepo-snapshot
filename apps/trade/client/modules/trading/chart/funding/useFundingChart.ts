import { TimeInSeconds } from '@vertex-protocol/client';
import { useAllMarkets24HrFundingRates } from 'client/hooks/query/markets/useAllMarkets24hrFundingRates';
import { useMarketSnapshots } from 'client/hooks/query/markets/useMarketSnapshots';
import {
  FundingRateTimespan,
  getFundingRates,
} from 'client/utils/calcs/funding';
import {
  millisecondsToSeconds,
  secondsToMilliseconds,
  startOfHour,
} from 'date-fns';
import { now } from 'lodash';
import { useMemo, useState } from 'react';

export interface FundingChartItem {
  timestampMillis: number;
  fundingRate: number;
}

interface Params {
  productId: number | undefined;
}

export function useFundingChart({ productId }: Params) {
  const [timespan, setTimespan] = useState<FundingRateTimespan>('hourly');

  // The maxTimeInclusive is set to 15 seconds past the current hour to ensure the latest funding rate is included.
  // This is necessary since there can be a delay for snapshots to be indexed.
  const maxTimeInclusive =
    millisecondsToSeconds(startOfHour(now()).getTime()) + 15;

  const { data: marketSnapshots, isLoading: isLoadingMarketSnapshots } =
    useMarketSnapshots({
      productIds: productId ? [productId] : undefined,
      granularity: TimeInSeconds.HOUR,
      limit: 30,
      disabled: productId == null,
      maxTimeInclusive,
    });
  const { data: currentFundingRates } = useAllMarkets24HrFundingRates();

  const predictedFundingRates = useMemo(() => {
    if (!productId || !currentFundingRates) {
      return;
    }
    return getFundingRates(currentFundingRates[productId].fundingRate);
  }, [currentFundingRates, productId]);

  const mappedFundingRates = useMemo((): FundingChartItem[] => {
    if (!productId || !marketSnapshots) {
      return [];
    }

    return (
      Object.values(marketSnapshots)
        .map((snapshot) => {
          const timestampMillis = secondsToMilliseconds(
            snapshot.timestamp.toNumber(),
          );

          const fundingRate = (() => {
            const snapshotFundingRate = snapshot.fundingRates[productId];

            if (!snapshotFundingRate) {
              return 0;
            }

            // Funding rate from market snapshots is an hourly average and `getFundingRates` is based on a daily figure
            const fundingRates = getFundingRates(
              snapshotFundingRate.multipliedBy(24),
            );

            return fundingRates[timespan].toNumber();
          })();

          return {
            timestampMillis,
            fundingRate,
          };
        })
        // Data from query needs to be reversed so we have the most recent timestamps last.
        .reverse()
    );
  }, [marketSnapshots, productId, timespan]);

  return {
    mappedFundingRates,
    predictedFundingRate: predictedFundingRates?.[timespan],
    isLoadingMarketSnapshots,
    setTimespan,
    timespan,
  };
}
