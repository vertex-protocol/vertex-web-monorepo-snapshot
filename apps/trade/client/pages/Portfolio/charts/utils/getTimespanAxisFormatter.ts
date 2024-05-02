import { ChartTimespan } from '../types';
import {
  dateAxisFormatter,
  dateWithDayAxisFormatter,
  timeAxisFormatter,
} from './axisFormatters';

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
