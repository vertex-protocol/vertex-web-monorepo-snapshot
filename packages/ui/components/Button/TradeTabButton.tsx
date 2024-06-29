import { mergeClassNames } from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import { Except } from 'type-fest';
import { getStateOverlayClassNames } from '../../utils';
import { Button } from './Button';
import { ButtonProps } from './types';

export type TradeTabButtonProps = Except<ButtonProps, 'isLoading'> & {
  side: 'long' | 'short';
  active?: boolean;
};

export const TradeTabButton = forwardRef<
  HTMLButtonElement,
  TradeTabButtonProps
>(function TradeTabButton({ children, active, side, className, ...rest }, ref) {
  const sideClassNames = side === 'long' ? 'text-positive' : 'text-negative';

  const stateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
    disabled: rest.disabled,
    active,
  });

  return (
    <Button
      className={mergeClassNames(
        'bg-surface-1 rounded py-2.5 text-xs uppercase',
        active ? sideClassNames : 'text-text-tertiary',
        stateOverlayClassNames,
        className,
      )}
      ref={ref}
      {...rest}
    >
      {children}
    </Button>
  );
});
