import { EDGE_COLORS } from '@vertex-protocol/web-ui';
import { largeCurrencyNumberAbbreviatedAxisFormatter } from 'client/components/charts/axisFormatters';
import { StatsChart } from 'client/components/charts/StatsChart/StatsChart';
import { StatsSection } from 'client/components/StatsSection';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useEdgeFlowsChartData } from 'client/pages/MainPage/components/TvlAndYieldTabContent/TvlAndFlowsSection/useEdgeFlowsChartData';
import { startCase } from 'lodash';

export function EdgeFlowsChartSection() {
  const { data: edgeFlowsChartData, isLoading: isLoadingEdgeFlowsChartData } =
    useEdgeFlowsChartData();
  const { xAxisTickFormatter, granularityLabel } = useChartTimeframe();

  const granularityLabelStartCased = startCase(granularityLabel);

  return (
    <StatsSection>
      <StatsChart
        chartTitle={`${granularityLabelStartCased} Flows`}
        chartDescription={`The ${granularityLabel} deposits, withdrawals and net flows on Edge, calculated using the average oracle price between two adjacent data points.`}
        data={edgeFlowsChartData?.flowsUsd}
        barChartStackOffset="sign"
        configByDataKey={{
          depositsUsd: {
            color: EDGE_COLORS['chart-fill'].positive,
            dataKey: 'depositsUsd',
            label: 'Deposits',
            chartType: 'bar',
            yAxisId: 'left',
          },
          withdrawalsUsd: {
            color: EDGE_COLORS['chart-fill'].negative,
            dataKey: 'withdrawalsUsd',
            label: 'Withdrawals',
            chartType: 'bar',
            yAxisId: 'left',
          },
          netFlowsUsd: {
            color: EDGE_COLORS['chart-fill'].DEFAULT,
            dataKey: 'netFlowsUsd',
            label: 'Net Flows',
            chartType: 'line',
            yAxisId: 'right',
          },
        }}
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeCurrencyNumberAbbreviatedAxisFormatter,
        }}
        shouldShowRightYAxis
        isLoading={isLoadingEdgeFlowsChartData}
      />
    </StatsSection>
  );
}
