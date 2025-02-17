import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { StatsPieChart } from 'client/components/charts/StatsPieChart/StatsPieChart';
import { StatsPieChartCenterMetric } from 'client/components/charts/StatsPieChart/StatsPieChartCenterMetric';
import { StatsSection } from 'client/components/StatsSection';
import { useEdgeVolumePieChartsSectionData } from 'client/pages/MainPage/components/VolumesTabContent/EdgeVolumePieChartsSection/useEdgeVolumePieChartsSectionData';

export function EdgeVolumePieChartsSection() {
  const { data, isLoading } = useEdgeVolumePieChartsSectionData();

  const volumeFormatSpecifier =
    CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED;

  return (
    <StatsSection className="sm:grid-cols-2">
      <StatsPieChart
        chartTitle="24h Volume by Market"
        chartDescription="Breakdown of Edge volume across different markets in past 24h."
        isLoading={isLoading}
        centerContent={
          <StatsPieChartCenterMetric
            label="24h Vol."
            value={data?.edgeTotalVolume24hUsd}
            valueFormatSpecifier={volumeFormatSpecifier}
          />
        }
        data={data?.edgeVolumes24hByMarketUsd}
        formatSpecifier={volumeFormatSpecifier}
        showLegend
      />
      <StatsPieChart
        chartTitle="7d Volume by Market"
        chartDescription="Breakdown of Edge volume across different markets in the past 7 days."
        centerContent={
          <StatsPieChartCenterMetric
            label="7d Vol."
            value={data?.edgeTotalVolume7dUsd}
            valueFormatSpecifier={volumeFormatSpecifier}
          />
        }
        isLoading={isLoading}
        data={data?.edgeVolumes7dByMarketUsd}
        formatSpecifier={volumeFormatSpecifier}
        showLegend
      />
      <StatsPieChart
        chartTitle="30d Volume by Market"
        chartDescription="Breakdown of Edge volume across different markets in the past 30 days."
        centerContent={
          <StatsPieChartCenterMetric
            label="30d Vol."
            value={data?.edgeTotalVolume30dUsd}
            valueFormatSpecifier={volumeFormatSpecifier}
          />
        }
        isLoading={isLoading}
        data={data?.edgeVolumes30dByMarketUsd}
        formatSpecifier={volumeFormatSpecifier}
        showLegend
      />
      <StatsPieChart
        chartTitle="All Time Volume by Market"
        chartDescription="Breakdown of Edge cumulative volume across different markets."
        centerContent={
          <StatsPieChartCenterMetric
            label="All Time Vol."
            value={data?.edgeTotalVolumeAllTimeUsd}
            valueFormatSpecifier={volumeFormatSpecifier}
          />
        }
        isLoading={isLoading}
        data={data?.edgeVolumesAllTimeByMarketUsd}
        formatSpecifier={volumeFormatSpecifier}
        showLegend
      />
    </StatsSection>
  );
}
