import { mergeClassNames } from '@vertex-protocol/web-common';
import { Except } from 'type-fest';
import { getStateOverlayClassNames } from '../../utils';
import { Button } from './Button';
import { ButtonProps } from './types';

export type TradeTabButtonProps = Except<ButtonProps, 'isLoading'> & {
  side: 'long' | 'short';
  active?: boolean;
};

export function TradeTabButton({
  active,
  side,
  className,
  ...rest
}: TradeTabButtonProps) {
  const sideClassNames = side === 'long' ? 'text-positive' : 'text-negative';

  const stateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'sm',
    disabled: rest.disabled,
    active,
  });

  return (
    <Button
      className={mergeClassNames(
        'bg-surface-1 rounded-sm py-1.5 text-xs uppercase',
        active ? sideClassNames : 'text-text-tertiary',
        stateOverlayClassNames,
        className,
      )}
      {...rest}
    />
  );
}
