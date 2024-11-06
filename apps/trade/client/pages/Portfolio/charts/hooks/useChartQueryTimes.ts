import { nowInSeconds, TimeInSeconds } from '@vertex-protocol/utils';
import { useSubaccountCreationTime } from 'client/hooks/query/subaccount/useSubaccountCreationTime';
import { ChartTimespan } from 'client/pages/Portfolio/charts/types';
import { rangeRight } from 'lodash';
import { useMemo } from 'react';

interface ChartQueryTimes {
  secondsBeforeNow: number[];
  interval: number;
}

/**
 * Given a timespan selection, return the query times for the chart, structured as an array of (secondsBeforeNow)[]
 * where the last element is 0 (i.e. current time)
 *
 * 24 hour: hourly interval
 * 7 day: 6 hour interval
 * 1 month: 1 day interval
 * all time: use 50 data points that go back to max(time to account creation, 1 week)
 */
export function useChartQueryTimes(timespan: ChartTimespan) {
  const { data: subaccountCreationTime } = useSubaccountCreationTime();

  return useMemo((): ChartQueryTimes | undefined => {
    // If still loading subaccount creation time, we can't yet determine a valid time range for a query
    // Explicit check for undefined is required as null indicates that subaccount does not exist
    if (subaccountCreationTime === undefined && timespan === 'all_time') {
      return;
    }

    const now = nowInSeconds();

    const { interval, earliestSecondsBeforeNow } = (() => {
      const secondsToCreationTime = (() => {
        const timeDiff = subaccountCreationTime
          ? now - subaccountCreationTime.toNumber()
          : 0;

        return Math.max(timeDiff, TimeInSeconds.DAY * 7);
      })();

      switch (timespan) {
        case '24hr':
          return {
            interval: TimeInSeconds.MINUTE * 20,
            earliestSecondsBeforeNow: TimeInSeconds.DAY,
          };
        case '7d':
          return {
            interval: TimeInSeconds.HOUR * 3,
            earliestSecondsBeforeNow: TimeInSeconds.DAY * 7,
          };
        case '1m':
          return {
            interval: TimeInSeconds.HOUR * 12,
            earliestSecondsBeforeNow: TimeInSeconds.DAY * 30,
          };
        case 'all_time':
          return {
            interval: Math.round(secondsToCreationTime / 60),
            earliestSecondsBeforeNow: secondsToCreationTime,
          };
      }
    })();

    return <ChartQueryTimes>{
      secondsBeforeNow: rangeRight(
        0,
        earliestSecondsBeforeNow + interval,
        interval,
      ),
      interval,
    };
  }, [subaccountCreationTime, timespan]);
}
