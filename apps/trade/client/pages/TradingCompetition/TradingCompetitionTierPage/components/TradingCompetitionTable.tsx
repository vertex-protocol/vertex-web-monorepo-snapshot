import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import {
  CustomNumberFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { SeparatedRowDataTable } from 'client/components/DataTable/SeparatedRowDataTable';
import { AddressCell } from 'client/modules/tables/cells/AddressCell';
import { AmountWithSymbolCell } from 'client/modules/tables/cells/AmountWithSymbolCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { PercentageChangeCell } from 'client/modules/tables/cells/PercentageChangeCell';
import { PnlCell } from 'client/modules/tables/cells/PnlCell';
import { RankCell } from 'client/modules/tables/cells/RankCell';
import { EmptyTablePlaceholder } from 'client/modules/tables/EmptyTablePlaceholder';
import {
  TradingCompetitionTableItem,
  useTradingCompetitionTable,
} from 'client/pages/TradingCompetition/hooks/useTradingCompetitionTable';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<TradingCompetitionTableItem>();

export function TradingCompetitionTable({ className }: WithClassnames) {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const {
    participants,
    isLoading,
    pageCount,
    paginationState,
    setPaginationState,
  } = useTradingCompetitionTable();

  const columns: ColumnDef<TradingCompetitionTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('rankingData', {
        header: ({ header }) => <HeaderCell header={header}>Rank</HeaderCell>,
        cell: (context) => {
          const { rank, iconSrc } =
            context.getValue<TradingCompetitionTableItem['rankingData']>();

          return <RankCell rank={rank} iconSrc={iconSrc} />;
        },
        meta: {
          cellContainerClassName: 'w-24',
          withLeftPadding: true,
        },
        enableSorting: false,
      }),
      columnHelper.accessor('subaccountOwner', {
        header: ({ header }) => (
          <HeaderCell header={header}>Account</HeaderCell>
        ),
        cell: (context) => (
          <AddressCell
            address={context.getValue<
              TradingCompetitionTableItem['subaccountOwner']
            >()}
          />
        ),
        meta: {
          cellContainerClassName: 'w-32',
        },
        enableSorting: false,
      }),
      columnHelper.accessor('accountSizeUsd', {
        header: ({ header }) => (
          <HeaderCell header={header}>Account Size</HeaderCell>
        ),
        cell: (context) => (
          <NumberCell
            value={context.getValue<
              TradingCompetitionTableItem['accountSizeUsd']
            >()}
            formatSpecifier={PresetNumberFormatSpecifier.CURRENCY_2DP}
          />
        ),
        meta: {
          cellContainerClassName: 'w-40',
        },
        enableSorting: false,
      }),
      columnHelper.accessor('volumePrimaryQuote', {
        header: ({ header }) => (
          <HeaderCell
            header={header}
            definitionTooltipId="tradingCompetitionTableVolume"
          >
            Volume
          </HeaderCell>
        ),
        cell: (context) => (
          <AmountWithSymbolCell
            amount={context.getValue<
              TradingCompetitionTableItem['volumePrimaryQuote']
            >()}
            formatSpecifier={
              CustomNumberFormatSpecifier.NUMBER_LARGE_ABBREVIATED
            }
            symbol={primaryQuoteToken.symbol}
          />
        ),
        meta: {
          cellContainerClassName: 'w-32',
        },
        enableSorting: false,
      }),
      columnHelper.accessor('percentRoi', {
        header: ({ header }) => <HeaderCell header={header}>% ROI</HeaderCell>,
        cell: (context) => (
          <PercentageChangeCell
            value={context.getValue<
              TradingCompetitionTableItem['percentRoi']
            >()}
          />
        ),
        meta: {
          cellContainerClassName: 'w-32',
        },
        enableSorting: false,
      }),
      columnHelper.accessor('pnlUsd', {
        header: ({ header }) => <HeaderCell header={header}>PnL</HeaderCell>,
        cell: (context) => (
          <PnlCell
            value={context.getValue<TradingCompetitionTableItem['pnlUsd']>()}
          />
        ),
        meta: {
          cellContainerClassName: 'w-32',
        },
        enableSorting: false,
      }),
      columnHelper.accessor('prize', {
        header: ({ header }) => (
          <HeaderCell header={header}>💰 Prize</HeaderCell>
        ),
        cell: (context) => {
          const prize =
            context.getValue<TradingCompetitionTableItem['prize']>();

          if (!prize) return null;

          // Extra padding so there's space between the cell and table's edge on small screens.
          return <TableCell className="pr-5">{prize}</TableCell>;
        },
        enableSorting: false,
      }),
    ];
  }, [primaryQuoteToken.symbol]);

  return (
    <SeparatedRowDataTable
      columns={columns}
      data={participants}
      isLoading={isLoading}
      emptyState={<EmptyTablePlaceholder type="trading_competition" />}
      tableContainerClassName={className}
      pageCount={pageCount}
      paginationState={paginationState}
      setPaginationState={setPaginationState}
    />
  );
}
