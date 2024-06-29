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
        'from-grad-nav-surface-start to-grad-nav-surface-end bg-gradient-to-b p-2',
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Card>
  );
});
