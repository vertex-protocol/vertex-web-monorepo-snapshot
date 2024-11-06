'use client';

import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ScrollShadowsContainer } from '@vertex-protocol/web-ui';
import { MarketsOverviewCard } from 'client/pages/Markets/components/MarketOverviewCards/MarketsOverviewCard';
import { useMarketsPageOverviewCards } from 'client/pages/Markets/hooks/useMarketsPageOverviewCards';

export function MarketsOverviewCards({ className }: WithClassnames) {
  const marketsPageOverviewCardData = useMarketsPageOverviewCards();

  return (
    <ScrollShadowsContainer
      orientation="horizontal"
      className={joinClassNames('flex gap-x-4', className)}
    >
      {marketsPageOverviewCardData.map(({ title, value }) => (
        <MarketsOverviewCard
          title={title}
          value={value}
          key={title}
          className="flex-1"
        />
      ))}
    </ScrollShadowsContainer>
  );
}
