import { flexRender, HeaderGroup, RowData } from '@tanstack/react-table';
import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';

export function DataTableHeaderGroup<TData extends RowData>({
  headerGroup,
  className,
}: WithClassnames<{
  headerGroup: HeaderGroup<TData>;
}>) {
  return (
    <div
      className={mergeClassNames(
        'border-overlay-divider/10 flex h-11 items-stretch border-b',
        className,
      )}
      key={headerGroup.id}
    >
      {headerGroup.headers.map((header) => {
        if (header.isPlaceholder) {
          return null;
        }
        return (
          <div
            key={header.id}
            className={header.column.columnDef.meta?.cellContainerClassName}
          >
            {flexRender(header.column.columnDef.header, header.getContext())}
          </div>
        );
      })}
    </div>
  );
}
