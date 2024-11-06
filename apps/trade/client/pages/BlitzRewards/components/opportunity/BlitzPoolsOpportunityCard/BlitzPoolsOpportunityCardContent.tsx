'use client';

import { BlitzPoolOpportunityItem } from 'client/pages/BlitzRewards/components/opportunity/BlitzPoolsOpportunityCard/BlitzPoolOpportunityItem';
import { useBlitzPoolOpportunities } from 'client/pages/BlitzRewards/components/opportunity/BlitzPoolsOpportunityCard/useBlitzPoolOpportunities';

export function BlitzPoolsOpportunityCardContent() {
  const poolOpportunities = useBlitzPoolOpportunities();

  return (
    <div className="flex flex-col gap-y-5">
      <p>Earn on Pools 🔥</p>
      <div className="flex flex-col gap-y-2.5">
        {poolOpportunities?.map(
          ({ productId, metadata, marketName, yieldFraction }) => (
            <BlitzPoolOpportunityItem
              key={productId}
              productId={productId}
              metadata={metadata}
              marketName={marketName}
              yieldFraction={yieldFraction}
            />
          ),
        )}
      </div>
    </div>
  );
}
