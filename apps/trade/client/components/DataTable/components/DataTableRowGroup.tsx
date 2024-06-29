import { flexRender, Row, RowData } from '@tanstack/react-table';
import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';

interface Props<TData extends RowData> {
  row: Row<TData>;
  onClick?: (row: Row<TData>) => void;
  fitHeight?: boolean;
}

export function DataTableRowGroup<TData extends RowData>({
  row,
  onClick,
  className,
  fitHeight,
}: WithClassnames<Props<TData>>) {
  return (
    <div
      key={row.id}
      className={mergeClassNames(
        onClick && 'hover:bg-surface-1 cursor-pointer',
        'border-overlay-divider/10 bg-surface-card border-t duration-75 first:border-t-0',
        'flex items-stretch',
        // Static height as a default
        !fitHeight && 'h-16',
        // Fits cell content with default padding
        fitHeight && 'h-fit py-3',
        className,
      )}
      onClick={() => {
        onClick?.(row);
      }}
    >
      {row.getVisibleCells().map((cell) => {
        const withLeftPadding = cell.column.columnDef.meta?.withLeftPadding;
        return (
          <div
            key={cell.id}
            className={mergeClassNames(
              cell.column.columnDef.meta?.cellContainerClassName,
              withLeftPadding && 'pl-4',
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        );
      })}
    </div>
  );
}
