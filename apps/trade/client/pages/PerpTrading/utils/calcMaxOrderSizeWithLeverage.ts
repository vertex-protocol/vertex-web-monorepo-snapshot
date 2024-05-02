import { BigDecimal } from '@vertex-protocol/utils';

export function calcMaxOrderSizeWithLeverage(
  maxOrderSize: BigDecimal,
  leverage: number,
  maxLeverage: number,
): BigDecimal {
  return maxOrderSize
    .multipliedBy(Math.min(leverage, maxLeverage))
    .dividedBy(maxLeverage);
}
