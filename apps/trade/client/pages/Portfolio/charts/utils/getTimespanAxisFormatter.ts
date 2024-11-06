import { ChartTimespan } from 'client/pages/Portfolio/charts/types';
import {
  dateAxisFormatter,
  dateWithDayAxisFormatter,
  timeAxisFormatter,
} from 'client/pages/Portfolio/charts/utils/axisFormatters';

/**
 * @param timespan
 */
export function getTimespanAxisFormatter(timespan: ChartTimespan) {
  if (timespan === '1m' || timespan === 'all_time') {
    return dateAxisFormatter;
  }
  if (timespan === '7d') {
    return dateWithDayAxisFormatter;
  }
  return timeAxisFormatter;
}
