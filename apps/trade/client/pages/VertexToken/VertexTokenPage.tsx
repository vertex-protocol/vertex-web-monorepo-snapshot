import { AppPage } from 'client/modules/app/AppPage';
import { StakingDismissibleBanner } from 'client/pages/VertexToken/components/StakingDismissibleBanner';
import { StakingPageHeader } from 'client/pages/VertexToken/components/StakingPageHeader/StakingPageHeader';
import { StakingPoolStatsCard } from 'client/pages/VertexToken/components/StakingPoolStatsCard';
import { StakingStatsCard } from 'client/pages/VertexToken/components/StakingStatsCard/StakingStatsCard';

export function VertexTokenPage() {
  return (
    <AppPage.Content layoutWidth="sm">
      <StakingPageHeader />
      <StakingDismissibleBanner />
      <StakingStatsCard />
      <StakingPoolStatsCard />
    </AppPage.Content>
  );
}
