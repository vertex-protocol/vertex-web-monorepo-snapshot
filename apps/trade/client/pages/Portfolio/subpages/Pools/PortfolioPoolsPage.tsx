import { LpBalancesTable } from 'client/modules/pools/components/LpBalancesTable';
import { PortfolioPageContentWrapper } from 'client/pages/Portfolio/components/PortfolioPageContentWrapper';
import { PoolsHeader } from 'client/pages/Portfolio/subpages/Pools/components/PoolsHeader';
import { PoolsHeroSection } from 'client/pages/Portfolio/subpages/Pools/components/PoolsHeroSection';

export function PortfolioPoolsPage() {
  return (
    <PortfolioPageContentWrapper>
      <PoolsHeader />
      <PoolsHeroSection />
      <LpBalancesTable />
    </PortfolioPageContentWrapper>
  );
}
