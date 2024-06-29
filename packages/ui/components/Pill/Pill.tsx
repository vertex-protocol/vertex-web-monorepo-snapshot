import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { SizeVariant } from '../../types';

type PillSizeVariant = Extract<SizeVariant, 'xs' | 'sm'>;

export interface PillProps extends WithChildren<WithClassnames> {
  colorVariant: 'accent' | 'tertiary' | 'positive' | 'negative';
  sizeVariant: PillSizeVariant;
}

export function Pill({
  colorVariant,
  sizeVariant,
  children,
  className,
}: PillProps) {
  const colorClassNames = {
    positive: 'text-positive bg-positive-muted',
    accent: 'text-accent bg-overlay-accent/20',
    negative: 'text-negative bg-negative-muted',
    tertiary: 'text-text-tertiary bg-surface-1',
  }[colorVariant];

  const sizeClassNames = {
    xs: 'text-xs',
    sm: 'text-sm',
  }[sizeVariant];

  return (
    <div
      className={mergeClassNames(
        'flex items-center gap-1 whitespace-nowrap rounded-full px-2.5 py-1',
        colorClassNames,
        sizeClassNames,
        className,
      )}
    >
      {children}
    </div>
  );
}
