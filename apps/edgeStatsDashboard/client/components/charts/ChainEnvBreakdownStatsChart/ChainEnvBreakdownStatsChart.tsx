import { WithClassnames } from '@vertex-protocol/web-common';
import { EDGE_COLORS } from '@vertex-protocol/web-ui';
import {
  ChainEnvBreakdownStatsChartConfigByDataKey,
  ChainEnvBreakdownStatsChartDataItem,
} from 'client/components/charts/ChainEnvBreakdownStatsChart/types';
import { StatsChart } from 'client/components/charts/StatsChart/StatsChart';
import { LabelWithEdgeLogo } from 'client/components/LabelWithEdgeLogo';
import { useMemo } from 'react';
import { XAxisProps, YAxisProps } from 'recharts';

interface Props extends WithClassnames {
  chartTitle: string;
  chartDescription: string;
  data: ChainEnvBreakdownStatsChartDataItem[] | undefined;
  xAxisProps: Omit<XAxisProps, 'ref'>;
  yAxisProps: Omit<YAxisProps, 'ref'>;
  isLoading: boolean;
  chartType: 'bar' | 'area';
  /** If we don't have data for `edgeCumulative` in data. Set to `true` to hide right y axis. */
  hideEdgeCumulativeYAxis?: boolean;
}

/**
 * Renders a chart that breaks down values across different chain environments (chainEnvs) and Edge.
 *
 * - In bar chart, a cumulative line for Edge (`edgeCumulative`) is included.
 * - Other values are displayed as bars or areas, depending on the chart type.
 * - "Edge Total" is only shown in the tooltip for bar chart, but it is displayed as a line in area chart.
 */
export function ChainEnvBreakdownStatsChart({
  chartTitle,
  chartDescription,
  data,
  xAxisProps,
  yAxisProps,
  isLoading,
  className,
  chartType,
  hideEdgeCumulativeYAxis,
}: Props) {
  const configByDataKey: ChainEnvBreakdownStatsChartConfigByDataKey =
    useMemo(() => {
      const isBar = chartType === 'bar';

      return {
        local: {
          label: 'Local',
          dataKey: 'local',
          chartType,
          yAxisId: 'left',
        },
        arbitrum: {
          label: 'Arbitrum',
          dataKey: 'arbitrum',
          chartType,
          yAxisId: 'left',
        },
        arbitrumTestnet: {
          label: 'Arbitrum Testnet',
          dataKey: 'arbitrumTestnet',
          chartType,
          yAxisId: 'left',
        },
        blast: {
          label: 'Blast',
          dataKey: 'blast',
          chartType,
          yAxisId: 'left',
        },
        blastTestnet: {
          label: 'Blast Testnet',
          dataKey: 'blastTestnet',
          chartType,
          yAxisId: 'left',
        },
        mantle: {
          label: 'Mantle',
          dataKey: 'mantle',
          chartType,
          yAxisId: 'left',
        },
        mantleTestnet: {
          label: 'Mantle Testnet',
          dataKey: 'mantleTestnet',
          chartType,
          yAxisId: 'left',
        },
        sei: {
          label: 'Sei',
          dataKey: 'sei',
          chartType,
          yAxisId: 'left',
        },
        seiTestnet: {
          label: 'Sei Testnet',
          dataKey: 'seiTestnet',
          chartType,
          yAxisId: 'left',
        },
        base: {
          label: 'Base',
          dataKey: 'base',
          chartType,
          yAxisId: 'left',
        },
        baseTestnet: {
          label: 'Base Testnet',
          dataKey: 'baseTestnet',
          chartType,
          yAxisId: 'left',
        },
        sonicTestnet: {
          label: 'Sonic Testnet',
          dataKey: 'sonicTestnet',
          chartType,
          yAxisId: 'left',
        },
        sonic: {
          label: 'Sonic',
          dataKey: 'sonic',
          chartType,
          yAxisId: 'left',
        },
        beraTestnet: {
          label: 'Berachain Testnet',
          dataKey: 'beraTestnet',
          chartType,
          yAxisId: 'left',
        },
        abstractTestnet: {
          label: 'Abstract Testnet',
          dataKey: 'abstractTestnet',
          chartType,
          yAxisId: 'left',
        },
        abstract: {
          label: 'Abstract',
          dataKey: 'abstract',
          chartType,
          yAxisId: 'left',
        },
        edge: {
          // No color for bar chart since it doesn't appear on the chart.
          color: isBar ? null : EDGE_COLORS['chart-fill'].DEFAULT,
          label: <LabelWithEdgeLogo label="Total" />,
          dataKey: 'edge',
          chartType: 'line',
          // Add a top divider in the tooltip when not a bar chart, as it's always the last item.
          hasTooltipTopDivider: !isBar,
          yAxisId: 'left',
          // Only displayed in the tooltip when the chart type is bar.
          showOnTooltipOnly: isBar,
        },
        // Edge cumulative shows only on bar chart.
        edgeCumulative: {
          color: EDGE_COLORS['chart-fill'].DEFAULT,
          hasTooltipTopDivider: true,
          label: <LabelWithEdgeLogo label="Cumulative" />,
          dataKey: 'edgeCumulative',
          chartType: 'line',
          yAxisId: 'right',
        },
      };
    }, [chartType]);

  return (
    <StatsChart
      className={className}
      chartTitle={chartTitle}
      chartDescription={chartDescription}
      isLoading={isLoading}
      data={data}
      configByDataKey={configByDataKey}
      xAxisProps={xAxisProps}
      yAxisProps={yAxisProps}
      shouldShowRightYAxis={!hideEdgeCumulativeYAxis}
    />
  );
}
