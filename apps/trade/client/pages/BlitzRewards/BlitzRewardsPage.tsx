import { Divider } from '@vertex-protocol/web-ui';
import { AppPage } from 'client/modules/app/AppPage';
import { BlitzRewardsOverviewCard } from 'client/pages/BlitzRewards/components/BlitzRewardsOverviewCard/BlitzRewardsOverviewCard';
import { BlitzBlastGoldEarningsCard } from 'client/pages/BlitzRewards/components/earnings/BlitzBlastGoldEarningsCard/BlitzBlastGoldEarningsCard';
import { BlitzBlastPointsEarningsCard } from 'client/pages/BlitzRewards/components/earnings/BlitzBlastPointsEarningsCard/BlitzBlastPointsEarningsCard';
import { BlitzPointsEarningsCard } from 'client/pages/BlitzRewards/components/earnings/BlitzPointsEarningsCard/BlitzPointsEarningsCard';
import { BlitzPointsLeaderboardHeader } from 'client/pages/BlitzRewards/components/leaderboard/BlitzPointsLeaderboardHeader';
import { BlitzPointsLeaderboardTable } from 'client/pages/BlitzRewards/components/leaderboard/BlitzPointsLeaderboardTable/BlitzPointsLeaderboardTable';
import { BlitzOpportunitiesHeader } from 'client/pages/BlitzRewards/components/opportunity/BlitzOpportunitiesHeader';
import { BlitzTradeOpportunityCard } from 'client/pages/BlitzRewards/components/opportunity/BlitzTradeOpportunityCard/BlitzTradeOpportunityCard';
import { BlitzVaultsOpportunityCard } from 'client/pages/BlitzRewards/components/opportunity/BlitzVaultsOpportunityCard/BlitzVaultsOpportunityCard';
import { BlitzReferOpportunityCard } from 'client/pages/BlitzRewards/components/opportunity/BlitzReferOpportunityCard/BlitzReferOpportunityCard';
import { BlitzTradingCompetitionOpportunityCard } from 'client/pages/BlitzRewards/components/opportunity/BlitzTradingCompetitionOpportunityCard/BlitzTradingCompetitionOpportunityCard';
import { BlitzPoolsOpportunityCard } from 'client/pages/BlitzRewards/components/opportunity/BlitzPoolsOpportunityCard/BlitzPoolsOpportunityCard';

export function BlitzRewardsPage() {
  return (
    <AppPage.Content layoutWidth="sm">
      <AppPage.Header title="Rewards" />
      {/* Overview */}
      <BlitzRewardsOverviewCard />
      {/* Earnings */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <BlitzPointsEarningsCard />
        <BlitzBlastGoldEarningsCard />
        <BlitzBlastPointsEarningsCard />
      </div>
      <Divider />
      {/* Opportunities */}
      <BlitzOpportunitiesHeader />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-6">
        <BlitzTradeOpportunityCard />
        <BlitzVaultsOpportunityCard />
        <BlitzPoolsOpportunityCard />
      </div>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
        <BlitzReferOpportunityCard />
        <BlitzTradingCompetitionOpportunityCard />
      </div>
      <Divider />
      {/* Leaderboard */}
      <BlitzPointsLeaderboardHeader />
      <BlitzPointsLeaderboardTable />
    </AppPage.Content>
  );
}
