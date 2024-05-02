import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { getMarketPriceFormatSpecifier } from 'client/utils/formatNumber/getMarketPriceFormatSpecifier';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { signDependentValue } from 'client/utils/signDependentValue';

interface Props {
  priceIncrement: BigDecimal | undefined;
  currentPrice: BigDecimal | undefined;
  changeFraction: BigDecimal | undefined;
}

export function MarketSwitcherPriceAndFractionChangeInfo({
  priceIncrement,
  currentPrice,
  changeFraction,
}: Props) {
  return (
    <div className="flex flex-col items-end">
      <div className="text-xs">
        {formatNumber(currentPrice, {
          formatSpecifier: getMarketPriceFormatSpecifier(priceIncrement),
        })}
      </div>
      <div
        className={joinClassNames(
          'text-3xs',
          signDependentValue(changeFraction, {
            positive: 'text-positive',
            negative: 'text-negative',
            zero: 'text-disabled',
          }),
        )}
      >
        {formatNumber(changeFraction, {
          formatSpecifier: PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
        })}
      </div>
    </div>
  );
}
