import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';
import { ComponentPropsWithRef, forwardRef } from 'react';
import { SizeVariant } from '../../types';

export const CARD_ROUNDED_CLASSNAMES = 'rounded-lg';

export const CARD_BORDER_RADIUS_VARIANT: Extract<SizeVariant, 'lg'> = 'lg';

export const CARD_CLASSNAMES = joinClassNames(
  'bg-surface-card shadow-elevation border border-stroke',
  CARD_ROUNDED_CLASSNAMES,
);

export const Card = forwardRef<HTMLDivElement, ComponentPropsWithRef<'div'>>(
  function Card({ className, children, ...divProps }, ref) {
    return (
      <div
        ref={ref}
        className={mergeClassNames(CARD_CLASSNAMES, className)}
        {...divProps}
      >
        {children}
      </div>
    );
  },
);
