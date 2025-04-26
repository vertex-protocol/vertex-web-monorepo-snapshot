import {
  WithChildren,
  WithClassnames,
  mergeClassNames,
} from '@vertex-protocol/web-common';
import { ReactNode } from 'react';
import { PRIVACY_BLUR_CLASSNAME } from '../../consts/privacy';
import { SizeVariant } from '../../types';
import { ValueEndElement } from './ValueEndElement';

export interface ValueProps extends WithClassnames<WithChildren> {
  sizeVariant?: SizeVariant;
  endElement?: ReactNode;
  isValuePrivate?: boolean;
}

export function Value({
  sizeVariant = 'base',
  className,
  children,
  endElement,
  isValuePrivate,
}: ValueProps) {
  const textSizeClassName = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg sm:text-xl',
    xl: 'text-2xl sm:text-3xl',
  }[sizeVariant];

  return (
    <div
      className={mergeClassNames(
        textSizeClassName,
        'text-text-primary flex items-baseline gap-x-1',
        // Applying `leading-none` & `sm:leading-none` to prevent being overridden on larger screens by `textSizeClassName`
        'leading-none sm:leading-none',
        isValuePrivate && PRIVACY_BLUR_CLASSNAME,
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
