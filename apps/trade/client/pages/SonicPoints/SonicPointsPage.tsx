import { Divider } from '@vertex-protocol/web-ui';
import { AppPage } from 'client/modules/app/AppPage';
import { SonicPointsEarnSection } from 'client/pages/SonicPoints/components/earn/SonicPointsEarnSection';
import { SonicPointsHeroSection } from 'client/pages/SonicPoints/components/hero/SonicPointsHeroSection';
import { SonicPointsLeaderboardSection } from 'client/pages/SonicPoints/components/leaderboard/SonicPointsLeaderboardSection';
import { SonicPointsDismissibleBanner } from 'client/pages/SonicPoints/components/SonicPointsDismissibleBanner/SonicPointsDismissibleBanner';
import { SonicPointsPageHeader } from 'client/pages/SonicPoints/components/SonicPointsPageHeader';

export function SonicPointsPage() {
  return (
    <AppPage.Content layoutWidth="sm">
      <SonicPointsPageHeader />
      <SonicPointsDismissibleBanner />
      <SonicPointsHeroSection />
      <Divider />
      <SonicPointsEarnSection />
      <Divider />
      <SonicPointsLeaderboardSection />
    </AppPage.Content>
  );
}
