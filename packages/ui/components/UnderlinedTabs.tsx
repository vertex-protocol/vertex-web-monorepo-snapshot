import { joinClassNames } from '@vertex-protocol/web-common';
import { ComponentPropsWithRef } from 'react';
import { SizeVariant } from '../types';
import { Button as BaseButton, TabButtonProps } from './Button';

function Button({
  className,
  active,
  size,
  disabled,
  ...rest
}: TabButtonProps & { size: SizeVariant }) {
  const activeButtonClasses = 'text-text-primary after:scale-x-100';
  const inactiveButtonClasses = joinClassNames(
    'text-text-tertiary after:scale-x-0',
    !disabled && 'hover:text-text-primary',
  );
  const underlineClasses =
    'after:absolute after:bottom-0.5 after:left-0 after:h-0.5 after:w-full after:rounded-t-sm after:bg-accent after:transition-transform after:transform-gpu';

  const buttonSizeClassNames =
    size === 'sm' ? 'text-xs py-2 px-2.5' : 'text-sm py-2.5 px-3';

  return (
    <BaseButton
      className={joinClassNames(
        'relative text-center',
        active ? activeButtonClasses : inactiveButtonClasses,
        buttonSizeClassNames,
        underlineClasses,
        className,
      )}
      disabled={disabled}
      {...rest}
    />
  );
}

function Container({ className, ...rest }: ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={joinClassNames(
        'flex min-w-max',
        'after:bg-stroke relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-sm',
        className,
      )}
      {...rest}
    />
  );
}

export const UnderlinedTabs = {
  Button,
  Container,
};
