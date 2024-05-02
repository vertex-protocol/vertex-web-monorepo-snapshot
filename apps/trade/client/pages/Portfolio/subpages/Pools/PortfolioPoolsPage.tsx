import { LpBalancesTable } from 'client/modules/pools/components/LpBalancesTable';
import { PortfolioPageContentWrapper } from '../../components/PortfolioPageContentWrapper';
import { PoolsHeader } from './components/PoolsHeader';
import { PoolsHeroSection } from './components/PoolsHeroSection';
import { Divider } from '@vertex-protocol/web-ui';
import { ElixirPoolsSection } from 'client/modules/pools/components/elixirPools/ElixirPoolsSection';
import { ChainSpecificContent } from 'client/modules/chainSpecificContent/ChainSpecificContent';
import { ARB_CHAIN_IDS } from 'client/modules/chainSpecificContent/consts/chainIds';

export function PortfolioPoolsPage() {
  return (
    <PortfolioPageContentWrapper>
      <PoolsHeader />
      <PoolsHeroSection />
      <LpBalancesTable />
      <ChainSpecificContent enabledChainIds={ARB_CHAIN_IDS}>
        <Divider />
        <ElixirPoolsSection />
      </ChainSpecificContent>
    </PortfolioPageContentWrapper>
  );
}
