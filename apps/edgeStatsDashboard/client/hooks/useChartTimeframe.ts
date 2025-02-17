import { TimeInSeconds } from '@vertex-protocol/client';
import { SelectOption } from '@vertex-protocol/web-ui';
import {
  dateWithDayAxisFormatter,
  monthlyAxisFormatter,
} from 'client/components/charts/axisFormatters';
import { differenceInMonths } from 'date-fns';
import { atom, useAtom } from 'jotai';
import { useMemo } from 'react';

type ChartTimeframeID =
  | 'past_30_days'
  | 'past_60_days'
  | 'past_90_days'
  | 'all_time';

const TIMEFRAME_OPTIONS: SelectOption<ChartTimeframeID>[] = [
  {
    label: 'Past 30 Days',
    value: 'past_30_days',
  },
  {
    label: 'Past 60 Days',
    value: 'past_60_days',
  },
  {
    label: 'Past 90 Days',
    value: 'past_90_days',
  },
  {
    label: 'All Time',
    value: 'all_time',
  },
];

const VERTEX_LAUNCH_DATE = new Date(2023, 2, 1); // Month is 0-indexed, so 2 = March

interface ChartTimeframeDetails {
  granularity: number;
  queryLimit: number;
  granularityLabel: string;
  xAxisTickFormatter: ((value: number) => string) | undefined;
}

const chartTimeframeAtom = atom(TIMEFRAME_OPTIONS[0].value);

export function useChartTimeframe() {
  const [timeframe, setTimeframe] =
    useAtom<ChartTimeframeID>(chartTimeframeAtom);

  const timeframeDetailsByTimeframe = useMemo(() => {
    const monthsSinceVertexLaunchDate = Math.ceil(
      differenceInMonths(new Date(), VERTEX_LAUNCH_DATE),
    );

    // Add one more day / month to query limit so we can calculate deltas if we need to.
    const baseLimit = 1;

    return {
      past_30_days: {
        granularity: TimeInSeconds.DAY,
        queryLimit: 30 + baseLimit,
        granularityLabel: 'daily',
        xAxisTickFormatter: dateWithDayAxisFormatter,
      },
      past_60_days: {
        granularity: TimeInSeconds.DAY,
        queryLimit: 60 + baseLimit,
        granularityLabel: 'daily',
        xAxisTickFormatter: dateWithDayAxisFormatter,
      },
      past_90_days: {
        granularity: TimeInSeconds.DAY,
        queryLimit: 90 + baseLimit,
        granularityLabel: 'daily',
        xAxisTickFormatter: dateWithDayAxisFormatter,
      },
      all_time: {
        granularity: 30 * TimeInSeconds.DAY,
        queryLimit: monthsSinceVertexLaunchDate + baseLimit,
        granularityLabel: 'monthly',
        xAxisTickFormatter: monthlyAxisFormatter,
      },
    } satisfies Record<ChartTimeframeID, ChartTimeframeDetails>;
  }, []);

  return {
    ...timeframeDetailsByTimeframe[timeframe],
    timeframe,
    setTimeframe,
    timeframeOptions: TIMEFRAME_OPTIONS,
  };
}
