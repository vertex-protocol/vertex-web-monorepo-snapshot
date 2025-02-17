'use client';

import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { MarketsOverviewCard } from 'client/pages/Markets/components/MarketsOverviewCards/MarketsOverviewCard';
import { useMarketsOverviewCards } from 'client/pages/Markets/components/MarketsOverviewCards/useMarketsOverviewCards';

export function MarketsOverviewCards({ className }: WithClassnames) {
  const marketsPageOverviewCards = useMarketsOverviewCards();

  return (
    <div className={joinClassNames('grid gap-4 sm:grid-cols-2', className)}>
      {marketsPageOverviewCards.map(({ title, value }) => (
        <MarketsOverviewCard
          title={title}
          value={value}
          key={title}
          className="flex-1"
        />
      ))}
    </div>
  );
}
