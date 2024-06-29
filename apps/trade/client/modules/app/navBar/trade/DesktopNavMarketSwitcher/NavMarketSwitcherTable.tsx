import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import { MarketProductInfoCell } from 'client/components/DataTable/cells/MarketProductInfoCell';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { FavoriteToggleCell } from 'client/modules/tables/cells/FavoriteToggleCell';
import { NumberCell } from 'client/modules/tables/cells/NumberCell';
import { BaseMarketSwitcherTable } from 'client/modules/trading/components/BaseMarketSwitcherTable/BaseMarketSwitcherTable';
import { MarketSwitcherStackedPriceCell } from 'client/modules/trading/components/BaseMarketSwitcherTable/cells/MarketSwitcherStackedPriceCell';
import { MarketSwitcherItem } from 'client/modules/trading/hooks/useMarketSwitcher/types';
import { FavoriteHeaderCell } from 'client/pages/Markets/components/FavoriteHeaderCell';
import { favoriteSortFn } from 'client/pages/Markets/utils/sortingFns';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<MarketSwitcherItem>();

interface Props {
  disableFavoriteButton: boolean;
  toggleIsFavoritedMarket: (marketId: number) => void;
  markets: MarketSwitcherItem[];
  onRowClick: () => void;
}

export function NavMarketSwitcherTable({
  disableFavoriteButton,
  toggleIsFavoritedMarket,
  markets,
  onRowClick,
}: Props) {
  const columns: ColumnDef<MarketSwitcherItem, any>[] = useMemo(
    () => [
      columnHelper.accessor('isFavorited', {
        header: ({ header }) => (
          <FavoriteHeaderCell
            header={header}
            favoriteButtonSize={12}
            favoriteButtonClassName="py-2 px-3"
            disableFavoriteButton={disableFavoriteButton}
          />
        ),
        cell: (context) => (
          <FavoriteToggleCell
            favoriteButtonSize={14}
            favoriteButtonClassName="p-3"
            isFavorited={context.getValue<MarketSwitcherItem['isFavorited']>()}
            disabled={disableFavoriteButton}
            toggleIsFavorited={toggleIsFavoritedMarket}
            productId={context.row.original.productId}
          />
        ),
        sortingFn: favoriteSortFn,
      }),
      columnHelper.accessor('market', {
        header: ({ header }) => <HeaderCell header={header}>Market</HeaderCell>,
        cell: (context) => {
          const { name, icon } =
            context.getValue<MarketSwitcherItem['market']>();

          return (
            <MarketProductInfoCell
              name={name}
              iconSrc={icon.asset}
              isNewMarket={context.row.original.isNew}
            />
          );
        },
        enableSorting: false,
        meta: {
          cellContainerClassName: 'w-44',
        },
      }),
      columnHelper.accessor('price', {
        header: ({ header }) => (
          <HeaderCell header={header} className="justify-end">
            Price
          </HeaderCell>
        ),
        cell: (context) => {
          const { currentPrice, priceChangeFrac, priceIncrement } =
            context.getValue<MarketSwitcherItem['price']>();

          return (
            <MarketSwitcherStackedPriceCell
              currentPrice={currentPrice}
              priceChangeFrac={priceChangeFrac}
              priceIncrement={priceIncrement}
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('currentPrice'),
        meta: {
          cellContainerClassName: 'w-16',
        },
      }),
      columnHelper.accessor('volume24h', {
        header: ({ header }) => (
          <HeaderCell header={header} className="justify-end">
            24h Volume
          </HeaderCell>
        ),
        cell: (context) => (
          <NumberCell
            value={context.getValue()}
            formatSpecifier={PresetNumberFormatSpecifier.NUMBER_INT}
            className="justify-end"
          />
        ),
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'flex-1',
        },
      }),
    ],
    [disableFavoriteButton, toggleIsFavoritedMarket],
  );

  return (
    <BaseMarketSwitcherTable
      markets={markets}
      columns={columns}
      onRowClick={onRowClick}
      rowClassName="py-0.5"
    />
  );
}
