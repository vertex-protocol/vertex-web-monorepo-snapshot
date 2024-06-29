import { BigDecimal } from '@vertex-protocol/client';
import { joinClassNames } from '@vertex-protocol/web-common';
import {
  formatNumber,
  getMarketPriceFormatSpecifier,
  PresetNumberFormatSpecifier,
} from '@vertex-protocol/react-client';
import { StackedTableCell } from 'client/components/DataTable/cells/StackedTableCell';
import { signDependentValue } from 'client/utils/signDependentValue';
import React from 'react';

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
  const color = signDependentValue(priceChangeFrac, {
    positive: 'text-positive',
    negative: 'text-negative',
    zero: 'text-text-primary',
  });

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
