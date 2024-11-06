import { now } from 'lodash';
import { secondsToMilliseconds } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';
import { TimeInSeconds } from '@vertex-protocol/client';

const ONE_HOUR_MILLIS = secondsToMilliseconds(TimeInSeconds.HOUR);

/**
 * A countdown hook that returns the number of milliseconds until the next
 * funding time and the funding time itself in milliseconds.
 */
export function useNextFundingTime(): {
  millisToNextFunding: number | undefined;
  nextFundingTimeMillis: number | undefined;
} {
  const [millisToNextFunding, setMillisToNextFunding] = useState<number>();
  const [nextFundingTimeMillis, setNextFundingTimeMillis] = useState<number>();

  const updateCountdown = useCallback(() => {
    const nowTime = now();

    // we do not use date-fns' endOfHour here as it always returns in local timezone
    // we do not want a local timezone as we calculate difference to end of the hour in UTC time
    const startOfCurrentHourTime = nowTime - (nowTime % ONE_HOUR_MILLIS);
    const endOfCurrentHourTime = startOfCurrentHourTime + ONE_HOUR_MILLIS - 1;

    setMillisToNextFunding(endOfCurrentHourTime - nowTime);
    setNextFundingTimeMillis(endOfCurrentHourTime);
  }, []);

  useEffect(() => {
    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [updateCountdown]);

  return { millisToNextFunding, nextFundingTimeMillis };
}
