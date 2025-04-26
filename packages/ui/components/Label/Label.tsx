import { mergeClassNames } from '@vertex-protocol/web-common';
import { ComponentPropsWithRef } from 'react';
import { SizeVariant } from '../../types';
import { IconComponent } from '../Icons';

export interface LabelProps extends ComponentPropsWithRef<'div'> {
  sizeVariant?: SizeVariant;
  startIcon?: IconComponent;
  endIcon?: IconComponent;
  iconClassName?: string;
  outerClassName?: string;
}

export function Label({
  className,
  children,
  sizeVariant = 'base',
  startIcon: StartIcon,
  endIcon: EndIcon,
  iconClassName,
  ...rest
}: LabelProps) {
  const textSizeClassNames = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-xs',
    lg: 'text-sm',
    xl: 'text-base',
  }[sizeVariant];

  return (
    <div
      className={mergeClassNames(
        'text-text-tertiary flex items-center gap-x-1.5',
        textSizeClassNames,
        className,
      )}
      {...rest}
    >
      {!!StartIcon && (
        <StartIcon className={mergeClassNames('size-4', iconClassName)} />
      )}
      {children}
      {!!EndIcon && (
        <EndIcon className={mergeClassNames('size-4', iconClassName)} />
      )}
    </div>
  );
}
