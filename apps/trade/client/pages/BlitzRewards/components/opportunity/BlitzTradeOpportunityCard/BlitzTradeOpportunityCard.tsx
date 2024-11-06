import { Icons } from '@vertex-protocol/web-ui';
import { BlitzOpportunityCard } from 'client/pages/BlitzRewards/components/opportunity/BlitzOpportunityCard';
import { BlitzTradeOpportunityCardContent } from 'client/pages/BlitzRewards/components/opportunity/BlitzTradeOpportunityCard/BlitzTradeOpportunityCardContent';

export function BlitzTradeOpportunityCard() {
  return (
    <BlitzOpportunityCard
      title="Trade"
      description="Earn points by trading"
      icon={Icons.ChartBar}
      content={<BlitzTradeOpportunityCardContent />}
    />
  );
}
