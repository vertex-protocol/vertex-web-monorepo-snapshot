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
        'text-negative rounded p-2 text-xs',
        'bg-negative-muted',
        className,
      )}
    >
      {children}
    </div>
  );
}
