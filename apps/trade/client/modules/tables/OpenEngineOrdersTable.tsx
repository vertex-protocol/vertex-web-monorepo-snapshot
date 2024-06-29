import { createColumnHelper, Row } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import { WithClassnames } from '@vertex-protocol/web-common';
import {
  getMarketPriceFormatSpecifier,
  getMarketQuoteSizeFormatSpecifier,
  useEVMContext,
} from '@vertex-protocol/react-client';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { useIsDesktop } from 'client/hooks/ui/breakpoints';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { AmountFilledCell } from 'client/modules/tables/cells/AmountFilledCell';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';
import { CancelAllOrdersHeaderCell } from './cells/CancelAllOrdersHeaderCell';
import { CancelOrderCell } from './cells/CancelOrderCell';
import { OrderTypeCell } from './cells/OrderTypeCell';
import {
  OpenEngineOrderTableItem,
  useOpenEngineOrdersTable,
} from './hooks/useOpenEngineOrdersTable';

interface Props {
  marketFilter?: MarketFilter;
  hasBackground?: boolean;
  // If not given, shows all
  pageSize?: number;
}

const columnHelper = createColumnHelper<OpenEngineOrderTableItem>();

export function OpenEngineOrdersTable({
  className,
  marketFilter,
  pageSize,
  hasBackground,
}: WithClassnames<Props>) {
  const { data, isLoading } = useOpenEngineOrdersTable(marketFilter);

  const isDesktop = useIsDesktop();
  const { show } = useDialog();
  const pushTradePage = usePushTradePage();
  const { connectionStatus } = useEVMContext();
  const isConnected = connectionStatus.type === 'connected';

  const columns: ColumnDef<OpenEngineOrderTableItem, any>[] = useMemo(() => {
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
      columnHelper.accessor('price', {
        header: ({ header }) => (
          <HeaderCell
            definitionTooltipId="openEngineOrdersLimitPrice"
            header={header}
          >
            Price
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
          cellContainerClassName: 'w-28',
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
      columnHelper.accessor('totalCost', {
        header: ({ header }) => <HeaderCell header={header}>Total</HeaderCell>,
        cell: (context) => (
          <AmountWithSymbolCell
            amount={context.getValue()}
            symbol={context.row.original.marketInfo.quoteSymbol}
            formatSpecifier={getMarketQuoteSizeFormatSpecifier(
              context.row.original.marketInfo.isPrimaryQuote,
            )}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),
      columnHelper.accessor('filled', {
        header: ({ header }) => <HeaderCell header={header}>Filled</HeaderCell>,
        cell: (context) => {
          const filled = context.getValue();
          const symbol = context.row.original.marketInfo.symbol;

          return (
            <AmountFilledCell
              amountFilled={filled.amount}
              fractionFilled={filled.fraction}
              symbol={symbol}
              amountFormatSpecifier={context.row.original.sizeFormatSpecifier}
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('amount'),
        meta: {
          cellContainerClassName: 'w-32',
        },
      }),

      columnHelper.accessor('unfilled', {
        header: ({ header }) => (
          <HeaderCell header={header}>Unfilled</HeaderCell>
        ),
        cell: (context) => {
          const filled = context.getValue();
          const symbol = context.row.original.marketInfo.symbol;

          return (
            <AmountWithSymbolCell
              amount={filled.amount}
              symbol={symbol}
              formatSpecifier={context.row.original.sizeFormatSpecifier}
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('amount'),
        meta: {
          cellContainerClassName: 'w-28 grow',
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: ({ header }) => (
          <CancelAllOrdersHeaderCell
            header={header}
            ordersFilter={{ ...marketFilter, isTrigger: false }}
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
                isTrigger: false,
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

  const onRowClicked = (row: Row<OpenEngineOrderTableItem>) => {
    if (isDesktop || !isConnected) {
      pushTradePage({
        productId: row.original.productId,
      });
    } else {
      show({
        type: 'open_engine_order_details',
        params: row.original,
      });
    }
  };

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      emptyState={<EmptyTablePlaceholder type="open_limit_orders" />}
      tableContainerClassName={className}
      hasBackground={hasBackground}
      autoPaginationPageSize={pageSize}
      onRowClicked={onRowClicked}
    />
  );
}
