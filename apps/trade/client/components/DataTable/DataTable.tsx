import {
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  OnChangeFn,
  SortingState,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';
import {
  ColumnDef,
  PaginationState,
  Row,
  TableOptions,
} from '@tanstack/table-core';
import { joinClassNames, mergeClassNames } from '@vertex-protocol/web-common';
import { CARD_CLASSNAMES, Spinner } from '@vertex-protocol/web-ui';
import { ReactNode, useMemo, useState } from 'react';
import { DataTableHeaderGroup } from './components/DataTableHeaderGroup';
import { DataTableRowGroup } from './components/DataTableRowGroup';
import { Pagination } from './Pagination';

// General
export type DataTableProps<TData> = {
  // Base props
  columns: ColumnDef<TData, any>[];
  isLoading?: boolean;
  hasBackground?: boolean;
  emptyState?: ReactNode;
  data?: TData[];
  columnVisibility?: VisibilityState;
  onRowClicked?: (row: Row<TData>) => void;

  // Auto pagination - if this is set, the table will automatically paginate based on the given page size
  autoPaginationPageSize?: number;
  // Manual pagination, these props must be set together
  paginationState?: PaginationState;
  setPaginationState?: OnChangeFn<PaginationState>;
  pageCount?: number; // -1 if unknown

  // Styling
  tableContainerClassName?: string;
  tableClassName?: string;
  headerRowClassName?: string;
  // A utility flag to adapt height of a row to the content with a standard vertical padding, used for expandable tables
  fitDataRowHeight?: boolean;
  dataRowContainerClassName?: string;
  dataRowClassName?: string;
};

type DataTableState = 'empty' | 'loading' | 'filled';

export function DataTable<TData>({
  columns,
  isLoading,
  data,
  emptyState,
  columnVisibility,
  onRowClicked,
  paginationState: manualPaginationState,
  setPaginationState: setManualPaginationState,
  autoPaginationPageSize,
  pageCount,
  tableClassName,
  hasBackground,
  tableContainerClassName,
  headerRowClassName,
  fitDataRowHeight,
  dataRowContainerClassName,
  dataRowClassName,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const isAutoPaginated = autoPaginationPageSize != null;
  const isManuallyPaginated =
    manualPaginationState != null && setManualPaginationState != null;
  const isPaginated = isManuallyPaginated || isAutoPaginated;
  const [autoPaginationState, setAutoPaginationState] =
    useState<PaginationState>({
      pageIndex: 0,
      pageSize: autoPaginationPageSize ?? 0,
    });
  const { paginationState, setPaginationState } = (() => {
    if (!isPaginated || !data) {
      return {
        paginationState: undefined,
        setPaginationState: undefined,
      };
    }
    if (isManuallyPaginated) {
      return {
        paginationState: manualPaginationState,
        setPaginationState: setManualPaginationState,
      };
    } else {
      return {
        paginationState: autoPaginationState,
        setPaginationState: setAutoPaginationState,
      };
    }
  })();

  const tableOptions = useMemo((): TableOptions<TData> => {
    return {
      data: data ?? [],
      columns,
      state: {
        sorting,
        columnVisibility,
        pagination: paginationState,
      },
      pageCount: pageCount,
      onPaginationChange: setPaginationState,
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
      // Prevents pagination from resetting to page 0 when data updates
      autoResetPageIndex: isAutoPaginated ? false : undefined,
      getPaginationRowModel: isAutoPaginated
        ? getPaginationRowModel()
        : undefined,
      manualPagination: isManuallyPaginated,
    };
  }, [
    columnVisibility,
    columns,
    data,
    isAutoPaginated,
    isManuallyPaginated,
    pageCount,
    paginationState,
    setPaginationState,
    sorting,
  ]);
  const table = useReactTable<TData>(tableOptions);

  const tableState: DataTableState = useMemo(() => {
    if (isLoading) {
      return 'loading';
    } else if (data?.length) {
      return 'filled';
    }
    return 'empty';
  }, [data?.length, isLoading]);

  const content = (() => {
    if (tableState === 'loading') {
      return (
        <div className="flex h-full w-full items-center justify-center py-16">
          <Spinner className="text-text-tertiary w-10" />
        </div>
      );
    }

    return (
      <div
        className={joinClassNames(
          // Allow horizontal overflow
          'overflow-x-auto overflow-y-hidden',
        )}
      >
        {/*Inner container to allow overflow, which enables x scrolling*/}
        <div className="flex h-full w-full min-w-max flex-col">
          {table.getHeaderGroups().map((headerGroup) => (
            <DataTableHeaderGroup
              headerGroup={headerGroup}
              key={headerGroup.id}
              className={mergeClassNames('min-w-full', headerRowClassName)}
            />
          ))}
          {/* Container needed to programmatically remove the top border of the first row */}
          <div className={dataRowContainerClassName}>
            {table.getRowModel().rows.map((row) => (
              <DataTableRowGroup
                row={row}
                key={row.id}
                className={mergeClassNames('min-w-full', dataRowClassName)}
                onClick={onRowClicked}
                fitHeight={fitDataRowHeight}
              />
            ))}
          </div>
        </div>
      </div>
    );
  })();

  // `paginationState` is naturally undefined when pagination is disabled. Additionally, without this check,
  // table.getState().pagination will throw because pagination is undefined.
  const showPagination = !!paginationState && data && data.length > 0;

  return (
    <div className={tableContainerClassName}>
      {/* Table */}
      <div
        className={mergeClassNames(
          hasBackground && [CARD_CLASSNAMES, 'overflow-hidden'],
          tableClassName,
        )}
      >
        {content}
        {tableState === 'empty' && emptyState}
      </div>
      {/*Pagination*/}
      {showPagination && (
        <div className="flex w-full justify-center pt-6 lg:justify-end">
          <Pagination
            pageIndex={table.getState().pagination.pageIndex}
            canPreviousPage={table.getCanPreviousPage()}
            canNextPage={table.getCanNextPage()}
            previousPage={table.previousPage}
            nextPage={table.nextPage}
          />
        </div>
      )}
    </div>
  );
}
