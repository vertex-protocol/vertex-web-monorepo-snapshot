import { usePortfolioCharts } from 'client/pages/Portfolio/charts/hooks/usePortfolioCharts';
import { PortfolioChartTab } from 'client/pages/Portfolio/charts/types';
import { PortfolioHeroSection } from 'client/pages/Portfolio/components/PortfolioHeroSection';
import { PortfolioPerpFundingChart } from '../charts/PortfolioPerpFundingChart';
import { PortfolioPerpPnlChart } from '../charts/PortfolioPerpPnlChart';
import { PerpHeroMetricsHeader } from './PerpHeroMetricsHeader';
import { PerpHeroMetricsItems } from './PerpHeroMetricsItems';

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
