import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { BlitzOpportunityCard } from 'client/pages/BlitzRewards/components/opportunity/BlitzOpportunityCard';
import { BlitzTradingCompetitionOpportunityTbaCardContent } from 'client/pages/BlitzRewards/components/opportunity/BlitzTradingCompetitionOpportunityCard/BlitzTradingCompetitionOpportunityTbaCardContent';

export function BlitzTradingCompetitionOpportunityCard() {
  const cardContentClassNames = joinClassNames(
    'bg-surface-1 rounded',
    'flex flex-col-reverse gap-6 sm:flex-row sm:justify-between',
    'p-4',
  );

  return (
    <BlitzOpportunityCard
      title="Competitions"
      description="Compete to win rewards"
      icon={Icons.Clock}
      // If the trading competition page is up, use BlitzTradingCompetitionOpportunityCardContent.
      // Otherwise use BlitzTradingCompetitionOpportunityTbaCardContent.
      // cardContentClassNames should be passed on both.
      content={
        <BlitzTradingCompetitionOpportunityTbaCardContent
          className={cardContentClassNames}
        />
      }
    />
  );
}
