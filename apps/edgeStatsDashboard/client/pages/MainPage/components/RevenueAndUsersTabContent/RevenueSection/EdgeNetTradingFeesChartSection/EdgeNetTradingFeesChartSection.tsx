import { EDGE_COLORS } from '@vertex-protocol/web-ui';
import { largeCurrencyNumberAbbreviatedAxisFormatter } from 'client/components/charts/axisFormatters';
import { StatsChart } from 'client/components/charts/StatsChart/StatsChart';
import { StatsSection } from 'client/components/StatsSection';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useEdgeNetTradingFeesChartSectionData } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/EdgeNetTradingFeesChartSection/useEdgeNetTradingFeesChartSectionData';

export function EdgeNetTradingFeesChartSection() {
  const { xAxisTickFormatter, granularityLabel } = useChartTimeframe();
  const { data, isLoading } = useEdgeNetTradingFeesChartSectionData();

  return (
    <StatsSection>
      <StatsChart
        chartTitle="Net Trading Fees"
        chartDescription={`The ${granularityLabel} total trading fees minus maker rebates. Excludes liquidation and sequencer fees.`}
        data={data?.netTradingFeesUsd}
        configByDataKey={{
          takerTradingFeesUsd: {
            dataKey: 'takerTradingFeesUsd',
            label: `Total Trading Fees`,
            chartType: 'area',
            yAxisId: 'left',
            stackId: null,
          },
          makerTradingFeesUsd: {
            dataKey: 'makerTradingFeesUsd',
            label: `Total Maker Rebates`,
            chartType: 'area',
            yAxisId: 'left',
            stackId: null,
          },
          netTradingFeesUsd: {
            color: EDGE_COLORS['chart-fill'].DEFAULT,
            dataKey: 'netTradingFeesUsd',
            label: `Netted Fees`,
            chartType: 'line',
            yAxisId: 'left',
            stackId: null,
          },
        }}
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeCurrencyNumberAbbreviatedAxisFormatter,
        }}
        isLoading={isLoading}
      />
    </StatsSection>
  );
}
