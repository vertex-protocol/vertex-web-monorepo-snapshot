import { TimeInSeconds } from '@vertex-protocol/client';
import { differenceInDays } from 'date-fns';

const VLP_LAUNCH_DATE = new Date(2025, 3, 1); // Month is 0-indexed, so 3 = April

const daysSinceVlpLaunchDate = Math.ceil(
  differenceInDays(new Date(), VLP_LAUNCH_DATE),
);

export const VLP_OVERVIEW_CARD_TIMESPAN_METADATA = {
  '24h': {
    label: '24h',
    durationInSeconds: TimeInSeconds.DAY,
  },
  '7d': {
    label: '7d',
    durationInSeconds: 7 * TimeInSeconds.DAY,
  },
  '30d': {
    label: '30d',
    durationInSeconds: 30 * TimeInSeconds.DAY,
  },
  all_time: {
    label: 'All',
    durationInSeconds: daysSinceVlpLaunchDate * TimeInSeconds.DAY,
  },
} as const;

export type VlpOverviewCardTimespan =
  keyof typeof VLP_OVERVIEW_CARD_TIMESPAN_METADATA;
