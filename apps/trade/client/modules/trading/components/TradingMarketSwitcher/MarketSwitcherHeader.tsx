import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { FavoriteButton } from 'client/components/FavoriteButton';

interface Props extends WithClassnames {
  disableFavoriteButton: boolean;
  sortByFavorites: boolean;
  setSortByFavorites: (sortByFavorites: boolean) => void;
}

export function MarketSwitcherHeader({
  className,
  disableFavoriteButton,
  sortByFavorites,
  setSortByFavorites,
}: Props) {
  return (
    <div className={joinClassNames('flex items-center', className)}>
      <FavoriteButton
        size={14}
        isFavorited={sortByFavorites}
        disabled={disableFavoriteButton}
        onClick={() => {
          setSortByFavorites(!sortByFavorites);
        }}
      />
      <div className="text-text-tertiary flex flex-1 items-center justify-between text-xs">
        <span>Market / Volume</span>
        <span>Price</span>
      </div>
    </div>
  );
}
