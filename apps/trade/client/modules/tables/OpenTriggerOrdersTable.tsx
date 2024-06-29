import { createColumnHelper, Row } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import { WithClassnames } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/react-client';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { useIsDesktop } from 'client/hooks/ui/breakpoints';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { MarketFilter } from 'client/types/MarketFilter';
import { getMarketPriceFormatSpecifier } from '@vertex-protocol/react-client';
import { useMemo } from 'react';
import { CancelAllOrdersHeaderCell } from './cells/CancelAllOrdersHeaderCell';
import { CancelOrderCell } from './cells/CancelOrderCell';
import { OrderTypeCell } from './cells/OrderTypeCell';
import {
  OpenTriggerOrderTableItem,
  useOpenTriggerOrdersTable,
} from './hooks/useOpenTriggerOrdersTable';

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
  const { connectionStatus } = useEVMContext();
  const isConnected = connectionStatus.type === 'connected';

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
        cell: (context) => <OrderTypeCell value={context.getValue()} />,
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
            formatSpecifier={getMarketPriceFormatSpecifier(
              context.row.original.marketInfo.priceIncrement,
            )}
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
          <AmountWithSymbolCell
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
            formatSpecifier={getMarketPriceFormatSpecifier(
              context.row.original.marketInfo.priceIncrement,
            )}
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
          const { productId, digest, totalAmount, orderType } =
            context.row.original;
          return (
            <CancelOrderCell
              order={{
                productId,
                digest,
                totalAmount,
                isTrigger: true,
                orderType,
              }}
              // Provide a key to force a unique render. Without this, React will somehow perserve the success state on previously cancelled order rows
              key={digest}
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
