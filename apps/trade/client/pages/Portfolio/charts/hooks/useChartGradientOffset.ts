import { clamp, maxBy, minBy } from 'lodash';
import { useMemo } from 'react';
import { PortfolioChartDataItem } from './usePortfolioChartData/usePortfolioChartData';

export interface ChartGradientOffsetParams {
  valueKey: keyof Omit<PortfolioChartDataItem, 'deltas' | 'timestamp'>;
  data?: PortfolioChartDataItem[];
}

/**
 * The offset is a fractional value with 0 representing the max value of the y-axis,
 * and 1 as the min value of the y-axis on the chart.
 * This hook is used to create a linear gradient with stops in the middle
 * that are offset at the 0 value.
 * @returns The fractional offset of the y-axis zero value from the top of the chart, with 0 being the top of the chart and 1 being the bottom
 */
export function useChartGradientOffset({
  valueKey,
  data,
}: ChartGradientOffsetParams) {
  return useMemo(() => {
    if (!data) {
      return 1;
    }
    const max = maxBy(data, valueKey)?.[valueKey];
    const min = minBy(data, valueKey)?.[valueKey];

    if (!max || !min || max === min) {
      return 1;
    }

    return clamp(max / (max - min), 0, 1);
  }, [data, valueKey]);
}
