import { BigDecimal } from '@vertex-protocol/utils';
import { AnnotatedPerpBalanceWithProduct } from 'common/productMetadata/types';

// If long: oracle_price - (health / amount / long_weight)
// If short: oracle_price + (health / amount * short_weight)
// If long_weight -> 0 then liquidation price approaches -inf, if short_weight -> inf then liquidation price approaches +inf.
// null is returned in case liq price goes to -inf (<= 0) or +inf (10 times the oracle price) or balance amount is 0
export function calcEstimatedLiquidationPrice(
  balanceWithProduct: AnnotatedPerpBalanceWithProduct,
  maintenanceHealth: BigDecimal,
): BigDecimal | null {
  if (balanceWithProduct.amount.isPositive()) {
    const longLiquidationPrice = balanceWithProduct.oraclePrice.minus(
      maintenanceHealth
        .div(balanceWithProduct.amount)
        .div(balanceWithProduct.longWeightMaintenance),
    );

    // If liquidation price is 0 or less return null instead of -inf.
    if (longLiquidationPrice.lte(0)) {
      return null;
    }

    return longLiquidationPrice;
  }

  if (balanceWithProduct.amount.isNegative()) {
    const shortLiquidationPrice = balanceWithProduct.oraclePrice.plus(
      maintenanceHealth
        .div(balanceWithProduct.amount.abs())
        .multipliedBy(balanceWithProduct.shortWeightMaintenance),
    );

    // If liquidation price it 10 times the oracle price return undefined instead of going to inf.
    if (shortLiquidationPrice.gte(balanceWithProduct.oraclePrice.times(10))) {
      return null;
    }

    return shortLiquidationPrice;
  }

  // If amount is 0. Which is very unlikely to happen return null
  return null;
}
