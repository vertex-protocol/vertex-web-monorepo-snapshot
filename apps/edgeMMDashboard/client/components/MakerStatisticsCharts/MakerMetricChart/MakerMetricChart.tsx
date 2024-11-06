import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Card, Icons, LabelTooltip, Spinner } from '@vertex-protocol/web-ui';
import {
  AREA_CHART_DEFAULTS,
  CHART_DOT_DEFAULTS,
  CHART_GRID_DEFAULTS,
  CHART_TOOLTIP_DEFAULTS,
  CHART_XAXIS_DEFAULTS,
  CHART_YAXIS_DEFAULTS,
  LINE_CHART_DEFAULTS,
} from 'client/components/MakerStatisticsCharts/MakerMetricChart/config';
import { MakerMetricChartLegend } from 'client/components/MakerStatisticsCharts/MakerMetricChart/MakerMetricChartLegend';
import { MakerMetricChartTooltip } from 'client/components/MakerStatisticsCharts/MakerMetricChart/MakerMetricChartTooltip';
import { MakerMetricChartDataItem } from 'client/components/MakerStatisticsCharts/MakerMetricChart/types';
import { getHexColorForAddress } from 'client/components/MakerStatisticsCharts/MakerMetricChart/utils';
import { useState } from 'react';
import {
  CartesianGrid,
  ResponsiveContainer,
  Tooltip as ReChartsTooltip,
  XAxis,
  YAxis,
  Line,
  LineChart,
  XAxisProps,
  YAxisProps,
  Legend,
  AreaChart,
  Area,
} from 'recharts';

interface Props extends WithClassnames {
  chartTitle: string;
  data: MakerMetricChartDataItem[] | undefined;
  addresses: string[] | undefined;
  xAxisProps: Omit<XAxisProps, 'ref'>;
  yAxisProps: Omit<YAxisProps, 'ref'>;
  chartInfoTooltipLabel: string;
  chartType: 'line' | 'area';
  isLoading: boolean;
}

export function MakerMetricChart({
  chartTitle,
  data,
  xAxisProps,
  yAxisProps,
  chartInfoTooltipLabel,
  chartType,
  addresses,
  isLoading,
  className,
}: Props) {
  // Hidden addresses will not be displayed on the chart, and are toggled by the legend
  const [hiddenAddresses, setHiddenAddresses] = useState<
    Record<string, boolean>
  >({});

  const chartContent = (() => {
    // Show loading spinner if loading
    if (isLoading) {
      return (
        <div className="flex flex-1 items-center justify-center">
          <Spinner />
        </div>
      );
    }

    // Show message if there is no data available
    if (data?.length === 0) {
      return (
        <div className="text-text-tertiary flex flex-1 items-center justify-center">
          No data available
        </div>
      );
    }

    const Chart = chartType === 'line' ? LineChart : AreaChart;

    return (
      <ResponsiveContainer className="flex-1">
        <Chart data={data}>
          <CartesianGrid {...CHART_GRID_DEFAULTS} />
          <ReChartsTooltip
            {...CHART_TOOLTIP_DEFAULTS}
            // This fixes issue where other chart lines are drawn over the tooltip
            // See: https://github.com/recharts/recharts/issues/302
            wrapperStyle={{ zIndex: 1000 }}
            content={(data) => (
              <MakerMetricChartTooltip
                labelFormatter={yAxisProps.tickFormatter}
                payload={data.payload}
                active={data.active}
                hiddenAddresses={hiddenAddresses}
              />
            )}
          />
          <XAxis {...CHART_XAXIS_DEFAULTS} {...xAxisProps} />
          <YAxis {...CHART_YAXIS_DEFAULTS} {...yAxisProps} />
          {addresses?.map((address) => {
            const color = getHexColorForAddress(address);

            const commonChartProps = {
              dataKey: address,
              stroke: color,
              fill: color,
              activeDot: {
                ...CHART_DOT_DEFAULTS,
              },
              hide: hiddenAddresses?.[address] ?? false,
            };

            return chartType === 'area' ? (
              <Area
                key={address}
                {...AREA_CHART_DEFAULTS}
                {...commonChartProps}
                // Use stackId to stack areas on top of each other
                stackId={1}
              />
            ) : (
              <Line
                key={address}
                {...LINE_CHART_DEFAULTS}
                {...commonChartProps}
              />
            );
          })}
          <Legend
            content={({ payload }) => (
              <MakerMetricChartLegend
                payload={payload}
                setHiddenAddresses={setHiddenAddresses}
              />
            )}
            wrapperStyle={{ overflow: 'auto' }}
          />
        </Chart>
      </ResponsiveContainer>
    );
  })();

  return (
    <Card
      className={joinClassNames(
        'flex flex-col gap-4',
        'p-3 sm:px-6',
        className,
      )}
    >
      <div className="flex justify-between gap-2">
        <div className="text-text-secondary">{chartTitle}</div>
        <LabelTooltip label={chartInfoTooltipLabel}>
          <Icons.Info size={20} className="text-text-tertiary" />
        </LabelTooltip>
      </div>
      {chartContent}
    </Card>
  );
}
