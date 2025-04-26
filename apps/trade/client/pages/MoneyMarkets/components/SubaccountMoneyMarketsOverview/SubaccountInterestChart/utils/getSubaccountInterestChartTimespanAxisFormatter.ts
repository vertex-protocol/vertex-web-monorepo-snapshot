import {
  dateAxisFormatter,
  dateWithDayAxisFormatter,
  timeAxisFormatter,
} from 'client/modules/charts/utils/axisFormatters';
import { SubaccountInterestChartTimespan } from 'client/pages/MoneyMarkets/components/SubaccountMoneyMarketsOverview/SubaccountInterestChart/types';

/**
 * @param timespan
 */
export function getSubaccountInterestChartTimespanAxisFormatter(
  timespan: SubaccountInterestChartTimespan,
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
