import { BigDecimal } from '@vertex-protocol/client';
import { PresetNumberFormatSpecifier } from '@vertex-protocol/react-client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import { useProductTradingLinks } from 'client/hooks/ui/navigation/useProductTradingLinks';
import { MarketsCardContent } from 'client/pages/Markets/components/cards/MarketsCardContent';
import { MarketsCardItemButton } from 'client/pages/Markets/components/cards/MarketsCardItemButton';
import { useMarketsGainersLosers } from 'client/pages/Markets/components/cards/MarketsGainersLosers/useMarketsGainersLosers';
import Image from 'next/image';

export function MarketsGainersLosers() {
  const { gainers, losers, isLoading } = useMarketsGainersLosers();

  // Using `grid` for a consistent cell height
  const itemsContainerClassName = 'grid gap-y-2';

  return (
    <MarketsCardContent
      title="Gainers & Losers"
      subtitle="24h Change"
      isLoading={isLoading}
    >
      <div className="grid grid-cols-2 gap-x-2">
        <div className={itemsContainerClassName}>
          {gainers?.map(({ metadata, pastDayPriceChangeFrac, productId }) => (
            <Item
              key={metadata.marketName}
              productId={productId}
              iconSrc={metadata.icon.asset}
              marketName={metadata.marketName}
              pastDayPriceChangeFrac={pastDayPriceChangeFrac}
            />
          ))}
        </div>
        <div className={itemsContainerClassName}>
          {losers?.map(({ metadata, pastDayPriceChangeFrac, productId }) => (
            <Item
              key={metadata.marketName}
              productId={productId}
              iconSrc={metadata.icon.asset}
              marketName={metadata.marketName}
              pastDayPriceChangeFrac={pastDayPriceChangeFrac}
            />
          ))}
        </div>
      </div>
    </MarketsCardContent>
  );
}

interface ItemProps {
  marketName: string;
  iconSrc: NextImageSrc;
  pastDayPriceChangeFrac: BigDecimal;
  productId: number;
}

function Item({
  marketName,
  iconSrc,
  pastDayPriceChangeFrac,
  productId,
}: ItemProps) {
  const productTradingLinks = useProductTradingLinks();

  return (
    <MarketsCardItemButton
      href={productTradingLinks?.[productId].link}
      label={
        <>
          <Image src={iconSrc} alt={marketName} className="size-4" />
          {marketName}
        </>
      }
      value={pastDayPriceChangeFrac}
      valueClassName={
        pastDayPriceChangeFrac.isNegative() ? 'text-negative' : 'text-positive'
      }
      numberFormatSpecifier={PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP}
    />
  );
}
