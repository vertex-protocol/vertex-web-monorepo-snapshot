import { ChainEnv } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { PrimaryChain, useEVMContext } from '@vertex-protocol/web-data';
import { Card, PrimaryButton } from '@vertex-protocol/web-ui';
import { arbitrum, arbitrumSepolia } from '@wagmi/core/chains';
import { AppPage } from 'client/modules/app/AppPage';
import { APP_PAGE_PADDING } from 'client/modules/app/consts/padding';
import { ARB_CHAIN_IDS } from 'client/modules/chainSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/chainSpecificContent/hooks/useIsEnabledForChainIds';
import { startCase } from 'lodash';
import { ArbRewardsSummaryCard } from './components/cards/ArbRewardsSummaryCard/ArbRewardsSummaryCard';
import { LbaPositionCollapsibleSummaryCard } from './components/cards/LbaPositionCollapsibleSummaryCard/LbaPositionCollapsibleSummaryCard';
import { VrtxCollapsibleSummaryCard } from './components/cards/VrtxCollapsibleSummaryCard/VrtxCollapsibleSummaryCard';
import { RewardsPageTitle } from './components/RewardsPageTitle';

export function VertexRewardsPage() {
  // Rewards details can only be rendered on arbitrum chains
  const showRewardsPageContent = useIsEnabledForChainIds(ARB_CHAIN_IDS);

  // This is a hacky implementation to derive the rewards chain. This is OK given that this logic is currently scoped to
  // the rewards page, but we'll need to revisit at some point
  const {
    primaryChainMetadata: { isTestnet },
    setPrimaryChainEnv,
  } = useEVMContext();
  const rewardsChain: PrimaryChain = isTestnet ? arbitrumSepolia : arbitrum;
  const rewardsChainEnv: ChainEnv = isTestnet ? 'testnet' : 'mainnet';
  const rewardsChainName = startCase(rewardsChain.name);

  const rewardsPageContent = (
    <>
      <div className="flex flex-col gap-y-6 lg:gap-y-8">
        <VrtxCollapsibleSummaryCard />
        <ArbRewardsSummaryCard />
        <LbaPositionCollapsibleSummaryCard />
      </div>
    </>
  );

  const requiresSwitchNetworkPageContent = (
    <Card className="flex flex-col items-center gap-y-3 p-3 py-6 text-center sm:p-6 sm:py-12">
      <h3 className="text-text-primary text-lg sm:text-2xl">
        Change Network to {rewardsChainName}
      </h3>
      <p className="pb-3 text-xs sm:text-sm">
        All networks on Vertex are eligible for trading rewards. Change the app
        network to {rewardsChainName} to view your rewards.
      </p>
      <PrimaryButton
        size="lg"
        onClick={() => {
          setPrimaryChainEnv(rewardsChainEnv);
        }}
      >
        Change Network
      </PrimaryButton>
    </Card>
  );

  return (
    <AppPage.Root
      routeName="Rewards"
      contentWrapperClassName={joinClassNames(
        APP_PAGE_PADDING.horizontal,
        APP_PAGE_PADDING.vertical,
      )}
    >
      <AppPage.Content className="max-w-[1100px] gap-y-5">
        <RewardsPageTitle />
        {showRewardsPageContent
          ? rewardsPageContent
          : requiresSwitchNetworkPageContent}
      </AppPage.Content>
    </AppPage.Root>
  );
}
