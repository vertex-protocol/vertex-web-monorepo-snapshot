import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { largeCurrencyNumberAbbreviatedAxisFormatter } from 'client/components/charts/axisFormatters';
import { ChainEnvBreakdownStatsChart } from 'client/components/charts/ChainEnvBreakdownStatsChart/ChainEnvBreakdownStatsChart';
import { StatsChartWithOverviewSection } from 'client/components/StatsChartWithOverviewSection';
import { StatsValueWithLabel } from 'client/components/StatsValueWithLabel';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useEdgeVolumeOverviewData } from 'client/pages/MainPage/components/common/VolumeByChainEnvChartSection/useEdgeVolumeOverviewData';
import { useVolumeByChainEnvChartData } from 'client/pages/MainPage/components/common/VolumeByChainEnvChartSection/useVolumeByChainEnvChartData';

export function VolumeByChainEnvChartSection() {
  const { data: edgeVolumeOverviewData } = useEdgeVolumeOverviewData();
  const {
    data: volumeByChainEnvChartData,
    isLoading: isLoadingVolumeByChainEnvChartData,
  } = useVolumeByChainEnvChartData();
  const { xAxisTickFormatter, granularityLabel } = useChartTimeframe();
  const volumeFormatSpecifier =
    CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED;

  return (
    <StatsChartWithOverviewSection
      overviewContent={
        <>
          <StatsValueWithLabel
            label="24h Volume"
            value={edgeVolumeOverviewData?.edgeTotalVolume24hUsd}
            formatSpecifier={volumeFormatSpecifier}
          />
          <StatsValueWithLabel
            label="All Time Volume"
            value={edgeVolumeOverviewData?.edgeTotalVolumeAllTimeUsd}
            formatSpecifier={volumeFormatSpecifier}
          />
        </>
      }
    >
      <ChainEnvBreakdownStatsChart
        chartTitle="Trading Volume per Chain"
        chartDescription={`The ${granularityLabel} trading volume across chains and the cumulative volume on Edge.`}
        data={volumeByChainEnvChartData?.volumesUsd}
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeCurrencyNumberAbbreviatedAxisFormatter,
        }}
        isLoading={isLoadingVolumeByChainEnvChartData}
        chartType="bar"
      />
    </StatsChartWithOverviewSection>
  );
}
