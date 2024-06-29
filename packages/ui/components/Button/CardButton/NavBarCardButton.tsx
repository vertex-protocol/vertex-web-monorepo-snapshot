import { joinClassNames } from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import { CardButton, CardButtonBaseProps } from './CardButton';

export const NavBarCardButton = forwardRef(function NavBarCardButton(
  { className, children, disabled, ...buttonProps }: CardButtonBaseProps,
  ref,
) {
  return (
    <CardButton
      className={joinClassNames('flex gap-x-1 px-2 py-1.5', className)}
      disabled={disabled}
      ref={ref}
      {...buttonProps}
    >
      {children}
    </CardButton>
  );
});
