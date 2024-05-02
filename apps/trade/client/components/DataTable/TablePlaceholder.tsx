import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';

export function TablePlaceholder({
  children,
  className,
}: WithChildren<WithClassnames>) {
  return (
    <div
      className={mergeClassNames(
        'h-full w-full select-none p-5',
        'text-text-tertiary text-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
