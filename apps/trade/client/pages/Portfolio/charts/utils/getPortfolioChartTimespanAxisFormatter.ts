import {
  dateAxisFormatter,
  dateWithDayAxisFormatter,
  timeAxisFormatter,
} from 'client/modules/charts/utils/axisFormatters';
import { PortfolioChartTimespan } from 'client/pages/Portfolio/charts/types';

/**
 * @param timespan
 */
export function getPortfolioChartTimespanAxisFormatter(
  timespan: PortfolioChartTimespan,
) {
  switch (timespan) {
    case '30d':
    case 'all_time':
      return dateAxisFormatter;
    case '7d':
      return dateWithDayAxisFormatter;
    case '24h':
      return timeAxisFormatter;
  }
}
