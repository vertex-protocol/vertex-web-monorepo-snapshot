import { BigDecimal } from '@vertex-protocol/utils';

/**
 * For buy orders, quoteAmount is negative, for sell, it is positive. feeAmount is usually positive but can be negative for rebates.
 * Quote amount without fees ends up being always quoteAmount + fees, and the fill price is abs of quoteAmountWithoutFees / baseAmount.
 *
 * @param quoteAmount
 * @param feeAmount
 * @param baseAmount
 */
export function calcOrderFillPrice(
  quoteAmount: BigDecimal,
  feeAmount: BigDecimal,
  baseAmount: BigDecimal,
) {
  return quoteAmount.plus(feeAmount).div(baseAmount).abs();
}
