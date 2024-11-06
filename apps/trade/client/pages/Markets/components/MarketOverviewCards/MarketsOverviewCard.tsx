import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { ReactNode } from 'react';

interface Props extends WithClassnames {
  title: string;
  value: ReactNode;
}

export function MarketsOverviewCard({ title, value, className }: Props) {
  return (
    <Card
      className={joinClassNames(
        // Setting min width for consistent card layouts across all screen sizes
        'flex min-w-[180px] flex-col justify-center gap-y-4 p-4',
        className,
      )}
    >
      <span className="text-text-tertiary text-sm">{title}</span>
      <span className="text-text-primary text-3xl">{value}</span>
    </Card>
  );
}
