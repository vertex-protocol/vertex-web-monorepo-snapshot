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
import { DateTimeCell } from 'client/modules/tables/cells/DateTimeCell';
import { MarketInfoWithSideCell } from 'client/modules/tables/cells/MarketInfoWithSideCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import { MarketFilter } from 'client/types/MarketFilter';
import { getMarketSizeFormatSpecifier } from 'client/utils/formatNumber/getMarketSizeFormatSpecifier';
import { useMemo } from 'react';
import { useDialog } from '../app/dialogs/hooks/useDialog';
import { AmountWithSymbolCell } from './cells/AmountWithSymbolCell';
import { PerpStackedPnlCell } from './cells/PerpStackedPnlCell';
import { useRealizedPnlEventsTable } from './hooks/useRealizedPnlEventsTable';
import { RealizedPnlEventItem } from './types/RealizedPnlEventItem';
import { getTableButtonOnClickHandler } from './utils/getTableButtonOnClickHandler';

const columnHelper = createColumnHelper<RealizedPnlEventItem>();

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

  const columns: ColumnDef<RealizedPnlEventItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('timestampMillis', {
        header: ({ header }) => <HeaderCell header={header}>Time</HeaderCell>,
        cell: (context) => (
          <DateTimeCell timestampMillis={context.getValue()} />
        ),
        sortingFn: 'basic',
        meta: {
          cellContainerClassName: 'w-28',
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
              formatSpecifier={getMarketSizeFormatSpecifier(
                context.row.original.marketInfo.sizeIncrement,
              )}
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
            context.getValue<RealizedPnlEventItem['pnlInfo']>();
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
                size="md"
                className="w-full"
                startIcon={<Icons.RiShareForwardFill size={12} />}
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

  const onRowClicked = (row: Row<RealizedPnlEventItem>) => {
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