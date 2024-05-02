// This is quite similar to `MetricStackedItem`, but the % change requires a custom implementation
import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import { formatNumber } from 'client/utils/formatNumber/formatNumber';
import { PresetNumberFormatSpecifier } from 'client/utils/formatNumber/NumberFormatSpecifier';
import { signDependentValue } from 'client/utils/signDependentValue';

export function VrtxPriceHeaderMetric({
  currentPrice,
  pastDayPriceChangeFrac,
  priceFormatSpecifier,
}: {
  currentPrice: BigDecimal | undefined;
  pastDayPriceChangeFrac: BigDecimal | undefined;
  priceFormatSpecifier: string;
}) {
  return (
    <div className="flex flex-col gap-y-1">
      <span className="text-text-secondary text-sm">Price / 24h Change</span>
      <div className="text-text-primary flex items-baseline gap-x-2 text-2xl">
        {formatNumber(currentPrice, {
          formatSpecifier: priceFormatSpecifier,
        })}
        <span
          className={joinClassNames(
            'text-base',
            signDependentValue(pastDayPriceChangeFrac, {
              positive: 'text-positive',
              negative: 'text-negative',
              zero: 'text-text-primary',
            }),
          )}
        >
          {formatNumber(pastDayPriceChangeFrac, {
            formatSpecifier: PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
          })}
        </span>
      </div>
    </div>
  );
}
