import { VrtxCollapsibleSummaryCard } from 'client/pages/VertexRewards/components/cards/VrtxCollapsibleSummaryCard/VrtxCollapsibleSummaryCard';
import { MantleRewardsSummaryCard } from './cards/MantleRewardsSummaryCard/MantleRewardsSummaryCard';

export function MantleRewardsPageContent() {
  return (
    <>
      <VrtxCollapsibleSummaryCard />
      <MantleRewardsSummaryCard />
    </>
  );
}
