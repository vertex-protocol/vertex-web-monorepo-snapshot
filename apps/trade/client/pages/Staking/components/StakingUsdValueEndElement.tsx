import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { mergeClassNames } from '@vertex-protocol/web-common';

interface Props {
  protocolTokenSymbol: string;
  usdValue: BigDecimal | undefined;
  usdValueClassName?: string;
}

export function StakingUsdValueEndElement({
  protocolTokenSymbol,
  usdValue,
  usdValueClassName,
}: Props) {
  return (
    <div>
      {protocolTokenSymbol}{' '}
      <span
        className={mergeClassNames('text-text-tertiary', usdValueClassName)}
      >
        (
        {formatNumber(usdValue, {
          formatSpecifier: PresetNumberFormatSpecifier.CURRENCY_2DP,
        })}
        )
      </span>
    </div>
  );
}
