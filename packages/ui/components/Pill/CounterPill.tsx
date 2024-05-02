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
        'bg-surface-1 text-3xs text-text-tertiary px-1.5 py-0.5',
        'whitespace-nowrap rounded',
        className,
      )}
    >
      {children}
    </div>
  );
}
