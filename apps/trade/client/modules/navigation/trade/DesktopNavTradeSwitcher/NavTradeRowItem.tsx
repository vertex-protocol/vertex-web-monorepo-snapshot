import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Button } from '@vertex-protocol/web-ui';
import { FavoriteButton } from 'client/components/FavoriteButton';
import { NewPill } from 'client/components/NewPill';
import { TradeSwitcherItem } from 'client/modules/trading/hooks/useTradeSwitcher/types';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { signDependentValue } from 'client/utils/signDependentValue';
import Image from 'next/image';
import Link from 'next/link';
import { NavTradeRowLayout } from './NavTradeRowLayout';

export interface Props extends WithClassnames {
  market: TradeSwitcherItem;
  href: string;
  disableFavoriteButton: boolean;
  onRowClick: () => void;
  toggleIsFavoritedMarket: (marketId: number) => void;
}

export function NavTradeRowItem({
  className,
  market,
  href,
  disableFavoriteButton,
  onRowClick,
  toggleIsFavoritedMarket,
}: Props) {
  const {
    market: { icon, name, productId },
    price: { currentPrice, priceChangeFrac, priceIncrement },
    isFavorited,
    isNew,
    volume24h,
  } = market;

  return (
    <Button
      as={Link}
      className={joinClassNames(
        'hover:bg-overlay-hover/5 text-text-primary',
        'rounded-md py-0.5',
        className,
      )}
      href={href}
      onClick={onRowClick}
    >
      <NavTradeRowLayout
        favoriteComponent={
          <FavoriteButton
            size={14}
            isFavorited={isFavorited}
            disabled={disableFavoriteButton}
            onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
              e.stopPropagation();
              // Prevent link from triggering on click.
              e.preventDefault();
              toggleIsFavoritedMarket(productId);
            }}
          />
        }
        marketComponent={
          <div className="flex items-center gap-x-2.5">
            <Image alt="Product Icon" src={icon.asset} className="h-5 w-auto" />
            <div className="whitespace-nowrap">{name}</div>
            {isNew && <NewPill />}
          </div>
        }
        priceComponent={
          <div className="flex flex-col items-end">
            <div>
              {formatNumber(currentPrice, {
                formatSpecifier: getMarketPriceFormatSpecifier(priceIncrement),
              })}
            </div>
            <div
              className={signDependentValue(priceChangeFrac, {
                positive: 'text-positive',
                negative: 'text-negative',
                zero: 'text-text-tertiary',
              })}
            >
              {formatNumber(priceChangeFrac, {
                formatSpecifier:
                  PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
              })}
            </div>
          </div>
        }
        volumeComponent={formatNumber(volume24h, {
          formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
        })}
      />
    </Button>
  );
}
