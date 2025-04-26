export type SubaccountInterestChartTimespan = '24h' | '7d' | '30d' | 'all_time';

export interface SubaccountInterestChartDataItem {
  cumulativeNetSpotInterestUsd: number;
  timestampMillis: number;
}
