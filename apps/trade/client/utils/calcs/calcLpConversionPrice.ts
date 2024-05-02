import { Product } from '@vertex-protocol/contracts';

/**
 * Calculate the conversion price of the LP (i.e. how much quote to 1 unit of base implied by the pool)
 */
export function calcLpConversionPrice(product: Product) {
  const { totalLpBaseAmount, totalLpQuoteAmount, oraclePrice } = product;
  // If no LP amounts in pool, use oracle price as conversion rate
  if (totalLpBaseAmount.isZero()) {
    return oraclePrice;
  }
  return totalLpQuoteAmount.div(totalLpBaseAmount);
}
