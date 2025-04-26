import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { MarketsCardContent } from 'client/pages/Markets/components/cards/MarketsCardContent';
import { MarketsCardItemButton } from 'client/pages/Markets/components/cards/MarketsCardItemButton';
import { useMarketsHotMarkets } from 'client/pages/Markets/components/cards/MarketsHotMarkets/useMarketsHotMarkets';
import Image from 'next/image';

export function MarketsHotMarkets() {
  const { hotMarkets, isLoading } = useMarketsHotMarkets();
  const productTradingLinks = useProductTradingLinks();

  return (
    <MarketsCardContent
      isLoading={isLoading}
      title={<>🔥 Hot Markets</>}
      subtitle="24h Volume"
    >
      <div className="grid grid-cols-2 gap-2">
        {hotMarkets?.map(({ metadata, past24hDailyVolumeUsd, productId }) => {
          return (
            <MarketsCardItemButton
              key={metadata.marketName}
              href={productTradingLinks?.[productId]?.link}
              label={
                <>
                  <Image
                    src={metadata.icon.asset}
                    alt={metadata.marketName}
                    className="size-4"
                  />
                  {metadata.marketName}
                </>
              }
              value={past24hDailyVolumeUsd}
              numberFormatSpecifier={
                PresetNumberFormatSpecifier.CURRENCY_SI_3SF
              }
            />
          );
        })}
      </div>
    </MarketsCardContent>
  );
}
