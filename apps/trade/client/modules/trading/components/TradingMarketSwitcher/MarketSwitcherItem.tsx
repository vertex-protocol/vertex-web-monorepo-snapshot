import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Button } from '@vertex-protocol/web-ui';
import { FavoriteButton } from 'client/components/FavoriteButton';
import { TradeSwitcherItem } from 'client/modules/trading/hooks/useTradeSwitcher/types';
import Link from 'next/link';
import { MouseEvent } from 'react';
import { MarketSwitcherProductInfo } from './MarketSwitcherProductInfo';
import { MarketSwitcherPriceAndFractionChangeInfo } from './MarketSwticherPriceAndFractionChangeInfo';

interface Props extends WithClassnames {
  product: TradeSwitcherItem;
  disableFavoriteButton: boolean;
  isFavorited: boolean;
  toggleIsFavoritedMarket: (marketId: number) => void;
  onRowClick: () => void;
  href: string;
}

export function MarketSwitcherItem({
  product,
  disableFavoriteButton,
  isFavorited,
  className,
  toggleIsFavoritedMarket,
  onRowClick,
  href,
}: Props) {
  return (
    <Button
      as={Link}
      href={href}
      className={joinClassNames(
        'flex items-center rounded',
        'hover:bg-overlay-hover/5 text-text-secondary',
        className,
      )}
      onClick={onRowClick}
    >
      <FavoriteButton
        size={16}
        isFavorited={isFavorited}
        disabled={disableFavoriteButton}
        onClick={(e: MouseEvent<HTMLButtonElement>) => {
          e.stopPropagation();
          // Prevent link from triggering on click.
          e.preventDefault();
          toggleIsFavoritedMarket(product.market.productId);
        }}
      />
      <div className="flex flex-1 items-center justify-between py-1.5">
        <MarketSwitcherProductInfo
          marketName={product.market.name}
          symbol={product.market.symbol}
          icon={product.market.icon}
          volume24h={product.volume24h}
          isNew={product.isNew}
        />
        <MarketSwitcherPriceAndFractionChangeInfo
          priceIncrement={product.price.priceIncrement}
          currentPrice={product.price.currentPrice}
          changeFraction={product.price.priceChangeFrac}
        />
      </div>
    </Button>
  );
}
