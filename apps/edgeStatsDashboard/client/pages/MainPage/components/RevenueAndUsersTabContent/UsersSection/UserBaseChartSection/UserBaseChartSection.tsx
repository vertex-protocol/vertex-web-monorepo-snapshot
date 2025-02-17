import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { largeNumberAbbreviatedAxisFormatter } from 'client/components/charts/axisFormatters';
import { ChainEnvBreakdownStatsChart } from 'client/components/charts/ChainEnvBreakdownStatsChart/ChainEnvBreakdownStatsChart';
import { StatsChartWithOverviewSection } from 'client/components/StatsChartWithOverviewSection';
import { StatsValueWithLabel } from 'client/components/StatsValueWithLabel';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useEdgeUserBaseOverviewData } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/UsersSection/UserBaseChartSection/useEdgeUserBaseOverviewData';
import { useUserBaseByChainEnvChartData } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/UsersSection/UserBaseChartSection/useUserBaseByChainEnvChartData';
import { startCase } from 'lodash';

export function UserBaseChartSection() {
  const { data: edgeUserBaseOverviewData } = useEdgeUserBaseOverviewData();
  const usersFormatSpecifier =
    CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED;

  const { xAxisTickFormatter, granularityLabel } = useChartTimeframe();
  const {
    data: userBaseByChainEnvChartData,
    isLoading: isLoadingUserBaseByChainEnvChartData,
  } = useUserBaseByChainEnvChartData();

  const granularityLabelStartCased = startCase(granularityLabel);

  return (
    <StatsChartWithOverviewSection
      overviewContent={
        <>
          <StatsValueWithLabel
            label="Total Users"
            value={edgeUserBaseOverviewData?.edgeTotalUsers}
            formatSpecifier={usersFormatSpecifier}
          />
          <StatsValueWithLabel
            label="24h New Users"
            value={edgeUserBaseOverviewData?.edgeNewUsers24h}
            formatSpecifier={usersFormatSpecifier}
          />
          <StatsValueWithLabel
            label="Avg. Fees per User"
            value={edgeUserBaseOverviewData?.edgeAvgUserFeesUsd}
            formatSpecifier={
              CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED
            }
          />
        </>
      }
    >
      <ChainEnvBreakdownStatsChart
        chartTitle={`${granularityLabelStartCased} New & Total Users`}
        chartDescription={`The ${granularityLabel} new users across chains and the cumulative on Edge.`}
        data={userBaseByChainEnvChartData?.users}
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeNumberAbbreviatedAxisFormatter,
        }}
        isLoading={isLoadingUserBaseByChainEnvChartData}
        chartType="bar"
      />
    </StatsChartWithOverviewSection>
  );
}
