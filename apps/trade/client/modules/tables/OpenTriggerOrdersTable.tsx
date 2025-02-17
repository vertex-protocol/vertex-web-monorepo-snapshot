import { createColumnHelper, Row } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import { WithClassnames } from '@vertex-protocol/web-common';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { useIsDesktop } from 'client/hooks/ui/breakpoints';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { CancelAllOrdersHeaderCell } from 'client/modules/tables/cells/CancelAllOrdersHeaderCell';
import { CancelOrderCell } from 'client/modules/tables/cells/CancelOrderCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { OrderTypeCell } from 'client/modules/tables/cells/OrderTypeCell';
import { TriggerOrderAmountWithSymbolCell } from 'client/modules/tables/cells/TriggerOrderAmountWithSymbolCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import {
  OpenTriggerOrderTableItem,
  useOpenTriggerOrdersTable,
} from 'client/modules/tables/hooks/useOpenTriggerOrdersTable';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';

interface Props {
  marketFilter?: MarketFilter;
  hasBackground?: boolean;
  // If not given, shows all
  pageSize?: number;
}

const columnHelper = createColumnHelper<OpenTriggerOrderTableItem>();

export function OpenTriggerOrdersTable({
  className,
  marketFilter,
  pageSize,
  hasBackground,
}: WithClassnames<Props>) {
  const { data, isLoading } = useOpenTriggerOrdersTable(marketFilter);

  const isDesktop = useIsDesktop();
  const { show } = useDialog();
  const pushTradePage = usePushTradePage();
  const isConnected = useIsConnected();

  const columns: ColumnDef<OpenTriggerOrderTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('timePlacedMillis', {
        header: ({ header }) => <HeaderCell header={header}>Time</HeaderCell>,
        cell: (context) => (
          <DateTimeCell timestampMillis={context.getValue()} />
        ),
        sortingFn: 'basic',
        meta: {
          cellContainerClassName: 'w-32',
          withLeftPadding: true,
        },
      }),
      columnHelper.accessor('orderType', {
        header: ({ header }) => <HeaderCell header={header}>Type</HeaderCell>,
        cell: (context) => {
          return (
            <OrderTypeCell
              marginModeType={context.row.original.marginModeType}
              orderType={context.getValue()}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('marketInfo', {
        header: ({ header }) => (
          <HeaderCell header={header}>Market / Action</HeaderCell>
        ),
        cell: (context) => (
          <MarketInfoWithSideCell
            alwaysShowOrderDirection
            marketInfo={context.getValue()}
          />
        ),
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('triggerPrice', {
        header: ({ header }) => (
          <HeaderCell definitionTooltipId="triggerPrice" header={header}>
            Trigger Price
          </HeaderCell>
        ),
        cell: (context) => (
          <NumberCell
            value={context.getValue()}
            formatSpecifier={context.row.original.priceFormatSpecifier}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('totalSize', {
        header: ({ header }) => <HeaderCell header={header}>Amount</HeaderCell>,
        cell: (context) => (
          <TriggerOrderAmountWithSymbolCell
            amount={context.getValue()}
            symbol={context.row.original.marketInfo.symbol}
            formatSpecifier={context.row.original.sizeFormatSpecifier}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('orderPrice', {
        header: ({ header }) => (
          <HeaderCell
            definitionTooltipId="triggerOrderLimitPrice"
            header={header}
          >
            Limit Price
          </HeaderCell>
        ),
        cell: (context) => (
          <NumberCell
            className="text-text-secondary"
            value={context.getValue()}
            formatSpecifier={context.row.original.priceFormatSpecifier}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-32 grow',
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: ({ header }) => (
          <CancelAllOrdersHeaderCell
            header={header}
            ordersFilter={{ ...marketFilter, isTrigger: true }}
          />
        ),
        cell: (context) => {
          const { orderForCancellation } = context.row.original;
          return (
            <CancelOrderCell
              order={orderForCancellation}
              // Provide a key to force a unique render. Without this, React will somehow perserve the success state on previously cancelled order rows
              key={orderForCancellation.digest}
            />
          );
        },
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
    ];
  }, [marketFilter]);

  const onRowClicked = (row: Row<OpenTriggerOrderTableItem>) => {
    if (isDesktop || !isConnected) {
      pushTradePage({
        productId: row.original.productId,
      });
    } else {
      show({
        type: 'open_trigger_order_details',
        params: row.original,
      });
    }
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyState={<EmptyTablePlaceholder type="open_trigger_orders" />}
      tableContainerClassName={className}
      hasBackground={hasBackground}
      autoPaginationPageSize={pageSize}
      onRowClicked={onRowClicked}
    />
  );
}
