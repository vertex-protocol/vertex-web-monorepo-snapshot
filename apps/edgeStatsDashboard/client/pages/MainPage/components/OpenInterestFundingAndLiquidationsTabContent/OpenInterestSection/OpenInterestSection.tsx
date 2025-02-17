import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { StatsPieChart } from 'client/components/charts/StatsPieChart/StatsPieChart';
import { StatsChartWithOverviewSection } from 'client/components/StatsChartWithOverviewSection';
import { StatsSection } from 'client/components/StatsSection';
import { StatsValueWithLabel } from 'client/components/StatsValueWithLabel';
import { OpenInterestByChainEnvChartSection } from 'client/pages/MainPage/components/common/OpenInterestByChainEnvSection/OpenInterestByChainEnvChartSection';
import { useEdgeOpenInterestOverviewData } from 'client/pages/MainPage/components/common/OpenInterestByChainEnvSection/useEdgeOpenInterestOverviewData';
import { useEdgeOpenInterestPieChartData } from 'client/pages/MainPage/components/OpenInterestFundingAndLiquidationsTabContent/OpenInterestSection/useEdgeOpenInterestPieChartData';

export function OpenInterestSection() {
  const { data: edgeOpenInterestOverviewData } =
    useEdgeOpenInterestOverviewData();
  const {
    data: edgeOpenInterestPieChartData,
    isLoading: isLoadingEdgeOpenInterestPieChartData,
  } = useEdgeOpenInterestPieChartData();

  return (
    <StatsSection className="sm:grid-cols-2 sm:items-end">
      <OpenInterestByChainEnvChartSection />
      <StatsChartWithOverviewSection
        overviewContent={edgeOpenInterestOverviewData?.topOpenInterestsUsd.map(
          ({ name, value }) => (
            <StatsValueWithLabel
              key={name}
              label={name}
              value={value}
              formatSpecifier={
                CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED
              }
            />
          ),
        )}
      >
        <StatsPieChart
          chartTitle="Open Interest by Market"
          chartDescription="Breakdown of the Edge open interest across individual perp markets."
          isLoading={isLoadingEdgeOpenInterestPieChartData}
          data={edgeOpenInterestPieChartData?.edgeOpenInterestsAtNowByMarketUsd}
          formatSpecifier={
            CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED
          }
          showLegend
        />
      </StatsChartWithOverviewSection>
    </StatsSection>
  );
}
