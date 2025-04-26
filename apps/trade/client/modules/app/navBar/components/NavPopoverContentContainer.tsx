import { mergeClassNames } from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { ComponentPropsWithRef } from 'react';

export function NavPopoverContentContainer({
  className,
  ...rest
}: ComponentPropsWithRef<'div'>) {
  return (
    <Card
      className={mergeClassNames(
        'from-surface-2 to-surface-1 shadow-elevation-strong bg-linear-to-b p-2',
        className,
      )}
      {...rest}
    />
  );
}
