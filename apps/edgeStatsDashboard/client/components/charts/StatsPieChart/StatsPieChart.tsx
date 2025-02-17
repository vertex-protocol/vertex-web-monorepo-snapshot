import { NumberFormatSpecifier } from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { StatsPieChartLegend } from 'client/components/charts/StatsPieChart/StatsPieChartLegend';
import { StatsPieChartTooltip } from 'client/components/charts/StatsPieChart/StatsPieChartTooltip';
import { StatsPieChartDataItem } from 'client/components/charts/StatsPieChart/types';
import { getDefaultChartFillColor } from 'client/components/charts/utils/getDefaultChartFillColor';
import { StatsDataCard } from 'client/components/StatsDataCard';
import { sortBy } from 'lodash';
import { ReactNode, useMemo } from 'react';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip as ReChartsTooltip,
  Legend,
} from 'recharts';

interface Props extends WithClassnames {
  chartTitle: string;
  chartDescription: string;
  data: StatsPieChartDataItem[] | undefined;
  isLoading: boolean;
  formatSpecifier: NumberFormatSpecifier;
  centerContent?: ReactNode;
  showLegend?: boolean;
}

export function StatsPieChart({
  className,
  chartTitle,
  chartDescription,
  data,
  formatSpecifier,
  isLoading,
  centerContent,
  showLegend,
}: Props) {
  // Sort data in descending order based on the 'value' property.
  const descendingSortedData = useMemo(
    () => sortBy(data, ({ value }) => -(value ?? 0)),
    [data],
  );

  return (
    <StatsDataCard
      className={className}
      contentClassName="relative"
      title={chartTitle}
      description={chartDescription}
      isLoading={isLoading}
      data={descendingSortedData}
    >
      <div
        className={joinClassNames(
          'absolute inset-0',
          'flex flex-col items-center justify-center',
          // Add margin to align it to center when we have a legend on desktop.
          showLegend && 'lg:mr-40',
        )}
      >
        {centerContent}
      </div>
      <ResponsiveContainer>
        <PieChart>
          <Pie
            // Outline is on by default so we remove it from PieChart.
            className="outline-none"
            data={descendingSortedData}
            innerRadius={80}
            outerRadius={100}
            fill="transparent"
            dataKey={({ value }: StatsPieChartDataItem) => value}
          >
            {descendingSortedData?.map(({ name }, index) => {
              const fillColor = getDefaultChartFillColor(
                undefined,
                index,
                descendingSortedData.length,
              );

              return (
                <Cell
                  key={name}
                  // Reduce opacity so it doesn't "pop" too much compared to other charts.
                  opacity={0.9}
                  fill={fillColor}
                />
              );
            })}
          </Pie>
          <ReChartsTooltip
            content={({ payload, active }) => (
              <StatsPieChartTooltip
                formatSpecifier={formatSpecifier}
                payload={payload}
                active={active}
              />
            )}
          />
          {showLegend && (
            <Legend
              content={({ payload }) => (
                <StatsPieChartLegend
                  // Only show legend on desktop
                  // Add width so centerContent is aligned to center when legend is present.
                  className="hidden w-40 lg:flex"
                  payload={payload}
                />
              )}
              layout="vertical"
              verticalAlign="middle"
              align="right"
              wrapperStyle={{
                height: '80%',
                overflow: 'auto',
              }}
            />
          )}
        </PieChart>
      </ResponsiveContainer>
    </StatsDataCard>
  );
}
