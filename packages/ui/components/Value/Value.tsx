import {
  WithChildren,
  WithClassnames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { SizeVariant } from '../../types';
import { ValueEndElement } from './ValueEndElement';

export interface ValueProps extends WithClassnames<WithChildren> {
  sizeVariant?: SizeVariant;
  endElement?: ReactNode;
}

export function Value({
  sizeVariant = 'base',
  className,
  children,
  endElement,
}: ValueProps) {
  const textSizeClassName = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-lg sm:text-xl',
    lg: 'text-2xl sm:text-3xl',
  }[sizeVariant];

  return (
    <div
      className={mergeClassNames(
        textSizeClassName,
        'text-text-primary flex items-baseline gap-x-1',
        // Applying `leading-none` & `sm:leading-none` to prevent being overridden on larger screens by `textSizeClassName`
        'leading-none sm:leading-none',
        className,
      )}
    >
      {children}
      {!!endElement && (
        <ValueEndElement sizeVariant={sizeVariant}>
          {endElement}
        </ValueEndElement>
      )}
    </div>
  );
}
