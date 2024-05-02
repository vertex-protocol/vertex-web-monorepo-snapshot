import { useQuery } from '@tanstack/react-query';
import { nowInSeconds, TimeInSeconds } from '@vertex-protocol/utils';

function alertUpcomingMaintenanceWindowQueryKey() {
  return ['alertUpcomingMaintenanceWindow'];
}

const ONE_WEEK = TimeInSeconds.DAY * 7;
const MON_MAINT_REF_TIME = 1683597600; // Monday, May 8, 10pm Eastern in seconds
const THU_MAINT_REF_TIME = 1683856800; // Thursday, May 11, 10pm Eastern in seconds

// The expression; ONE_WEEK - (NOW - MAINT_WINDOW_REF_TIME) % ONE_WEEK < ONE_DAY
// checks if the difference between maintenance reference time (MAINT_WINDOW_REF_TIME)
// and the current time (NOW), modulo one week, is less than the duration of one day (ONE_DAY).
export function useAlertUpcomingMaintenanceWindow(): boolean {
  const { data } = useQuery({
    queryKey: alertUpcomingMaintenanceWindowQueryKey(),
    queryFn: async () => {
      const refTimes: number[] = [MON_MAINT_REF_TIME, THU_MAINT_REF_TIME];
      const now = nowInSeconds();

      return refTimes.some((refTime) => {
        // Checking if time to the next maintenance window is less than 24 hours
        const timeToNextMaintWindow = ONE_WEEK - ((now - refTime) % ONE_WEEK);
        return timeToNextMaintWindow < TimeInSeconds.DAY;
      });
    },
  });
  return data ?? false;
}
