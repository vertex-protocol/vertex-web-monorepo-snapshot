import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';
import { ComponentPropsWithRef } from 'react';
import { SizeVariant } from '../../types';

export const CARD_ROUNDED_CLASSNAMES = 'rounded-lg';

export const CARD_BORDER_RADIUS_VARIANT: Extract<SizeVariant, 'lg'> = 'lg';

export const CARD_CLASSNAMES = joinClassNames(
  'bg-surface-card shadow-elevation-card border border-stroke',
  CARD_ROUNDED_CLASSNAMES,
);

export function Card({ className, ...divProps }: ComponentPropsWithRef<'div'>) {
  return (
    <div
      className={mergeClassNames(CARD_CLASSNAMES, className)}
      {...divProps}
    />
  );
}
