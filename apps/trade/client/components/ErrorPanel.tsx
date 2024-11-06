import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';

export function ErrorPanel({
  children,
  className,
}: WithChildren<WithClassnames>) {
  return (
    <div
      className={mergeClassNames(
        'flex flex-col items-start gap-y-1.5',
        'rounded px-3 py-2',
        'text-text-secondary text-xs',
        'bg-negative-muted',
        className,
      )}
    >
      {children}
    </div>
  );
}
