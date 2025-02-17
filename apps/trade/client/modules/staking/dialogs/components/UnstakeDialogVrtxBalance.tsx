import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
import Image from 'next/image';

export function UnstakeDialogVrtxBalance({
  currentBalance,
  protocolTokenIconSrc,
}: {
  currentBalance: BigDecimal | undefined;
  protocolTokenIconSrc: NextImageSrc;
}) {
  return (
    <ValueWithLabel.Vertical
      className="items-center"
      label="Your Staked Balance"
      sizeVariant="lg"
      valueClassName="flex items-center gap-x-1.5"
      valueContent={
        <>
          <Image alt="VRTX" src={protocolTokenIconSrc} className="size-6" />
          {formatNumber(currentBalance, {
            formatSpecifier: PresetNumberFormatSpecifier.NUMBER_2DP,
          })}
        </>
      }
    />
  );
}
