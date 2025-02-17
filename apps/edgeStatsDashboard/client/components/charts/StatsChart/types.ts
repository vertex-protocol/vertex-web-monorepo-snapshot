import { ReactNode } from 'react';

export interface StatsChartDataItem<TDataKey extends string = string> {
  currentTimestampMillis: number;
  earlierTimestampMillis: number;
  data: {
    [dataKey in TDataKey]: number | undefined;
  };
}

export type StatsYAxisID = 'left' | 'right';

export type StatsChartConfigByDataKey<TDataKey extends string = string> =
  Record<
    TDataKey,
    {
      dataKey: TDataKey;
      /**
       * If color is set to `null` it will not render tooltip label dot.
       * If color is set to `undefined` it will auto generate color for label dot and chart.
       * If color is defined it will be applied to label dot and chart.
       */
      color?: string | null;
      label: ReactNode;
      /** If true it would render top divider on tooltip row. This is usually the case for last row. */
      hasTooltipTopDivider?: boolean;
      chartType: 'line' | 'area' | 'bar';
      /** If true it would not render on chart but will still show in tooltip */
      showOnTooltipOnly?: boolean;
      yAxisId: StatsYAxisID;
      /**
       * The `stackId` determines the stacking behavior for areas or bars on the chart.
       * - When `stackId` is `null`, stacking is disabled for the associated areas or bars.
       * - By default, the `stackId` is set to `defaultStack`, which stacks all areas or bars with the same `stackId`.
       */
      stackId?: number | string | null;
    }
  >;
