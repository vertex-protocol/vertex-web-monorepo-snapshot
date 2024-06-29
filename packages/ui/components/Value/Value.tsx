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
  const textSizeClassNames = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-lg sm:text-[20px]',
    lg: 'text-2xl sm:text-3xl',
  }[sizeVariant];

  return (
    <div
      className={mergeClassNames(
        textSizeClassNames,
        'text-text-primary flex items-baseline gap-x-1',
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
