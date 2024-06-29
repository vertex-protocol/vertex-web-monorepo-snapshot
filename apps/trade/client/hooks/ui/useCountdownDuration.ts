import {
  differenceInDays,
  differenceInHours,
  differenceInMinutes,
  differenceInSeconds,
  Duration,
} from 'date-fns';
import { now } from 'lodash';
import { useCallback, useEffect, useState } from 'react';

export type CountdownDuration = Pick<
  Required<Duration>,
  'days' | 'seconds' | 'minutes' | 'hours'
>;

/**
 * Returns a duration object of ONLY the days, hours, minutes, and seconds
 * @param to
 */
export function useCountdownDuration(to: number | undefined) {
  const [duration, setDuration] = useState<CountdownDuration>({
    days: 0,
    hours: 0,
    seconds: 0,
    minutes: 0,
  });

  const updateDuration = useCallback(() => {
    if (!to) {
      return;
    }

    // If now > to, then we want to show 0
    const startTime = Math.min(now(), to);

    // intervalToDuration seems to give buggy negative numbers, so compute the differences manually
    const days = differenceInDays(to, startTime);
    const totalHours = differenceInHours(to, startTime);
    const totalMinutes = differenceInMinutes(to, startTime);
    const totalSeconds = differenceInSeconds(to, startTime);

    setDuration({
      days,
      // We only want to show the hours, minutes, and seconds that are left after the previous unit
      // ex. total hours includes the # of hours captured in days
      hours: totalHours - days * 24,
      minutes: totalMinutes - totalHours * 60,
      seconds: totalSeconds - totalMinutes * 60,
    });
  }, [to]);

  useEffect(() => {
    updateDuration();
    const intervalId = setInterval(updateDuration, 1000);

    return () => clearInterval(intervalId);
  }, [to, updateDuration]);

  return duration;
}
