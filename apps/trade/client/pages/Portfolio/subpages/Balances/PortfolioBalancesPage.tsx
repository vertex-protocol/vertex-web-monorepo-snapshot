import { PortfolioPageContentWrapper } from 'client/pages/Portfolio/components/PortfolioPageContentWrapper';
import { BalancesHeader } from 'client/pages/Portfolio/subpages/Balances/components/BalancesHeader';
import { BalancesHeroSection } from 'client/pages/Portfolio/subpages/Balances/components/BalancesHeroSection';
import { BalancesTabs } from 'client/pages/Portfolio/subpages/Balances/components/BalancesTabs';

export function PortfolioBalancesPage() {
  return (
    <PortfolioPageContentWrapper>
      <BalancesHeader />
      <BalancesHeroSection />
      <BalancesTabs />
    </PortfolioPageContentWrapper>
  );
}
