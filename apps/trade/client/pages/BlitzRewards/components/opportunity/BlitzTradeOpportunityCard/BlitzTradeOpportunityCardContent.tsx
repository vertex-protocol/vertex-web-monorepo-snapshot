'use client';

import { BlitzBoostedMarketItem } from 'client/modules/rewards/components/BlitzBoostedMarketItem';
import { useBlitzMarketBoosts } from 'client/modules/rewards/hooks/useBlitzMarketBoosts';

export function BlitzTradeOpportunityCardContent() {
  const marketBoosts = useBlitzMarketBoosts();

  return (
    <div className="flex flex-col gap-y-5">
      <p>Market Multipliers 🔥</p>
      <div className="flex flex-col gap-y-2.5">
        {marketBoosts?.map(
          ({ productId, metadata, marketName, pointsMultiplier }) => (
            <BlitzBoostedMarketItem
              key={productId}
              productId={productId}
              metadata={metadata}
              marketName={marketName}
              pointsMultiplier={pointsMultiplier}
            />
          ),
        )}
      </div>
    </div>
  );
}
