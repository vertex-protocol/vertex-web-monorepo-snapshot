import { RowData } from '@tanstack/react-table';
import { CellContext } from '@tanstack/table-core/build/lib/core/cell';
import { ColumnDefTemplate } from '@tanstack/table-core/build/lib/types';

declare module '@tanstack/table-core' {
  interface ColumnMeta<TData extends RowData, TValue> {
    cellContainerClassName?: string;
    expandedCell?: ColumnDefTemplate<CellContext<TData, TValue>>;
  }
}
