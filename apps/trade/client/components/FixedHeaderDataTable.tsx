'use client';

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  Row,
  SortingState,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import {
  Button,
  getStateOverlayClassNames,
  ScrollShadowsContainer,
} from '@vertex-protocol/web-ui';
import { SpinnerContainer } from 'client/components/SpinnerContainer';
import Link from 'next/link';
import { ReactNode, useMemo, useState } from 'react';

/**
 * Props interface for FixedHeaderDataTable<TData>.
 */
interface Props<TData> extends WithClassnames {
  /**
   * The columns to render in the table.
   */
  columns: ColumnDef<TData, any>[];

  /**
   * The data to render in the table.
   */
  data: TData[] | undefined;

  /**
   * The initial sorting state of the table.
   */
  initialSortingState?: SortingState;

  /**
   * Whether the table is currently loading.
   */
  isLoading?: boolean;

  /**
   * The empty state to render in place of table body when there is no data.
   */
  emptyState?: ReactNode;

  /**
   * A callback to get the href for a row.
   * If set and it returns a string, the row will be rendered as Link.
   *
   * @param {Row<TData>} row The row that is rendered.
   */
  rowAsLinkHref?: (row: Row<TData>) => string | undefined;

  /**
   * The callback to call when a row is clicked.
   *
   * @param {Row<TData>} row The row that was clicked.
   */
  onRowClick?: (row: Row<TData>) => void;

  /**
   * The class name to apply to the table header.
   */
  headerClassName?: string;

  /**
   * The class name to apply to the scroll container for the table body.
   */
  scrollContainerClassName?: string;

  /**
   * The class name to apply to each row container.
   */
  rowClassName?: string;
}

/**
 * FixedHeaderDataTable renders a table with a fixed header and scrollable body.
 * @param {Props<TData>} props
 * @returns
 */
export function FixedHeaderDataTable<TData>({
  columns,
  data,
  initialSortingState,
  isLoading,
  emptyState,
  rowAsLinkHref,
  onRowClick,
  className,
  headerClassName,
  scrollContainerClassName,
  rowClassName,
}: Props<TData>) {
  const [sorting, setSorting] = useState<SortingState>(
    initialSortingState ?? [],
  );

  const tableOptions = useMemo(
    (): TableOptions<TData> => ({
      data: data ?? [],
      columns,
      state: { sorting },
      onSortingChange: setSorting,
      getCoreRowModel: getCoreRowModel(),
      getSortedRowModel: getSortedRowModel(),
    }),
    [columns, data, sorting],
  );
  const table = useReactTable<TData>(tableOptions);
  const headerGroup = table.getHeaderGroups()[0];
  const rows = table.getRowModel().rows;

  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'sm',
  });

  const tableHeader = (
    <div className={joinClassNames('flex', headerClassName)}>
      {headerGroup.headers.map((header) => (
        <div
          key={header.id}
          className={header.column.columnDef.meta?.cellContainerClassName}
        >
          {flexRender(header.column.columnDef.header, header.getContext())}
        </div>
      ))}
    </div>
  );

  const tableBody = (() => {
    if (isLoading) {
      return <SpinnerContainer />;
    }

    if (rows.length === 0 && emptyState) {
      return emptyState;
    }

    return (
      <ScrollShadowsContainer
        className={joinClassNames('flex flex-col', scrollContainerClassName)}
      >
        {rows.map((row) => {
          const rowHref = rowAsLinkHref?.(row);
          const isRowAsLink = !!rowHref;
          const isRowClickable = isRowAsLink || onRowClick;

          return (
            <Button
              key={row.id}
              as={isRowAsLink ? Link : 'div'}
              href={isRowAsLink ? rowHref : ''}
              onClick={() => {
                onRowClick?.(row);
              }}
              className={joinClassNames(
                'flex',
                hoverStateOverlayClassNames,
                isRowClickable ? 'cursor-pointer' : '',
                rowClassName,
              )}
            >
              {row.getVisibleCells().map((cell) => (
                <div
                  key={cell.id}
                  className={cell.column.columnDef.meta?.cellContainerClassName}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </div>
              ))}
            </Button>
          );
        })}
      </ScrollShadowsContainer>
    );
  })();

  return (
    <div
      className={joinClassNames('flex flex-col overflow-y-hidden', className)}
    >
      {tableHeader}
      {tableBody}
    </div>
  );
}
