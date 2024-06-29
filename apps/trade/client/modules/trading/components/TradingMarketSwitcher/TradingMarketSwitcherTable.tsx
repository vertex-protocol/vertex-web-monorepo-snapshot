import { ColumnDef, createColumnHelper } from '@tanstack/react-table';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { FavoriteToggleCell } from 'client/modules/tables/cells/FavoriteToggleCell';
import { BaseMarketSwitcherTable } from 'client/modules/trading/components/BaseMarketSwitcherTable/BaseMarketSwitcherTable';
import { MarketSwitcherStackedPriceCell } from 'client/modules/trading/components/BaseMarketSwitcherTable/cells/MarketSwitcherStackedPriceCell';
import { TradingMarketSwitcherProductInfoCell } from 'client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcherProductInfoCell';
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

export function TradingMarketSwitcherTable({
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
            favoriteButtonSize={14}
            favoriteButtonClassName="p-3"
            disableFavoriteButton={disableFavoriteButton}
          />
        ),
        cell: (context) => (
          <FavoriteToggleCell
            favoriteButtonSize={16}
            favoriteButtonClassName="p-3"
            isFavorited={context.getValue<MarketSwitcherItem['isFavorited']>()}
            disabled={disableFavoriteButton}
            toggleIsFavorited={toggleIsFavoritedMarket}
            productId={context.row.original.productId}
          />
        ),
        sortingFn: favoriteSortFn,
      }),
      columnHelper.accessor('volume24h', {
        header: ({ header }) => (
          <HeaderCell header={header}>Market / Volume</HeaderCell>
        ),
        cell: (context) => {
          const volume24h = context.getValue<MarketSwitcherItem['volume24h']>();
          const { market, isNew } = context.row.original;

          return (
            <TradingMarketSwitcherProductInfoCell
              marketName={market.name}
              symbol={market.symbol}
              icon={market.icon}
              volume24h={volume24h}
              isNew={isNew}
            />
          );
        },
        sortingFn: bigDecimalSortFn,
        meta: {
          cellContainerClassName: 'flex-1',
        },
      }),
      columnHelper.accessor('price', {
        header: ({ header }) => <HeaderCell header={header}>Price</HeaderCell>,
        cell: (context) => {
          const { currentPrice, priceChangeFrac, priceIncrement } =
            context.getValue<MarketSwitcherItem['price']>();

          return (
            <MarketSwitcherStackedPriceCell
              priceIncrement={priceIncrement}
              priceChangeFrac={priceChangeFrac}
              currentPrice={currentPrice}
              priceChangeFracClassName="text-3xs"
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('currentPrice'),
      }),
    ],
    [disableFavoriteButton, toggleIsFavoritedMarket],
  );

  return (
    <BaseMarketSwitcherTable
      markets={markets}
      columns={columns}
      onRowClick={onRowClick}
      rowClassName="lg:py-0.5"
    />
  );
}
