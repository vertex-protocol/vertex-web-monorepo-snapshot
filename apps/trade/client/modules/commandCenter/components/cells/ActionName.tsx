import { WithClassnames, mergeClassNames } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';

interface Props extends WithClassnames {
  children: ReactNode;
}

export function ActionName({ className, children }: Props) {
  return (
    <div
      className={mergeClassNames(
        'text-text-tertiary whitespace-nowrap capitalize',
        'flex items-center gap-x-2',
        className,
      )}
    >
      {children}
    </div>
  );
}
