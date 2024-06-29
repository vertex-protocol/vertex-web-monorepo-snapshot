import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { Icons } from '@vertex-protocol/web-ui';
import { MarketProductInfoCell } from 'client/components/DataTable/cells/MarketProductInfoCell';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { bigDecimalSortFn } from 'client/components/DataTable/utils/sortingFns';
import { ActionName } from 'client/modules/commandCenter/components/cells/ActionName';
import { BaseTable } from 'client/modules/commandCenter/components/tables/BaseTable/BaseTable';
import { MarketTableItem } from 'client/modules/commandCenter/hooks/useCommandCenterMarketItems';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { signDependentValue } from 'client/utils/signDependentValue';
import { useMemo } from 'react';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';

const columnHelper = createColumnHelper<MarketTableItem>();

interface Props {
  markets: MarketTableItem[] | undefined;
}

export function MarketsTable({ markets }: Props) {
  const columns: ColumnDef<MarketTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('metadata', {
        header: ({ header }) => <HeaderCell header={header}>Market</HeaderCell>,
        cell: (context) => {
          const value = context.getValue<MarketTableItem['metadata']>();
          const { icon } = getBaseProductMetadata(value);

          return (
            <MarketProductInfoCell
              name={value.marketName}
              iconSrc={icon.asset}
              isNewMarket={context.row.original.isNewMarket}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-40 lg:w-56',
        },
      }),
      columnHelper.accessor('currentPrice', {
        header: ({ header }) => <HeaderCell header={header}>Price</HeaderCell>,
        cell: (context) => {
          const { currentPrice, priceChangeFrac24hr } = context.row.original;

          const color = signDependentValue(priceChangeFrac24hr, {
            positive: 'text-positive',
            negative: 'text-negative',
            zero: 'text-text-primary',
          });

          return (
            <StackedTableCell
              className="gap-y-0.5"
              top={formatNumber(currentPrice, {
                formatSpecifier:
                  context.row.original.marketPriceFormatSpecifier,
              })}
              bottom={
                <span className={color}>
                  {formatNumber(context.row.original.priceChangeFrac24hr, {
                    formatSpecifier:
                      PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
                  })}
                </span>
              }
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-24 lg:w-36',
        },
      }),
      columnHelper.accessor('volume24hr', {
        header: ({ header }) => <HeaderCell header={header}>Volume</HeaderCell>,
        cell: (context) => (
          <NumberCell
            value={context.getValue()}
            formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'w-28',
        },
      }),
      columnHelper.display({
        id: 'isFavorited',
        header: () => null,
        cell: (context) => (
          <ActionName>
            {context.row.original.isFavorited && (
              <Icons.BsStarFill className="text-accent" size={12} />
            )}
            <span
              // Need to push this down just a tad to get it optically centered.
              className="relative top-[0.5px]"
            >
              Trade
            </span>
          </ActionName>
        ),
        meta: {
          cellContainerClassName: 'hidden lg:flex ml-auto',
        },
      }),
    ];
  }, []);

  return (
    <BaseTable
      id="markets"
      columns={columns}
      data={markets}
      initialSortingState={[{ id: 'volume24hr', desc: true }]}
      onSelect={(row) => row.original.action()}
    />
  );
}
