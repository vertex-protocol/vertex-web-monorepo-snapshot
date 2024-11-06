import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { forwardRef } from 'react';
import { SizeVariant } from '../../types';
import { IconComponent } from '../Icons';

export interface LabelProps extends WithClassnames<WithChildren> {
  sizeVariant?: SizeVariant;
  startIcon?: IconComponent;
  endIcon?: IconComponent;
  iconClassName?: string;
  outerClassName?: string;
}

export const Label = forwardRef<HTMLDivElement, LabelProps>(function Label(
  {
    className,
    children,
    sizeVariant = 'base',
    startIcon: StartIcon,
    endIcon: EndIcon,
    iconClassName,
  },
  ref,
) {
  const textSizeClassNames = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-sm',
    lg: 'text-base',
  }[sizeVariant];

  return (
    <div
      className={mergeClassNames(
        'text-text-tertiary flex items-center gap-x-1.5',
        textSizeClassNames,
        className,
      )}
      ref={ref}
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
});
