import { AppPage } from 'client/modules/app/AppPage';
import { FuulReferralEarningsCard } from 'client/pages/VertexReferrals/components/FuulReferralEarningsCard/FuulReferralEarningsCard';
import { FuulReferralsLeaderboardHeading } from 'client/pages/VertexReferrals/components/FuulReferralsLeaderboardHeading/FuulReferralsLeaderboardHeading';
import { FuulReferralsOverviewCard } from 'client/pages/VertexReferrals/components/FuulReferralsOverviewCard/FuulReferralsOverviewCard';
import { FuulReferralsReferTradersCard } from 'client/pages/VertexReferrals/components/FuulReferralsReferTradersCard/FuulReferralsReferTradersCard';
import { FuulReferralsRewardsLeaderboardTable } from 'client/pages/VertexReferrals/components/FuulReferralsRewardsLeaderboardTable/FuulReferralsRewardsLeaderboardTable';
import { ReferralsPageTitle } from 'client/pages/VertexReferrals/components/ReferralsPageTitle/ReferralsPageTitle';

export function VertexReferralsPage() {
  return (
    <AppPage.Content layoutWidth="sm">
      <ReferralsPageTitle />
      {/*grid-cols-1 is required to contain overflow for referral link bar in FuulReferralsReferTradersCard*/}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-6">
        <div className="flex flex-col gap-4 sm:gap-6">
          <FuulReferralsOverviewCard className="flex-1" />
          <FuulReferralsReferTradersCard />
        </div>
        <FuulReferralEarningsCard />
      </div>
      <div className="flex flex-col gap-y-2 pt-2">
        <FuulReferralsLeaderboardHeading />
        <FuulReferralsRewardsLeaderboardTable />
      </div>
    </AppPage.Content>
  );
}
