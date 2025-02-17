import { CustomNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { LinkButton } from '@vertex-protocol/web-ui';
import { StatsPieChart } from 'client/components/charts/StatsPieChart/StatsPieChart';
import { StatsChartWithOverviewSection } from 'client/components/StatsChartWithOverviewSection';
import { StatsValueWithLabel } from 'client/components/StatsValueWithLabel';
import { LINKS } from 'client/config/links';
import { useEdgeMakerRebatesOverviewData } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/TradingFeesByMarketChartSection/useEdgeMakerRebatesOverviewData';
import { useEdgeTradingFeesPieChartData } from 'client/pages/MainPage/components/RevenueAndUsersTabContent/RevenueSection/TradingFeesByMarketChartSection/useEdgeTradingFeesPieChartData';
import Link from 'next/link';

export function TradingFeesByMarketChartSection() {
  const { data: edgeMarketRebatesOverviewData } =
    useEdgeMakerRebatesOverviewData();
  const {
    data: edgeTradingFeesPieChartData,
    isLoading: isLoadingEdgeTradingFeesPieChartData,
  } = useEdgeTradingFeesPieChartData();

  return (
    <StatsChartWithOverviewSection
      overviewContent={
        <div className="flex flex-1 flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <StatsValueWithLabel
            label="Total Maker Rebates"
            value={edgeMarketRebatesOverviewData?.edgeTotalMakerRebatesUsd}
            formatSpecifier={
              CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED
            }
          />
          <div className="text-text-secondary text-xs font-medium">
            Interested in becoming a market maker?{' '}
            <LinkButton
              as={Link}
              href={LINKS.tgInstitutional}
              colorVariant="primary"
              withExternalIcon
              external
            >
              Reach Out
            </LinkButton>
          </div>
        </div>
      }
    >
      <StatsPieChart
        chartTitle="Fees by Market"
        chartDescription="Breakdown of the Edge cumulative trading fees across individual markets."
        isLoading={isLoadingEdgeTradingFeesPieChartData}
        data={edgeTradingFeesPieChartData?.edgeFeesAllTimeByMarketUsd}
        formatSpecifier={CustomNumberFormatSpecifier.CURRENCY_LARGE_ABBREVIATED}
        showLegend
      />
    </StatsChartWithOverviewSection>
  );
}
