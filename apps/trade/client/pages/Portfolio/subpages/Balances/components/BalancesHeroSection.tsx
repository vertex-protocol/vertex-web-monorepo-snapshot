import { useDerivedSubaccountOverview } from 'client/hooks/subaccount/useDerivedSubaccountOverview';
import { usePortfolioCharts } from 'client/pages/Portfolio/charts/hooks/usePortfolioCharts';
import { PortfolioChartTab } from 'client/pages/Portfolio/charts/types';
import { PortfolioHeroSection } from 'client/pages/Portfolio/components/PortfolioHeroSection';
import { PortfolioBalancesDepositsBorrowsChart } from '../charts/PortfolioBalancesDepositsBorrowsChart';
import { PortfolioBalancesInterestChart } from '../charts/PortfolioBalancesInterestChart';
import { PortfolioBalancesNetBalanceAprChart } from '../charts/PortfolioBalancesNetBalanceAprChart';
import { BalancesHeroMetricsHeader } from './BalancesHeroMetricsHeader';
import { BalancesHeroMetricsItems } from './BalancesHeroMetricsItems';

type BalancesChartTabID =
  | 'balance_and_apr'
  | 'deposits_and_borrows'
  | 'interest';

const BALANCES_CHART_TABS: PortfolioChartTab<BalancesChartTabID>[] = [
  {
    id: 'balance_and_apr',
    ChartComponent: PortfolioBalancesNetBalanceAprChart,
    label: 'Balance/APR',
  },
  {
    id: 'deposits_and_borrows',
    ChartComponent: PortfolioBalancesDepositsBorrowsChart,
    label: 'Deposits/Borrows',
  },
  {
    id: 'interest',
    ChartComponent: PortfolioBalancesInterestChart,
    label: 'Interest',
  },
];

export function BalancesHeroSection() {
  const {
    chartData,
    timespan,
    setTimespan,
    tabs,
    selectedTabId,
    setSelectedUntypedTabId,
    areAccountValuesPrivate,
  } = usePortfolioCharts(BALANCES_CHART_TABS);
  const { data: overview } = useDerivedSubaccountOverview();

  return (
    <PortfolioHeroSection.Container>
      <PortfolioHeroSection.MetricsPane>
        <BalancesHeroMetricsHeader netBalance={overview?.spot.netBalance} />
        <BalancesHeroMetricsItems overview={overview} />
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
