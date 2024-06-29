import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';
import { ComponentPropsWithRef, forwardRef } from 'react';
import { SizeVariant } from '../../types';

export const CARD_ROUNDED_CLASSNAMES = 'rounded-lg';

export const CARD_BORDER_RADIUS_VARIANT: Extract<SizeVariant, 'lg'> = 'lg';

export const CARD_CLASSNAMES = joinClassNames(
  'bg-surface-card shadow-elevation ring-1 ring-stroke',
  CARD_ROUNDED_CLASSNAMES,
);

export interface CardProps extends ComponentPropsWithRef<'div'> {
  insetRing?: boolean;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  { className, children, insetRing, ...divProps },
  ref,
) {
  return (
    <div
      ref={ref}
      className={mergeClassNames(
        CARD_CLASSNAMES,
        insetRing && 'ring-inset',
        className,
      )}
      {...divProps}
    >
      {children}
    </div>
  );
});
