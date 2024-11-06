import { Icons } from '@vertex-protocol/web-ui';
import { BlitzOpportunityCard } from 'client/pages/BlitzRewards/components/opportunity/BlitzOpportunityCard';
import { BlitzPoolsOpportunityCardContent } from 'client/pages/BlitzRewards/components/opportunity/BlitzPoolsOpportunityCard/BlitzPoolsOpportunityCardContent';

export function BlitzPoolsOpportunityCard() {
  return (
    <BlitzOpportunityCard
      title="Provide Liquidity"
      description="Earn by providing liquidity"
      icon={Icons.Intersect}
      content={<BlitzPoolsOpportunityCardContent />}
    />
  );
}
