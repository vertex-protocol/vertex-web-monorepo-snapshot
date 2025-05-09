import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { BorderRadiusVariant, SizeVariant } from '../../types';

type PillSizeVariant = Extract<SizeVariant, 'xs' | 'sm'>;
type PillBorderRadiusVariant = Extract<BorderRadiusVariant, 'sm' | 'full'>;

export interface PillProps extends WithChildren<WithClassnames> {
  colorVariant:
    | 'accent'
    | 'primary'
    | 'tertiary'
    | 'positive'
    | 'negative'
    | 'warning';
  sizeVariant: PillSizeVariant;
  borderRadiusVariant?: PillBorderRadiusVariant;
}

export function Pill({
  colorVariant,
  sizeVariant,
  borderRadiusVariant = 'full',
  children,
  className,
}: PillProps) {
  const colorClassNames = {
    positive: 'text-positive bg-positive-muted',
    warning: `text-warning bg-warning-muted`,
    accent: `text-accent bg-overlay-accent`,
    negative: 'text-negative bg-negative-muted',
    primary: 'text-text-primary bg-surface-2',
    tertiary: 'text-text-tertiary bg-surface-1',
  }[colorVariant];

  const sizeClassNames = {
    xs: 'text-xs py-1',
    sm: 'text-sm py-1.5',
  }[sizeVariant];

  const roundedClassName = {
    sm: 'rounded-sm',
    full: 'rounded-full',
  }[borderRadiusVariant];

  return (
    <div
      className={mergeClassNames(
        'flex items-center gap-1 px-2.5 leading-none whitespace-nowrap',
        colorClassNames,
        sizeClassNames,
        roundedClassName,
        className,
      )}
    >
      {children}
    </div>
  );
}
