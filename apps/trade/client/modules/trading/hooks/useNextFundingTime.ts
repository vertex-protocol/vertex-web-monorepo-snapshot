import { now } from 'lodash';
import { endOfHour } from 'date-fns';
import { useCallback, useEffect, useState } from 'react';

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
    const endOfCurrentHourTime = endOfHour(nowTime).getTime();
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
