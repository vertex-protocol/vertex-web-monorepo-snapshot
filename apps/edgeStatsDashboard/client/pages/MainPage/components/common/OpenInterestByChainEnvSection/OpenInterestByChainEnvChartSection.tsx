import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { largeCurrencyNumberAbbreviatedAxisFormatter } from 'client/components/charts/axisFormatters';
import { ChainEnvBreakdownStatsChart } from 'client/components/charts/ChainEnvBreakdownStatsChart/ChainEnvBreakdownStatsChart';
import { StatsChartWithOverviewSection } from 'client/components/StatsChartWithOverviewSection';
import { StatsValueWithLabel } from 'client/components/StatsValueWithLabel';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useEdgeOpenInterestOverviewData } from 'client/pages/MainPage/components/common/OpenInterestByChainEnvSection/useEdgeOpenInterestOverviewData';
import { useOpenInterestByChainEnvChartData } from 'client/pages/MainPage/components/common/OpenInterestByChainEnvSection/useOpenInterestByChainEnvChartData';

export function OpenInterestByChainEnvChartSection() {
  const { data: edgeOpenInterestOverviewData } =
    useEdgeOpenInterestOverviewData();

  const { xAxisTickFormatter } = useChartTimeframe();
  const {
    data: openInterestByChainEnvChartData,
    isLoading: isLoadingOpenInterestByChainEnvChartData,
  } = useOpenInterestByChainEnvChartData();

  const formatSpecifier =
    CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED;

  return (
    <StatsChartWithOverviewSection
      overviewContent={
        <StatsValueWithLabel
          label="Open Interest"
          value={edgeOpenInterestOverviewData?.edgeOpenInterestQuoteAtNowUsd}
          formatSpecifier={formatSpecifier}
        />
      }
    >
      <ChainEnvBreakdownStatsChart
        chartTitle="Open Interest per Chain"
        chartDescription="The open interest across chains on Edge."
        data={openInterestByChainEnvChartData?.openInterests}
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeCurrencyNumberAbbreviatedAxisFormatter,
        }}
        isLoading={isLoadingOpenInterestByChainEnvChartData}
        hideEdgeCumulativeYAxis
        chartType="area"
      />
    </StatsChartWithOverviewSection>
  );
}
