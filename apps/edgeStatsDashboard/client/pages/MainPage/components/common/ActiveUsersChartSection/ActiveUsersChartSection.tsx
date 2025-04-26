import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { largeNumberAbbreviatedAxisFormatter } from 'client/components/charts/axisFormatters';
import { StatsChart } from 'client/components/charts/StatsChart/StatsChart';
import { LabelWithEdgeLogo } from 'client/components/LabelWithEdgeLogo';
import { StatsChartWithOverviewSection } from 'client/components/StatsChartWithOverviewSection';
import { StatsValueWithLabel } from 'client/components/StatsValueWithLabel';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';
import { useEdgeActiveUsersChartData } from 'client/pages/MainPage/components/common/ActiveUsersChartSection/useEdgeActiveUsersChartData';
import { useEdgeActiveUsersOverviewData } from 'client/pages/MainPage/components/common/ActiveUsersChartSection/useEdgeActiveUsersOverviewData';
import { getEdgeStatsColorVar } from 'client/theme/colorVars';

interface Props {
  showTotalTradersMetric: boolean;
}

export function ActiveUsersChartSection({ showTotalTradersMetric }: Props) {
  const { data: edgeActiveUsersOverviewData } =
    useEdgeActiveUsersOverviewData();
  const {
    data: edgeActiveUsersChartData,
    isLoading: isLoadingEdgeActiveUsersChartData,
  } = useEdgeActiveUsersChartData();
  const { xAxisTickFormatter } = useChartTimeframe();

  const formatSpecifier = CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED;

  return (
    <StatsChartWithOverviewSection
      overviewContent={
        <>
          <StatsValueWithLabel
            label="24h Traders"
            value={edgeActiveUsersOverviewData?.edge24ActiveUsers}
            formatSpecifier={formatSpecifier}
          />
          {showTotalTradersMetric && (
            <StatsValueWithLabel
              label="Total Traders"
              value={edgeActiveUsersOverviewData?.edgeTotalUsers}
              formatSpecifier={formatSpecifier}
            />
          )}
        </>
      }
    >
      <StatsChart
        chartTitle="Daily Active Users"
        chartDescription="The daily active traders on Edge."
        data={edgeActiveUsersChartData?.activeUsers}
        configByDataKey={{
          activeUsers: {
            color: getEdgeStatsColorVar('chart-fill'),
            dataKey: 'activeUsers',
            label: <LabelWithEdgeLogo label="Total" />,
            chartType: 'line',
            yAxisId: 'left',
          },
        }}
        xAxisProps={{
          tickFormatter: xAxisTickFormatter,
        }}
        yAxisProps={{
          tickFormatter: largeNumberAbbreviatedAxisFormatter,
        }}
        isLoading={isLoadingEdgeActiveUsersChartData}
      />
    </StatsChartWithOverviewSection>
  );
}
