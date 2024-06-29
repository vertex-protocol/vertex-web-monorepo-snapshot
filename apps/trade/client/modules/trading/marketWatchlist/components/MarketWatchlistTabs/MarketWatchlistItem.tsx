import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames, NextImageSrc } from '@vertex-protocol/web-common';
import {
  formatNumber,
  getMarketPriceFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import {
  Button,
  getStateOverlayClassNames,
  Icons,
  TextButton,
} from '@vertex-protocol/web-ui';
import { FavoriteButton } from 'client/components/FavoriteButton';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { MarketWatchlistItemData } from 'client/modules/trading/marketWatchlist/types';
import { signDependentValue } from 'client/utils/signDependentValue';
import Image from 'next/image';
import Link from 'next/link';
import { MouseEvent } from 'react';

interface Props {
  itemData: MarketWatchlistItemData;
  disableFavoriteButton: boolean;
  showToggleOnHover: boolean;
  toggleIsFavoritedMarket: (marketId: number) => void;
}

export function MarketWatchlistItem({
  itemData,
  disableFavoriteButton,
  showToggleOnHover,
  toggleIsFavoritedMarket,
}: Props) {
  const { trackEvent } = useAnalyticsContext();
  const hoverStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'base',
  });

  return (
    <Button
      as={Link}
      href={itemData.href}
      className={joinClassNames(
        'isolate grid grid-cols-2 gap-x-3 rounded p-1',
        hoverStateOverlayClassNames,
        showToggleOnHover ? 'group' : '',
      )}
      onClick={() => {
        trackEvent({
          type: 'market_entrypoint_clicked',
          data: {
            entrypoint: 'watchlist',
          },
        });
      }}
    >
      <MarketInfo
        marketName={itemData.marketData.metadata.marketName}
        iconSrc={itemData.baseMetadata.icon.asset}
        volume={itemData.pastDayVolumeInPrimaryQuote}
      />
      <div className="flex items-center justify-between">
        <PriceAndChange
          priceIncrement={itemData.priceIncrement}
          currentPrice={itemData.currentPrice}
          changeFraction={itemData.pastDayPriceChangeFrac}
        />
        <FavoriteButton
          // Reduce default padding and only show when row is hovered
          className={joinClassNames(
            'py-1 pr-0',
            showToggleOnHover ? 'hidden group-hover:block' : '',
          )}
          size={16}
          onClick={(e: MouseEvent<HTMLButtonElement>) => {
            // Prevent link from triggering on click.
            e.preventDefault();
            toggleIsFavoritedMarket(itemData.productId);
          }}
          isFavorited={itemData.isFavorited}
          disabled={disableFavoriteButton}
        />
      </div>
    </Button>
  );
}

interface MarketInfoProps {
  marketName: string;
  iconSrc: NextImageSrc;
  volume: BigDecimal | undefined;
}

function MarketInfo({ marketName, iconSrc, volume }: MarketInfoProps) {
  return (
    <div className="flex items-center gap-x-2.5">
      <Image src={iconSrc} className="h-auto w-6" alt={marketName} />
      <div className="flex flex-col gap-y-0.5 text-xs">
        <span className="text-text-primary">{marketName}</span>
        <span className="text-text-tertiary">
          {formatNumber(volume, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
          })}
        </span>
      </div>
    </div>
  );
}

interface PriceAndChangeProps {
  priceIncrement: BigDecimal | undefined;
  currentPrice: BigDecimal | undefined;
  changeFraction: BigDecimal | undefined;
}

function PriceAndChange({
  priceIncrement,
  currentPrice,
  changeFraction,
}: PriceAndChangeProps) {
  return (
    <div className="flex flex-col items-start text-xs">
      <span className="text-text-primary">
        {formatNumber(currentPrice, {
          formatSpecifier: getMarketPriceFormatSpecifier(priceIncrement),
        })}
      </span>
      <span
        className={signDependentValue(changeFraction, {
          positive: 'text-positive',
          negative: 'text-negative',
          zero: 'text-disabled',
        })}
      >
        {formatNumber(changeFraction, {
          formatSpecifier: PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
        })}
      </span>
    </div>
  );
}
