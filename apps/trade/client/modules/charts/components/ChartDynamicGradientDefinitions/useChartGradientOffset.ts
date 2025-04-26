import { clamp, maxBy, minBy } from 'lodash';
import { useMemo } from 'react';

export type ChartDataItemKey<ChartDataItem> = {
  // Iterates over the keys of ChartDataItem and checks if the value type is a number or undefined.
  // If true, it keeps the key; otherwise, it assigns `never`, effectively filtering out non-numeric keys.
  [K in keyof ChartDataItem]: ChartDataItem[K] extends number | undefined
    ? K
    : never;
}[keyof ChartDataItem]; // Extracts only the numeric keys from TChartDataItem.

export interface ChartGradientOffsetParams<TChartDataItem> {
  valueKey: ChartDataItemKey<TChartDataItem>;
  data: TChartDataItem[] | undefined;
}

/**
 * The offset is a fractional value with 0 representing the max value of the y-axis,
 * and 1 as the min value of the y-axis on the chart.
 * This hook is used to create a linear gradient with stops in the middle
 * that are offset at the 0 value.
 * @returns The fractional offset of the y-axis zero value from the top of the chart, with 0 being the top of the chart and 1 being the bottom
 */
export function useChartGradientOffset<
  TChartDataItem extends Record<
    ChartDataItemKey<TChartDataItem>,
    number | undefined
  >,
>({ valueKey, data }: ChartGradientOffsetParams<TChartDataItem>) {
  return useMemo(() => {
    if (!data) {
      return 1;
    }
    const max = maxBy(data, valueKey)?.[valueKey];
    const min = minBy(data, valueKey)?.[valueKey];

    if (!max || !min) {
      return 1;
    }

    if (max === min) {
      return max < 0 ? 0 : 1;
    }

    return clamp(max / (max - min), 0, 1);
  }, [data, valueKey]);
}
