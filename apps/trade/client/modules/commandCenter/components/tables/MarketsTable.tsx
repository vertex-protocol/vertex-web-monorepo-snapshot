import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
  signDependentValue,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { Icons } from '@vertex-protocol/web-ui';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { MarketProductInfoCell } from 'client/components/DataTable/cells/MarketProductInfoCell';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { ActionName } from 'client/modules/commandCenter/components/cells/ActionName';
import { BaseTable } from 'client/modules/commandCenter/components/tables/BaseTable/BaseTable';
import { MarketTableItem } from 'client/modules/commandCenter/hooks/useCommandCenterMarketItems';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { getSharedProductMetadata } from 'client/utils/getSharedProductMetadata';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<MarketTableItem>();

interface Props {
  markets: MarketTableItem[] | undefined;
}

export function MarketsTable({ markets }: Props) {
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();

  const columns: ColumnDef<MarketTableItem, any>[] = useMemo(() => {
    return [
      columnHelper.accessor('metadata', {
        header: ({ header }) => <HeaderCell header={header}>Market</HeaderCell>,
        cell: (context) => {
          const value = context.getValue<MarketTableItem['metadata']>();
          const { icon } = getSharedProductMetadata(value);

          return (
            <MarketProductInfoCell
              symbol={value.marketName}
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
      columnHelper.accessor('price', {
        header: ({ header }) => <HeaderCell header={header}>Price</HeaderCell>,
        cell: (context) => {
          const {
            currentPrice,
            priceChangeFrac24h,
            marketPriceFormatSpecifier,
          } = context.getValue<MarketTableItem['price']>();

          const color = signDependentValue(priceChangeFrac24h, {
            positive: 'text-positive',
            negative: 'text-negative',
            zero: 'text-text-primary',
          });

          return (
            <StackedTableCell
              className="gap-y-0.5"
              top={formatNumber(currentPrice, {
                formatSpecifier: marketPriceFormatSpecifier,
              })}
              bottom={
                <span className={color}>
                  {formatNumber(priceChangeFrac24h, {
                    formatSpecifier:
                      PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
                  })}
                </span>
              }
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('priceChangeFrac24h'),
        meta: {
          cellContainerClassName: 'w-24 lg:w-36',
        },
      }),
      columnHelper.accessor('pastDayVolumeInPrimaryQuote', {
        header: ({ header }) => (
          <HeaderCell header={header}>Volume {primaryQuoteSymbol}</HeaderCell>
        ),
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
              <Icons.StarFill className="text-accent" size={12} />
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
  }, [primaryQuoteSymbol]);

  return (
    <BaseTable
      id="markets"
      columns={columns}
      data={markets}
      initialSortingState={[{ id: 'pastDayVolumeInPrimaryQuote', desc: true }]}
      onSelect={(row) => row.original.action()}
    />
  );
}
