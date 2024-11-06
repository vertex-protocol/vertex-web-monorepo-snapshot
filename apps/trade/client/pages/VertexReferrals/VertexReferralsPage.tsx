import { AppPage } from 'client/modules/app/AppPage';
import { ReferralEarningsCard } from 'client/pages/VertexReferrals/components/ReferralEarningsCard/ReferralEarningsCard';
import { ReferralsLeaderboardHeading } from 'client/pages/VertexReferrals/components/ReferralsLeaderboardHeading/ReferralsLeaderboardHeading';
import { ReferralsOverviewCard } from 'client/pages/VertexReferrals/components/ReferralsOverviewCard/ReferralsOverviewCard';
import { ReferralsPageTitle } from 'client/pages/VertexReferrals/components/ReferralsPageTitle/ReferralsPageTitle';
import { ReferralsReferTradersCard } from 'client/pages/VertexReferrals/components/ReferralsReferTradersCard/ReferralsReferTradersCard';
import { ReferralsRewardsLeaderboardTable } from 'client/pages/VertexReferrals/components/ReferralsRewardsLeaderboardTable/ReferralsRewardsLeaderboardTable';

export function VertexReferralsPage() {
  return (
    <AppPage.Content layoutWidth="sm">
      <ReferralsPageTitle />
      {/*grid-cols-1 is required to contain overflow for referral link bar in ReferralsReferTradersCard*/}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col gap-4 sm:gap-6">
          <ReferralsOverviewCard className="flex-1" />
          <ReferralsReferTradersCard />
        </div>
        <ReferralEarningsCard />
      </div>
      <div className="flex flex-col gap-y-2 pt-2">
        <ReferralsLeaderboardHeading />
        <ReferralsRewardsLeaderboardTable />
      </div>
    </AppPage.Content>
  );
}
