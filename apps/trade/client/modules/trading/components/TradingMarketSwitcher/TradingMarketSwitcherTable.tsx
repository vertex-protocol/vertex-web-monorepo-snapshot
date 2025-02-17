import { ColumnDef, createColumnHelper, Row } from '@tanstack/react-table';
import { HeaderCell } from 'client/components/DataTable/cells/HeaderCell';
import {
  bigDecimalSortFn,
  getKeyedBigDecimalSortFn,
} from 'client/components/DataTable/utils/sortingFns';
import { FixedHeaderDataTable } from 'client/components/FixedHeaderDataTable';
import { FavoriteHeaderCell } from 'client/modules/tables/cells/FavoriteHeaderCell';
import { FavoriteToggleCell } from 'client/modules/tables/cells/FavoriteToggleCell';
import { MarketSwitcherStackedPriceCell } from 'client/modules/trading/components/BaseMarketSwitcherTable/cells/MarketSwitcherStackedPriceCell';
import { TradingMarketSwitcherProductInfoCell } from 'client/modules/trading/components/TradingMarketSwitcher/TradingMarketSwitcherProductInfoCell';
import { MarketSwitcherItem } from 'client/modules/trading/hooks/useMarketSwitcher/types';
import { favoriteSortFn } from 'client/pages/Markets/utils/sortingFns';
import { useMemo } from 'react';

const columnHelper = createColumnHelper<MarketSwitcherItem>();

interface Props {
  disableFavoriteButton: boolean;
  toggleIsFavoritedMarket: (marketId: number) => void;
  markets: MarketSwitcherItem[];
  isLoading: boolean;
  onRowClick: (row: Row<MarketSwitcherItem>) => void;
}

export function TradingMarketSwitcherTable({
  disableFavoriteButton,
  toggleIsFavoritedMarket,
  markets,
  isLoading,
  onRowClick,
}: Props) {
  const columns: ColumnDef<MarketSwitcherItem, any>[] = useMemo(
    () => [
      columnHelper.accessor('isFavorited', {
        header: ({ header }) => (
          <FavoriteHeaderCell
            header={header}
            favoriteButtonSize={14}
            favoriteButtonClassName="px-3"
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
              marketName={market.marketName}
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
              priceChangeFracClassName="text-2xs"
            />
          );
        },
        sortingFn: getKeyedBigDecimalSortFn('priceChangeFrac'),
      }),
    ],
    [disableFavoriteButton, toggleIsFavoritedMarket],
  );

  return (
    <FixedHeaderDataTable
      data={markets}
      isLoading={isLoading}
      columns={columns}
      initialSortingState={[{ id: 'isFavorited', desc: false }]}
      rowAsLinkHref={(row) => row.original.href}
      onRowClick={onRowClick}
      emptyState={
        <p className="text-text-tertiary p-2 text-xs">No markets found.</p>
      }
      // `pr-3` needed as each favorite button has its own left padding (increases hit area)
      headerClassName="pr-3"
      rowClassName="pr-3 py-1"
      scrollContainerClassName="gap-y-0.5"
    />
  );
}
