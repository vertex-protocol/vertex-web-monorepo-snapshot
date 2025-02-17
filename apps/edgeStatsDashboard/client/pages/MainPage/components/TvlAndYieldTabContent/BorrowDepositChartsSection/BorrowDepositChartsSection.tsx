import { largeCurrencyNumberAbbreviatedAxisFormatter } from 'client/components/charts/axisFormatters';
import { ChainEnvBreakdownStatsChart } from 'client/components/charts/ChainEnvBreakdownStatsChart/ChainEnvBreakdownStatsChart';
import { StatsSection } from 'client/components/StatsSection';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useBorrowsByChainEnvChartData } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositChartsSection/useBorrowsByChainEnvChartData';
import { useDepositsByChainEnvChartData } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositChartsSection/useDepositsByChainEnvChartData';

export function BorrowDepositChartsSection() {
  const {
    data: depositsByChainEnvChartData,
    isLoading: isLoadingDepositsByChainEnvChartData,
  } = useDepositsByChainEnvChartData();
  const {
    data: borrowsByChainEnvChartData,
    isLoading: isLoadingBorrowsByChainEnvChartData,
  } = useBorrowsByChainEnvChartData();
  const { xAxisTickFormatter, granularityLabel } = useChartTimeframe();

  return (
    <StatsSection className="sm:grid-cols-2">
      <ChainEnvBreakdownStatsChart
        chartTitle="Deposits per Chain"
        chartDescription={`The ${granularityLabel} total deposits across chains on Edge.`}
        data={depositsByChainEnvChartData?.depositsUsd}
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeCurrencyNumberAbbreviatedAxisFormatter,
        }}
        isLoading={isLoadingDepositsByChainEnvChartData}
        chartType="area"
        hideEdgeCumulativeYAxis
      />
      <ChainEnvBreakdownStatsChart
        chartTitle="Borrows per Chain"
        chartDescription={`The ${granularityLabel} total borrows across chains on Edge.`}
        data={borrowsByChainEnvChartData?.borrowsUsd}
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeCurrencyNumberAbbreviatedAxisFormatter,
        }}
        isLoading={isLoadingBorrowsByChainEnvChartData}
        chartType="area"
        hideEdgeCumulativeYAxis
      />
    </StatsSection>
  );
}
