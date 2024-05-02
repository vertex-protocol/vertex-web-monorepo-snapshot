import { joinClassNames } from '@vertex-protocol/web-common';
import { CardButton, CardButtonBaseProps } from '@vertex-protocol/web-ui';
import { forwardRef } from 'react';

export const NavBarCardButton = forwardRef(function NavBarCardButton(
  { className, children, disabled, ...buttonProps }: CardButtonBaseProps,
  ref,
) {
  return (
    <CardButton
      className={joinClassNames(
        'flex gap-x-1 px-2 py-1.5',
        !disabled && 'hover:bg-overlay-hover/5',
        className,
      )}
      disabled={disabled}
      ref={ref}
      {...buttonProps}
    >
      {children}
    </CardButton>
  );
});
