import { BigDecimal } from '@vertex-protocol/client';
import { usePortfolioCharts } from 'client/pages/Portfolio/charts/hooks/usePortfolioCharts';
import { PortfolioChartTab } from 'client/pages/Portfolio/charts/types';
import { PortfolioHeroSection } from 'client/pages/Portfolio/components/PortfolioHeroSection';
import { PortfolioOverviewAccountValueChart } from 'client/pages/Portfolio/subpages/Overview/charts/PortfolioOverviewAccountValueChart';
import { PortfolioOverviewPnlChart } from 'client/pages/Portfolio/subpages/Overview/charts/PortfolioOverviewPnlChart';
import { OverviewHeroMetricsHeader } from 'client/pages/Portfolio/subpages/Overview/components/OverviewHeroSection/OverviewHeroMetricsHeader';
import { OverviewHeroMetricsItems } from 'client/pages/Portfolio/subpages/Overview/components/OverviewHeroSection/OverviewHeroMetricsItems';

type OverviewChartTabID = 'pnl' | 'account_value';

const OVERVIEW_CHART_TABS: PortfolioChartTab<OverviewChartTabID>[] = [
  {
    id: 'account_value',
    ChartComponent: PortfolioOverviewAccountValueChart,
    label: 'Account',
  },
  {
    id: 'pnl',
    ChartComponent: PortfolioOverviewPnlChart,
    label: 'PnL',
  },
];

interface Props {
  fundsAvailableBoundedUsd: BigDecimal | undefined;
  isolatedUnrealizedPnlUsd: BigDecimal | undefined;
  isolatedTotalNetMarginUsd: BigDecimal | undefined;
  portfolioValueUsd: BigDecimal | undefined;
  liquidationRiskFractionBounded: BigDecimal | undefined;
}

export function OverviewHeroSection({
  isolatedUnrealizedPnlUsd,
  liquidationRiskFractionBounded,
  portfolioValueUsd,
  fundsAvailableBoundedUsd,
  isolatedTotalNetMarginUsd,
}: Props) {
  const {
    chartData,
    timespan,
    setTimespan,
    selectedTabId,
    tabs,
    setSelectedUntypedTabId,
    areAccountValuesPrivate,
  } = usePortfolioCharts(OVERVIEW_CHART_TABS);

  return (
    <PortfolioHeroSection.Container>
      <PortfolioHeroSection.MetricsPane>
        <OverviewHeroMetricsHeader
          timespan={timespan}
          portfolioValueUsd={portfolioValueUsd}
        />
        <OverviewHeroMetricsItems
          fundsAvailableBoundedUsd={fundsAvailableBoundedUsd}
          isolatedTotalNetMarginUsd={isolatedTotalNetMarginUsd}
          isolatedUnrealizedPnlUsd={isolatedUnrealizedPnlUsd}
          liquidationRiskFraction={liquidationRiskFractionBounded}
        />
      </PortfolioHeroSection.MetricsPane>
      <PortfolioHeroSection.Chart
        className="lg:col-span-3"
        chartData={chartData}
        isPrivate={areAccountValuesPrivate}
        selectedTabId={selectedTabId}
        setSelectedUntypedTabId={setSelectedUntypedTabId}
        setTimespan={setTimespan}
        tabs={tabs}
        timespan={timespan}
      />
    </PortfolioHeroSection.Container>
  );
}
