import { PortfolioPageContentWrapper } from 'client/pages/Portfolio/components/PortfolioPageContentWrapper';
import { BalancesHeader } from './components/BalancesHeader';
import { BalancesHeroSection } from './components/BalancesHeroSection';
import { BalancesTabs } from './components/BalancesTabs';

export function PortfolioBalancesPage() {
  return (
    <PortfolioPageContentWrapper>
      <BalancesHeader />
      <BalancesHeroSection />
      <BalancesTabs />
    </PortfolioPageContentWrapper>
  );
}
