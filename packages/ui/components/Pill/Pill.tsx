import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';

export interface PillProps extends WithChildren<WithClassnames> {
  color: 'accent' | 'white' | 'green' | 'red';
}

export function Pill({ color, children, className }: PillProps) {
  const colorClassNames = {
    green: 'text-positive bg-positive-muted',
    accent: 'text-accent bg-overlay-accent/20',
    red: 'text-negative bg-negative-muted',
    white: 'text-text-tertiary bg-surface-1',
  }[color];

  return (
    <div
      className={mergeClassNames(
        'whitespace-nowrap text-xs',
        'rounded-full px-3 py-1',
        colorClassNames,
        className,
      )}
    >
      {children}
    </div>
  );
}
