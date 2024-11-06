import { flexRender, HeaderGroup, RowData } from '@tanstack/react-table';
import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { COMMON_TRANSPARENCY_COLORS } from '@vertex-protocol/web-ui';

export function DataTableHeaderGroup<TData extends RowData>({
  headerGroup,
  className,
}: WithClassnames<{
  headerGroup: HeaderGroup<TData>;
}>) {
  return (
    <div
      className={mergeClassNames(
        'flex h-11 items-stretch border-b',
        COMMON_TRANSPARENCY_COLORS.border,
        className,
      )}
      key={headerGroup.id}
    >
      {headerGroup.headers.map((header) => {
        if (header.isPlaceholder) {
          return null;
        }
        const withLeftPadding = header.column.columnDef.meta?.withLeftPadding;
        return (
          <div
            key={header.id}
            className={mergeClassNames(
              header.column.columnDef.meta?.cellContainerClassName,
              withLeftPadding && 'pl-4',
            )}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
        );
      })}
    </div>
  );
}
