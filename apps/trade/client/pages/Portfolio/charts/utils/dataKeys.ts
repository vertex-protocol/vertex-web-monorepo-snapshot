import { PortfolioChartDataItem } from '../hooks/usePortfolioChartData/usePortfolioChartData';

export function timestampDataKey(data: PortfolioChartDataItem) {
  return data.timestampMillis;
}
