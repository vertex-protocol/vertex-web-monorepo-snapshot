// This is quite similar to `MetricStackedItem`, but the % change requires a custom implementation
import {
  PresetNumberFormatSpecifier,
  formatNumber,
} from '@vertex-protocol/react-client';
import { BigDecimal } from '@vertex-protocol/utils';
import { joinClassNames } from '@vertex-protocol/web-common';
import { ValueWithLabel } from 'client/components/ValueWithLabel/ValueWithLabel';
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
    <ValueWithLabel.Vertical
      label="Price / 24h Change"
      value={currentPrice}
      valueClassName="gap-x-2"
      numberFormatSpecifier={priceFormatSpecifier}
      valueEndElement={
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
      }
    />
  );
}
