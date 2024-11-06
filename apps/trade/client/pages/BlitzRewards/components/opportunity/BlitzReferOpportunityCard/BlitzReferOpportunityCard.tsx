import { Icons } from '@vertex-protocol/web-ui';
import { BlitzOpportunityCard } from 'client/pages/BlitzRewards/components/opportunity/BlitzOpportunityCard';
import { BlitzReferOpportunityCardContent } from 'client/pages/BlitzRewards/components/opportunity/BlitzReferOpportunityCard/BlitzReferOpportunityCardContent';

export function BlitzReferOpportunityCard() {
  return (
    <BlitzOpportunityCard
      title="Refer"
      icon={Icons.Users}
      description="Earn up to 25% of the points that your referrals earn"
      content={<BlitzReferOpportunityCardContent />}
    />
  );
}
