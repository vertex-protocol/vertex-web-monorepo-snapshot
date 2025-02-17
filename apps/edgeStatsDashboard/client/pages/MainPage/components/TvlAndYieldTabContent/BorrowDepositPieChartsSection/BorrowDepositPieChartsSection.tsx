import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { StatsPieChart } from 'client/components/charts/StatsPieChart/StatsPieChart';
import { StatsPieChartCenterMetric } from 'client/components/charts/StatsPieChart/StatsPieChartCenterMetric';
import { StatsSection } from 'client/components/StatsSection';
import { useEdgeBorrowsPieChartData } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositPieChartsSection/useEdgeBorrowsPieChartData';
import { useEdgeDepositsPieChartData } from 'client/pages/MainPage/components/TvlAndYieldTabContent/BorrowDepositPieChartsSection/useEdgeDepositsPieChartData';

export function BorrowDepositPieChartsSection() {
  const {
    data: edgeDepositsPieChartData,
    isLoading: isLoadingEdgeDepositsPieChartData,
  } = useEdgeDepositsPieChartData();
  const {
    data: edgeBorrowsPieChartData,
    isLoading: isEdgeBorrowsPieChartData,
  } = useEdgeBorrowsPieChartData();

  const depositsBorrowsFormatSpecifier =
    CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED;

  return (
    <StatsSection className="sm:grid-cols-2">
      <StatsPieChart
        chartTitle="Total Deposited by Asset"
        chartDescription="Breakdown of the Edge total deposits across individual assets."
        centerContent={
          <StatsPieChartCenterMetric
            label="Total Deposits"
            value={edgeDepositsPieChartData?.edgeTotalDepositsAtNowUsd}
            valueFormatSpecifier={depositsBorrowsFormatSpecifier}
          />
        }
        isLoading={isLoadingEdgeDepositsPieChartData}
        data={edgeDepositsPieChartData?.edgeTotalDepositsAtNowByProductUsd}
        formatSpecifier={depositsBorrowsFormatSpecifier}
        showLegend
      />
      <StatsPieChart
        chartTitle="Total Borrowed by Asset"
        chartDescription="Breakdown of the Edge total borrows across individual assets."
        centerContent={
          <StatsPieChartCenterMetric
            label="Total Borrows"
            value={edgeBorrowsPieChartData?.edgeTotalBorrowsAtNowUsd}
            valueFormatSpecifier={depositsBorrowsFormatSpecifier}
          />
        }
        isLoading={isEdgeBorrowsPieChartData}
        data={edgeBorrowsPieChartData?.edgeTotalBorrowsAtNowByProductUsd}
        formatSpecifier={depositsBorrowsFormatSpecifier}
        showLegend
      />
    </StatsSection>
  );
}
