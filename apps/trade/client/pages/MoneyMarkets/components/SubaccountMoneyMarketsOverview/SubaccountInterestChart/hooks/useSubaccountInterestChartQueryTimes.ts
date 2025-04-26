import { nowInSeconds, TimeInSeconds } from '@vertex-protocol/utils';
import { useSubaccountCreationTime } from 'client/hooks/query/subaccount/useSubaccountCreationTime';
import { SubaccountInterestChartTimespan } from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountInterestChart/types';
import { rangeRight } from 'lodash';
import { useMemo } from 'react';

interface SubaccountInterestChartQueryTimes {
  secondsBeforeNow: number[];
}

/**
 * Given a timespan selection, return the query times for the chart, structured as an array of (secondsBeforeNow)[]
 * where the last element is 0 (i.e. current time)
 *
 * 24 hour: hourly interval
 * 7 day: 6 hour interval
 * 1 month: 1 day interval
 * all time: use 30 data points that go back to max(time to account creation, 1 week)
 *
 * Note that the maximum # of data points we query for is 30
 */
export function useSubaccountInterestChartQueryTimes(
  timespan: SubaccountInterestChartTimespan,
) {
  const { data: subaccountCreationTime } = useSubaccountCreationTime();

  return useMemo((): SubaccountInterestChartQueryTimes | undefined => {
    // If still loading subaccount creation time, we can't yet determine a valid time range for a query
    // Explicit check for undefined is required as null indicates that subaccount does not exist
    if (subaccountCreationTime === undefined && timespan === 'all_time') {
      return;
    }

    const now = nowInSeconds();

    const { interval, earliestSecondsBeforeNow } = (() => {
      const secondsToCreationTime = (() => {
        const timeDiff =
          subaccountCreationTime != null ? now - subaccountCreationTime : 0;

        return Math.max(timeDiff, TimeInSeconds.DAY * 7);
      })();

      switch (timespan) {
        case '24h':
          return {
            interval: TimeInSeconds.HOUR,
            earliestSecondsBeforeNow: TimeInSeconds.DAY,
          };
        case '7d':
          return {
            interval: TimeInSeconds.HOUR * 6,
            earliestSecondsBeforeNow: TimeInSeconds.DAY * 7,
          };
        case '30d':
          return {
            interval: TimeInSeconds.DAY,
            earliestSecondsBeforeNow: TimeInSeconds.DAY * 30,
          };
        case 'all_time':
          return {
            interval: Math.round(secondsToCreationTime / 30),
            earliestSecondsBeforeNow: secondsToCreationTime,
          };
      }
    })();

    return {
      secondsBeforeNow: rangeRight(
        0,
        earliestSecondsBeforeNow + interval,
        interval,
      ),
    };
  }, [subaccountCreationTime, timespan]);
}
