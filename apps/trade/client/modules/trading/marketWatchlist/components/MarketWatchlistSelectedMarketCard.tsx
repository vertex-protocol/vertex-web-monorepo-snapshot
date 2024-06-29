import { removeDecimals } from '@vertex-protocol/utils';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { FavoriteButton } from 'client/components/FavoriteButton';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import { MarketWatchlistItemData } from 'client/modules/trading/marketWatchlist/types';
import Image from 'next/image';

export function MarketWatchlistSelectedMarketCard({
  selectedMarket,
  toggleIsFavoritedMarket,
  disableFavoriteButton,
  className,
}: WithClassnames<{
  selectedMarket: MarketWatchlistItemData | undefined;
  disableFavoriteButton: boolean;
  toggleIsFavoritedMarket: (marketId: number) => void;
}>) {
  if (!selectedMarket) {
    return null;
  }

  return (
    <div className={joinClassNames('flex flex-col gap-y-5', className)}>
      <div className="flex items-center gap-x-2">
        <Image
          src={selectedMarket.baseMetadata.icon.asset}
          alt={selectedMarket.baseMetadata.name}
          className="h-auto w-6 shrink-0"
        />
        <span className="text-text-primary text-sm">
          {selectedMarket.marketData.metadata.marketName}
        </span>
        <FavoriteButton
          className="ml-auto py-1 pr-0"
          disabled={disableFavoriteButton}
          size={16}
          isFavorited={selectedMarket.isFavorited}
          onClick={() => toggleIsFavoritedMarket(selectedMarket.productId)}
        />
      </div>
      <MarketMetrics selectedMarket={selectedMarket} />
    </div>
  );
}

function MarketMetrics({
  selectedMarket,
}: {
  selectedMarket: MarketWatchlistItemData;
}) {
  const minSize = removeDecimals(selectedMarket?.marketData.minSize);
  const sizeIncrement = removeDecimals(
    selectedMarket?.marketData.sizeIncrement,
  );

  return (
    <div className="flex flex-col gap-y-1">
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Min Limit Order Size"
        valueContent={minSize?.toString()}
        valueEndElement={selectedMarket?.baseMetadata.symbol}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Order Increment"
        valueContent={sizeIncrement?.toString()}
        valueEndElement={selectedMarket?.baseMetadata.symbol}
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Initial Weights (Long/Short)"
        valueContent={
          <>
            {selectedMarket?.marketData.longWeightInitial.toString()}
            <span className="text-text-tertiary">/</span>
            <span>
              {selectedMarket?.marketData.shortWeightInitial.toString()}
            </span>
          </>
        }
      />
      <ValueWithLabel.Horizontal
        sizeVariant="xs"
        label="Maint. Weights (Long/Short)"
        valueContent={
          <>
            {selectedMarket?.marketData.longWeightMaintenance.toString()}
            <span className="text-text-tertiary">/</span>
            <span>
              {selectedMarket?.marketData.shortWeightMaintenance.toString()}
            </span>
          </>
        }
      />
    </div>
  );
}
