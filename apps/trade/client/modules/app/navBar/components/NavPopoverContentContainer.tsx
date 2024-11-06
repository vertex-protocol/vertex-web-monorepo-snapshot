import { mergeClassNames } from '@vertex-protocol/web-common';
import { Card } from '@vertex-protocol/web-ui';
import { ComponentPropsWithRef, forwardRef } from 'react';

export const NavPopoverContentContainer = forwardRef<
  HTMLDivElement,
  ComponentPropsWithRef<'div'>
>(function NavPopoverContentContainer({ children, className, ...rest }, ref) {
  return (
    <Card
      className={mergeClassNames(
        'from-surface-2 to-surface-1 shadow-elevation-nav-dropdown bg-gradient-to-b p-2',
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Card>
  );
});
