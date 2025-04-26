import { TimeInSeconds } from '@vertex-protocol/client';
import { HistoricalInterestRateChartTimespan } from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/HistoricalInterestRateChart/types';
import { useMemo } from 'react';

export function useHistoricalInterestRateChartQueryParams(
  timespan: HistoricalInterestRateChartTimespan,
) {
  return useMemo(() => {
    switch (timespan) {
      case '24h':
        return {
          granularity: TimeInSeconds.HOUR,
          limit: 24,
        };
      case '7d':
        return {
          granularity: 12 * TimeInSeconds.HOUR,
          limit: 14,
        };
      case '30d':
        return {
          granularity: TimeInSeconds.DAY,
          limit: 30,
        };
    }
  }, [timespan]);
}
