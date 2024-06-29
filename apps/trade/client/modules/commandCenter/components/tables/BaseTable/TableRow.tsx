import { Row, RowData, flexRender } from '@tanstack/react-table';
import { mergeClassNames } from '@vertex-protocol/web-common';
import { BaseRow } from 'client/modules/commandCenter/components/tables/BaseTable/BaseRow';

interface Props<TData extends RowData> {
  row: Row<TData>;
  tableId: string;
  onSelect: (row: Row<TData>) => void;
}

export function TableRow<TData extends RowData>({
  row,
  tableId,
  onSelect,
}: Props<TData>) {
  return (
    <BaseRow onSelect={() => onSelect(row)} id={`${tableId}-${row.id}`}>
      {row.getVisibleCells().map((cell) => {
        return (
          <div
            key={cell.id}
            className={mergeClassNames(
              'flex items-center',
              cell.column.columnDef.meta?.cellContainerClassName,
            )}
          >
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </div>
        );
      })}
    </BaseRow>
  );
}
