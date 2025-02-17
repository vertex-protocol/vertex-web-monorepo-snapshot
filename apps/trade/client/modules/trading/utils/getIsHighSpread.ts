import { BigDecimal } from '@vertex-protocol/utils';

/**
 * Spread > 1% is abnormally high
 * @param spreadFrac
 */
export function getIsHighSpread(spreadFrac: BigDecimal) {
  return spreadFrac.gt(0.01);
}
