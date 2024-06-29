import { LpBalancesTable } from 'client/modules/pools/components/LpBalancesTable';
import { PortfolioPageContentWrapper } from '../../components/PortfolioPageContentWrapper';
import { PoolsHeader } from './components/PoolsHeader';
import { PoolsHeroSection } from './components/PoolsHeroSection';

export function PortfolioPoolsPage() {
  return (
    <PortfolioPageContentWrapper>
      <PoolsHeader />
      <PoolsHeroSection />
      <LpBalancesTable />
    </PortfolioPageContentWrapper>
  );
}
