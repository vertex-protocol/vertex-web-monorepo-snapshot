import {
  WithChildren,
  WithClassnames,
  joinClassNames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { SizeVariant } from '../../types';
import { IconType } from '../Icons';
import { forwardRef } from 'react';

export interface LabelProps extends WithClassnames<WithChildren> {
  sizeVariant?: SizeVariant;
  startIcon?: IconType;
  endIcon?: IconType;
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
        <StartIcon className={joinClassNames('size-4', iconClassName)} />
      )}
      {children}
      {!!EndIcon && (
        <EndIcon className={joinClassNames('size-4', iconClassName)} />
      )}
    </div>
  );
});
