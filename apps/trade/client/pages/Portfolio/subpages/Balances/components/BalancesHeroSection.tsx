'use client';

import { useSubaccountOverview } from 'client/hooks/subaccount/useSubaccountOverview/useSubaccountOverview';
import { usePortfolioCharts } from 'client/pages/Portfolio/charts/hooks/usePortfolioCharts';
import { PortfolioChartTab } from 'client/pages/Portfolio/charts/types';
import { PortfolioHeroSection } from 'client/pages/Portfolio/components/PortfolioHeroSection';
import { PortfolioBalancesDepositsBorrowsChart } from 'client/pages/Portfolio/subpages/Balances/charts/PortfolioBalancesDepositsBorrowsChart';
import { PortfolioBalancesNetBalanceInterestChart } from 'client/pages/Portfolio/subpages/Balances/charts/PortfolioBalancesNetBalanceInterestChart';
import { BalancesHeroMetricsHeader } from 'client/pages/Portfolio/subpages/Balances/components/BalancesHeroMetricsHeader';
import { BalancesHeroMetricsItems } from 'client/pages/Portfolio/subpages/Balances/components/BalancesHeroMetricsItems';

type BalancesChartTabID = 'balance_and_interest' | 'deposits_and_borrows';

const BALANCES_CHART_TABS: PortfolioChartTab<BalancesChartTabID>[] = [
  {
    id: 'balance_and_interest',
    ChartComponent: PortfolioBalancesNetBalanceInterestChart,
    label: 'Balance/Interest',
    labelDefinitionId: 'balancesInterestChartAccuracy',
  },
  {
    id: 'deposits_and_borrows',
    ChartComponent: PortfolioBalancesDepositsBorrowsChart,
    label: 'Deposits/Borrows',
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
  const { data: overview } = useSubaccountOverview();

  return (
    <PortfolioHeroSection.Container>
      <PortfolioHeroSection.MetricsPane>
        <BalancesHeroMetricsHeader
          netTotalBalanceUsd={overview?.spot.netTotalBalanceUsd}
        />
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
