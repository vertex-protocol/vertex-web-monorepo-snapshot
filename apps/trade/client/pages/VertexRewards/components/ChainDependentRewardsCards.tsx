'use client';

import {
  ARB_CHAIN_ENVS,
  MANTLE_CHAIN_ENVS,
  SEI_CHAIN_ENVS,
} from '@vertex-protocol/react-client';
import { useIsEnabledForChainEnvs } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainEnvs';
import { ArbRewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/ArbRewardsSummaryCard/ArbRewardsSummaryCard';
import { LbaPositionCollapsibleSummaryCard } from 'client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/LbaPositionCollapsibleSummaryCard';
import { MantleRewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/MantleRewardsSummaryCard/MantleRewardsSummaryCard';
import { SeiRewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/SeiRewardsSummaryCard/SeiRewardsSummaryCard';

export function ChainDependentRewardsCards() {
  // Rewards are chain specific
  const showArbContent = useIsEnabledForChainEnvs(ARB_CHAIN_ENVS);
  const showMantleContent = useIsEnabledForChainEnvs(MANTLE_CHAIN_ENVS);
  const showSeiContent = useIsEnabledForChainEnvs(SEI_CHAIN_ENVS);

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
