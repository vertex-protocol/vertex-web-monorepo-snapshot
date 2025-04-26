export function timestampDataKey<
  TChartDataItem extends { timestampMillis: number },
>(data: TChartDataItem) {
  return data.timestampMillis;
}
