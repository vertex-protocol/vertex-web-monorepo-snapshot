import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { useMarketsPageOverviewCards } from '../../hooks/useMarketsPageOverviewCards';
import { MarketsOverviewCard } from './MarketsOverviewCard';

export function MarketsOverviewCards({ className }: WithClassnames) {
  const marketsPageOverviewCardData = useMarketsPageOverviewCards();

  return (
    <div className={joinClassNames('flex gap-x-4', className)}>
      {marketsPageOverviewCardData.map(({ title, value }) => (
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
