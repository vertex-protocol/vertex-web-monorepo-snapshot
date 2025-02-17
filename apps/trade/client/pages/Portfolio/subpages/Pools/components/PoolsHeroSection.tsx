'use client';

import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { usePortfolioCharts } from 'client/pages/Portfolio/charts/hooks/usePortfolioCharts';
import { PortfolioChartTab } from 'client/pages/Portfolio/charts/types';
import { PortfolioHeroSection } from 'client/pages/Portfolio/components/PortfolioHeroSection';
import { PortfolioPoolsPnlChart } from 'client/pages/Portfolio/subpages/Pools/charts/PortfolioPoolsPnlChart';
import { PortfolioPoolsPositionChart } from 'client/pages/Portfolio/subpages/Pools/charts/PortfolioPoolsPositionChart';
import { PoolsHeroMetricsHeader } from 'client/pages/Portfolio/subpages/Pools/components/PoolsHeroMetricsHeader';
import { PoolsHeroMetricsItems } from 'client/pages/Portfolio/subpages/Pools/components/PoolsHeroMetricsItems';

type PoolsChartTabID = 'pnl' | 'position';

const POOLS_CHART_TABS: PortfolioChartTab<PoolsChartTabID>[] = [
  {
    id: 'pnl',
    ChartComponent: PortfolioPoolsPnlChart,
    label: 'PnL',
  },
  {
    id: 'position',
    ChartComponent: PortfolioPoolsPositionChart,
    label: 'Position',
  },
];

export function PoolsHeroSection() {
  const {
    chartData,
    timespan,
    setTimespan,
    tabs,
    selectedTabId,
    setSelectedUntypedTabId,
    areAccountValuesPrivate,
  } = usePortfolioCharts(POOLS_CHART_TABS);
  const { data: overview } = useSubaccountOverview();

  return (
    <PortfolioHeroSection.Container>
      <PortfolioHeroSection.MetricsPane>
        <PoolsHeroMetricsHeader totalLpValueUsd={overview?.lp.totalValueUsd} />
        <PoolsHeroMetricsItems overview={overview} />
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
