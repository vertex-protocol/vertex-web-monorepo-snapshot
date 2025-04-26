import { mergeClassNames } from '@vertex-protocol/web-common';
import { Except } from 'type-fest';
import { getStateOverlayClassNames } from '../../utils';
import { Button } from './Button';
import { ButtonProps } from './types';

export type TabButtonProps = Except<ButtonProps, 'isLoading'> & {
  active?: boolean;
};

export function TabButton({ className, active, ...rest }: TabButtonProps) {
  const stateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'sm',
    disabled: rest.disabled,
    active,
  });

  return (
    <Button
      className={mergeClassNames(
        'bg-surface-1 rounded-sm px-2.5 py-1 text-sm',
        active ? 'text-text-primary' : 'text-text-tertiary',
        stateOverlayClassNames,
        className,
      )}
      {...rest}
    />
  );
}
