import { BigDecimal } from '@vertex-protocol/client';
import {
  formatNumber,
  getMarketPriceFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { getSignDependentColorClassName } from 'client/utils/ui/getSignDependentColorClassName';

interface Props {
  priceIncrement: BigDecimal | undefined;
  currentPrice: BigDecimal | undefined;
  priceChangeFrac: BigDecimal | undefined;
  priceChangeFracClassName?: string;
}

export function MarketSwitcherStackedPriceCell({
  currentPrice,
  priceChangeFrac,
  priceIncrement,
  priceChangeFracClassName,
}: Props) {
  const color = getSignDependentColorClassName(priceChangeFrac);

  return (
    <StackedTableCell
      className="items-end gap-y-0"
      top={formatNumber(currentPrice, {
        formatSpecifier: getMarketPriceFormatSpecifier(priceIncrement),
      })}
      bottom={
        <span className={joinClassNames(color, priceChangeFracClassName)}>
          {formatNumber(priceChangeFrac, {
            formatSpecifier: PresetNumberFormatSpecifier.SIGNED_PERCENTAGE_2DP,
          })}
        </span>
      }
    />
  );
}
