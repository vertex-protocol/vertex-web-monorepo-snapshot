import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';

export function CounterPill({
  children,
  className,
}: WithClassnames<WithChildren>) {
  return (
    <div
      className={mergeClassNames(
        'bg-surface-3 text-3xs text-text-primary px-1.5 py-0.5',
        'rounded-sm whitespace-nowrap',
        className,
      )}
    >
      {children}
    </div>
  );
}
