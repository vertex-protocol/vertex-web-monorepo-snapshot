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
        // Same left padding as a standard `TableCell`
        'h-full w-full select-none py-5 pl-4',
        'text-text-tertiary text-sm',
        className,
      )}
    >
      {children}
    </div>
  );
}
