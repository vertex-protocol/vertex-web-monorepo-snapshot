import { BigDecimal } from '@vertex-protocol/client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import {
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { Icons, Pill } from '@vertex-protocol/web-ui';
import Image from 'next/image';

interface Props {
  takerFee?: BigDecimal;
  baseSymbol: string;
  quoteSymbol: string;
  baseIconSrc: NextImageSrc;
  quoteIconSrc: NextImageSrc;
}

export function LpHeader({
  takerFee,
  baseSymbol,
  quoteSymbol,
  baseIconSrc,
  quoteIconSrc,
}: Props) {
  return (
    <div className="flex items-center gap-x-1">
      <div className="flex">
        <Image src={baseIconSrc} width={24} height={24} alt="Base Icon" />
        <Image
          src={quoteIconSrc}
          width={24}
          height={24}
          alt="Quote Icon"
          className="relative right-2"
        />
      </div>
      <div className="text-text-primary flex items-center pr-2">
        {baseSymbol}
        <Icons.BsDot />
        {quoteSymbol}
      </div>
      {!!takerFee && (
        <Pill colorVariant="tertiary" sizeVariant="sm" className="bg-surface-2">
          Fee:{' '}
          {formatNumber(takerFee, {
            formatSpecifier: PresetNumberFormatSpecifier.PERCENTAGE_2DP,
          })}
        </Pill>
      )}
    </div>
  );
}
