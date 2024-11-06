'use client';

import {
  ARB_CHAIN_IDS,
  MANTLE_CHAIN_IDS,
  SEI_CHAIN_IDS,
} from 'client/modules/envSpecificContent/consts/chainIds';
import { useIsEnabledForChainIds } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainIds';
import { ArbRewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/ArbRewardsSummaryCard/ArbRewardsSummaryCard';
import { LbaPositionCollapsibleSummaryCard } from 'client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/LbaPositionCollapsibleSummaryCard';
import { MantleRewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/MantleRewardsSummaryCard/MantleRewardsSummaryCard';
import { SeiRewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/SeiRewardsSummaryCard/SeiRewardsSummaryCard';

export function ChainDependentRewardsCards() {
  // Rewards are chain specific
  const showArbContent = useIsEnabledForChainIds(ARB_CHAIN_IDS);
  const showMantleContent = useIsEnabledForChainIds(MANTLE_CHAIN_IDS);
  const showSeiContent = useIsEnabledForChainIds(SEI_CHAIN_IDS);

  if (showArbContent) {
    return (
      <>
        <ArbRewardsSummaryCard />
        <LbaPositionCollapsibleSummaryCard />
      </>
    );
  }
  if (showMantleContent) {
    return <MantleRewardsSummaryCard />;
  }
  if (showSeiContent) {
    return <SeiRewardsSummaryCard />;
  }

  return null;
}
