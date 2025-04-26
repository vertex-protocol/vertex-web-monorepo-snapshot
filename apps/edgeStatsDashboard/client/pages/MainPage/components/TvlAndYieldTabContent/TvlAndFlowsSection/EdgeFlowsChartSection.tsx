import { largeCurrencyNumberAbbreviatedAxisFormatter } from 'client/components/charts/axisFormatters';
import { StatsChart } from 'client/components/charts/StatsChart/StatsChart';
import { StatsSection } from 'client/components/StatsSection';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useEdgeFlowsChartData } from 'client/pages/MainPage/components/TvlAndYieldTabContent/TvlAndFlowsSection/useEdgeFlowsChartData';
import { getEdgeStatsColorVar } from 'client/theme/colorVars';
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
            color: getEdgeStatsColorVar('chart-fill-positive'),
            dataKey: 'depositsUsd',
            label: 'Deposits',
            chartType: 'bar',
            yAxisId: 'left',
          },
          withdrawalsUsd: {
            color: getEdgeStatsColorVar('chart-fill-negative'),
            dataKey: 'withdrawalsUsd',
            label: 'Withdrawals',
            chartType: 'bar',
            yAxisId: 'left',
          },
          netFlowsUsd: {
            color: getEdgeStatsColorVar('chart-fill'),
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
