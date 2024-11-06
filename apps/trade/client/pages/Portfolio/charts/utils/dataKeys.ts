import { PortfolioChartDataItem } from 'client/pages/Portfolio/charts/types';

export function timestampDataKey(data: PortfolioChartDataItem) {
  return data.timestampMillis;
}
