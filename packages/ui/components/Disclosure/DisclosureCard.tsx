import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { Card } from '../Card';

export interface DisclosureCardProps extends WithClassnames {
  title: ReactNode;
  description: ReactNode;
  titleClassName?: string;
}

export function DisclosureCard({
  className,
  title,
  titleClassName,
  description,
}: DisclosureCardProps) {
  return (
    <Card
      className={mergeClassNames(
        'bg-surface-1 flex flex-col gap-y-2 p-3',
        className,
      )}
    >
      <div
        className={mergeClassNames('text-sm', 'text-accent', titleClassName)}
      >
        {title}
      </div>
      <div className="text-text-tertiary text-xs">{description}</div>
    </Card>
  );
}
