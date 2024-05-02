import { BigDecimal } from '@vertex-protocol/client';
import { NewPill } from 'client/components/NewPill';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { TokenIconMetadata } from 'common/productMetadata/tokenIcons';
import Image from 'next/image';

interface Props {
  marketName: string;
  symbol: string;
  icon: TokenIconMetadata;
  volume24h: BigDecimal | undefined;
  isNew: boolean;
}

export function MarketSwitcherProductInfo({
  marketName,
  symbol,
  icon,
  volume24h,
  isNew,
}: Props) {
  return (
    <div className="flex items-center gap-x-2.5">
      <Image src={icon.asset} className="h-auto w-6" alt={symbol} />
      <div className="flex flex-col items-start leading-4">
        <p className="text-text-secondary text-sm">{marketName}</p>
        <p className="text-text-tertiary text-xs">
          {formatNumber(volume24h, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_INT,
          })}
        </p>
      </div>
      {isNew && <NewPill />}
    </div>
  );
}
