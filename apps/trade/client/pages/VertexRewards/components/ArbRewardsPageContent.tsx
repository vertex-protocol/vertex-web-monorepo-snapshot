import { ArbRewardsSummaryCard } from 'client/pages/VertexRewards/components/cards/ArbRewardsSummaryCard/ArbRewardsSummaryCard';
import { LbaPositionCollapsibleSummaryCard } from 'client/pages/VertexRewards/components/cards/LbaPositionCollapsibleSummaryCard/LbaPositionCollapsibleSummaryCard';
import { VrtxCollapsibleSummaryCard } from 'client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/VrtxCollapsibleSummaryCard';

export function ArbRewardsPageContent() {
  return (
    <>
      <VrtxCollapsibleSummaryCard />
      <ArbRewardsSummaryCard />
      <LbaPositionCollapsibleSummaryCard />
    </>
  );
}
