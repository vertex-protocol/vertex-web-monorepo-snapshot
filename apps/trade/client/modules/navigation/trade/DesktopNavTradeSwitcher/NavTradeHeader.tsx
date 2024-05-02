import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { FavoriteButton } from 'client/components/FavoriteButton';
import { NavTradeRowLayout } from './NavTradeRowLayout';

interface Props extends WithClassnames {
  disableFavoriteButton: boolean;
  sortByFavorites: boolean;
  setSortByFavorites: (sortByFavorites: boolean) => void;
}

export function NavTradeHeader({
  className,
  disableFavoriteButton,
  sortByFavorites,
  setSortByFavorites,
}: Props) {
  return (
    <NavTradeRowLayout
      className={joinClassNames('text-text-tertiary cursor-default', className)}
      favoriteComponent={
        <FavoriteButton
          className="py-2 pr-2.5"
          size={12}
          isFavorited={sortByFavorites}
          disabled={disableFavoriteButton}
          onClick={() => {
            setSortByFavorites(!sortByFavorites);
          }}
        />
      }
      marketComponent="Market"
      priceComponent="Price"
      volumeComponent="24h Volume"
    />
  );
}
