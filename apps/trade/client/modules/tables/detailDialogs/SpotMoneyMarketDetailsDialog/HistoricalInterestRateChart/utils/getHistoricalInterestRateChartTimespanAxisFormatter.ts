import {
  dateAxisFormatter,
  dateWithDayAxisFormatter,
  timeAxisFormatter,
} from 'client/modules/charts/utils/axisFormatters';
import { HistoricalInterestRateChartTimespan } from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/HistoricalInterestRateChart/types';

/**
 * @param timespan
 */
export function getHistoricalInterestRateChartTimespanAxisFormatter(
  timespan: HistoricalInterestRateChartTimespan,
) {
  switch (timespan) {
    case '30d':
      return dateAxisFormatter;
    case '7d':
      return dateWithDayAxisFormatter;
    case '24h':
      return timeAxisFormatter;
  }
}
