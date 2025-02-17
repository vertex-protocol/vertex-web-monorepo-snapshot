import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { MarketsCardContent } from 'client/pages/Markets/components/cards/MarketsCardContent';
import { MarketsCardItemButton } from 'client/pages/Markets/components/cards/MarketsCardItemButton';
import { useMarketsRecentlyAdded } from 'client/pages/Markets/components/cards/MarketsRecentlyAdded/useMarketsRecentlyAdded';
import Image from 'next/image';

export function MarketsRecentlyAdded() {
  const { recentlyAddedMarkets, isLoading } = useMarketsRecentlyAdded();
  const productTradingLinks = useProductTradingLinks();

  return (
    <MarketsCardContent title="Recently Added" isLoading={isLoading}>
      <div className="grid grid-cols-2 gap-2">
        {recentlyAddedMarkets?.map(
          ({
            metadata,
            marketPriceChangeFrac,
            marketPrice,
            priceFormatSpecifier,
            productId,
          }) => {
            return (
              <MarketsCardItemButton
                key={metadata?.symbol}
                href={productTradingLinks?.[productId].link}
                label={
                  metadata && (
                    <>
                      <Image
                        src={metadata.icon.asset}
                        alt={metadata.symbol}
                        className="size-4"
                      />
                      {metadata.symbol}
                    </>
                  )
                }
                value={marketPrice}
                numberFormatSpecifier={priceFormatSpecifier}
                valueClassName="flex gap-x-3"
                valueEndElement={
                  <span
                    className={joinClassNames(
                      'text-right',
                      marketPriceChangeFrac.isNegative()
                        ? 'text-negative'
                        : 'text-positive',
                    )}
                  >
                    {formatNumber(marketPriceChangeFrac, {
                      formatSpecifier:
                        PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
                    })}
                  </span>
                }
              />
            );
          },
        )}
      </div>
    </MarketsCardContent>
  );
}
