import { createColumnHelper, Row } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import { WithClassnames } from '@vertex-protocol/web-common';
import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { DataTable } from 'client/components/DataTable/DataTable';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { useIsDesktop } from 'client/hooks/ui/breakpoints';
import { usePushTradePage } from 'client/hooks/ui/navigation/usePushTradePage';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { MarginModeTypeCell } from 'client/modules/tables/cells/MarginModeTypeCell';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { PerpStackedPnlCell } from 'client/modules/tables/cells/PerpStackedPnlCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { useRealizedPnlEventsTable } from 'client/modules/tables/hooks/useRealizedPnlEventsTable';
import { RealizedPnlEventsTableItem } from 'client/modules/tables/types/RealizedPnlEventsTableItem';
import { getTableButtonOnClickHandler } from 'client/modules/tables/utils/getTableButtonOnClickHandler';
import { MarketFilter } from 'client/types/MarketFilter';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<RealizedPnlEventsTableItem>();

interface Props {
  marketFilter: MarketFilter | undefined;
  pageSize: number;
  showPagination?: boolean;
  hasBackground?: boolean;
}

export function PaginatedRealizedPnlEventsTable({
  pageSize,
  showPagination,
  hasBackground,
  marketFilter,
}: WithClassnames<Props>) {
  const {
    mappedData,
    pageCount,
    paginationState,
    setPaginationState,
    isLoading,
  } = useRealizedPnlEventsTable({
    pageSize,
    enablePagination: !!showPagination,
    marketFilter,
  });

  const pushTradePage = usePushTradePage();

  const { show } = useDialog();

  const isDesktop = useIsDesktop();

  const columns: ColumnDef<RealizedPnlEventsTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('timestampMillis', {
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
      columnHelper.accessor('marketInfo', {
        header: ({ header }) => (
          <HeaderCell header={header}>Position</HeaderCell>
        ),
        cell: (context) => (
          <MarketInfoWithSideCell
            marketInfo={context.getValue()}
            alwaysShowOrderDirection={false}
          />
        ),
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('marginModeType', {
        header: ({ header }) => <HeaderCell header={header}>Type</HeaderCell>,
        cell: (context) => (
          <MarginModeTypeCell marginModeType={context.getValue()} />
        ),
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-20',
        },
      }),
      columnHelper.accessor('entryPrice', {
        header: ({ header }) => (
          <HeaderCell definitionTooltipId="averageEntryPrice" header={header}>
            Entry Price
          </HeaderCell>
        ),
        cell: (context) => {
          return (
            <NumberCell
              value={context.getValue()}
              formatSpecifier={context.row.original.marketPriceFormatSpecifier}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('exitPrice', {
        header: ({ header }) => (
          <HeaderCell definitionTooltipId="realizedPnl" header={header}>
            Exit Price
          </HeaderCell>
        ),
        cell: (context) => {
          return (
            <NumberCell
              value={context.getValue()}
              formatSpecifier={context.row.original.marketPriceFormatSpecifier}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('filledAmountAbs', {
        header: ({ header }) => (
          <HeaderCell
            definitionTooltipId="realizedPnlPositionSize"
            header={header}
          >
            Size
          </HeaderCell>
        ),
        cell: (context) => {
          return (
            <AmountWithSymbolCell
              amount={context.getValue()}
              symbol={context.row.original.marketInfo.symbol}
              formatSpecifier={context.row.original.marketSizeFormatSpecifier}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.accessor('pnlInfo', {
        header: ({ header }) => (
          <HeaderCell definitionTooltipId="realizedPnl" header={header}>
            PnL
          </HeaderCell>
        ),
        cell: (context) => {
          const { realizedPnlFrac, realizedPnlUsd } =
            context.getValue<RealizedPnlEventsTableItem['pnlInfo']>();
          return (
            <PerpStackedPnlCell
              pnlFrac={realizedPnlFrac}
              pnl={realizedPnlUsd}
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('realizedPnlUsd'),
        meta: {
          cellContainerClassName: 'w-32 grow',
        },
      }),
      columnHelper.display({
        id: 'share',
        header: ({ header }) => <HeaderCell header={header} />,
        cell: (context) => {
          const { marketInfo, pnlInfo, entryPrice, exitPrice } =
            context.row.original;

          const { realizedPnlFrac } = pnlInfo;

          return (
            <TableCell className="pointer-events-auto px-4">
              <SecondaryButton
                size="sm"
                className="w-full"
                startIcon={<Icons.ShareFatFill size={12} />}
                onClick={getTableButtonOnClickHandler(() => {
                  show({
                    type: 'perp_pnl_social_sharing',
                    params: {
                      marketInfo,
                      entryPrice,
                      referencePrice: exitPrice,
                      pnlFrac: realizedPnlFrac,
                      isRealized: true,
                    },
                  });
                })}
              >
                Share
              </SecondaryButton>
            </TableCell>
          );
        },
        meta: {
          cellContainerClassName: 'w-36',
        },
      }),
    ];
  }, [show]);

  const onRowClicked = (row: Row<RealizedPnlEventsTableItem>) => {
    if (isDesktop) {
      pushTradePage({
        productId: row.original.productId,
      });
    } else {
      show({
        type: 'realized_pnl_details',
        params: row.original,
      });
    }
  };

  return (
    <DataTable
      columns={columns}
      data={mappedData}
      isLoading={isLoading}
      emptyState={<EmptyTablePlaceholder type="realized_pnl_history" />}
      onRowClicked={onRowClicked}
      paginationState={showPagination ? paginationState : undefined}
      setPaginationState={showPagination ? setPaginationState : undefined}
      pageCount={showPagination ? pageCount : 1}
      hasBackground={hasBackground}
    />
  );
}
