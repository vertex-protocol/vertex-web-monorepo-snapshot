'use client';

import { usePortfolioCharts } from 'client/pages/Portfolio/charts/hooks/usePortfolioCharts';
import { PortfolioChartTab } from 'client/pages/Portfolio/charts/types';
import { PortfolioHeroSection } from 'client/pages/Portfolio/components/PortfolioHeroSection';
import { PortfolioPerpFundingChart } from 'client/pages/Portfolio/subpages/Perpetuals/charts/PortfolioPerpFundingChart';
import { PortfolioPerpPnlChart } from 'client/pages/Portfolio/subpages/Perpetuals/charts/PortfolioPerpPnlChart';
import { PerpHeroMetricsHeader } from 'client/pages/Portfolio/subpages/Perpetuals/components/PerpHeroMetricsHeader';
import { PerpHeroMetricsItems } from 'client/pages/Portfolio/subpages/Perpetuals/components/PerpHeroMetricsItems';

export type PerpChartTabID = 'perp_pnl' | 'funding';

const PERP_CHART_TABS: PortfolioChartTab<PerpChartTabID>[] = [
  {
    id: 'perp_pnl',
    ChartComponent: PortfolioPerpPnlChart,
    label: 'PnL',
  },
  {
    id: 'funding',
    ChartComponent: PortfolioPerpFundingChart,
    label: 'Funding',
    labelDefinitionId: 'perpFundingChartAccuracy',
  },
];

export function PerpHeroSection() {
  const {
    chartData,
    timespan,
    setTimespan,
    tabs,
    selectedTabId,
    setSelectedUntypedTabId,
    areAccountValuesPrivate,
  } = usePortfolioCharts(PERP_CHART_TABS);

  return (
    <PortfolioHeroSection.Container>
      <PortfolioHeroSection.MetricsPane>
        <PerpHeroMetricsHeader timespan={timespan} />
        <PerpHeroMetricsItems />
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
