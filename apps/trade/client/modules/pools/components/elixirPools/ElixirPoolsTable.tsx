import { createColumnHelper } from '@tanstack/react-table';
import { ColumnDef } from '@tanstack/table-core';
import { DataTable } from 'client/components/DataTable/DataTable';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { TableCell } from 'client/components/DataTable/cells/TableCell';
import { LinkButton } from 'client/components/LinkButton';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import {
  ElixirMarketTableItem,
  useElixirPoolsTable,
} from 'client/modules/pools/hooks/useElixirPoolsTable';
import { getElixirProductLink } from 'client/modules/pools/utils/getElixirProductLink';
import { PercentageCell } from 'client/modules/tables/cells/PercentageCell';
import { ProductInfoCell } from 'client/modules/tables/cells/ProductInfoCell';
import { TitleHeaderCell } from 'client/modules/tables/cells/TitleHeaderCell';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import Link from 'next/link';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<ElixirMarketTableItem>();

export function ElixirPoolsTable() {
  const { primaryQuoteToken } = useVertexMetadataContext();
  const { data, isLoading } = useElixirPoolsTable();

  const columns: ColumnDef<ElixirMarketTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('metadata', {
        header: ({ header }) => (
          <TitleHeaderCell header={header}>Elixir Pools</TitleHeaderCell>
        ),
        cell: (context) => {
          const value = context.getValue();
          return (
            <ProductInfoCell
              symbol={value.marketName}
              iconSrc={value.icon.asset}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
      columnHelper.accessor('poolApy', {
        header: ({ header }) => (
          <HeaderCell header={header}>Est. APY</HeaderCell>
        ),
        cell: (context) => {
          return (
            <PercentageCell
              formatSpecifier={PresetNumberFormatSpecifier.PERCENTAGE_2DP}
              fraction={context.getValue()}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.display({
        id: 'deposits',
        header: ({ header }) => (
          <HeaderCell header={header}>Deposits Accepted</HeaderCell>
        ),
        cell: () => {
          return <TableCell>{primaryQuoteToken.symbol}</TableCell>;
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-52 grow',
        },
      }),
      columnHelper.display({
        id: 'actions',
        header: () => null,
        cell: (context) => {
          const productId = context.row.original.productId;

          return (
            <TableCell>
              <LinkButton
                color="white"
                className="pointer-events-auto"
                as={Link}
                href={getElixirProductLink(productId)}
                external
                withExternalIcon
              >
                Open Pool on Elixir
              </LinkButton>
            </TableCell>
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40',
        },
      }),
    ];
  }, [primaryQuoteToken.symbol]);

  return (
    <DataTable
      columns={columns}
      data={data}
      isLoading={isLoading}
      hasBackground
    />
  );
}
