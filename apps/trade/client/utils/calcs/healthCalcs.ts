import { BalanceWithProduct } from '@vertex-protocol/client';
import {
  PerpBalanceWithProduct,
  SpotBalanceWithProduct,
} from '@vertex-protocol/contracts';
import { BigDecimal, BigDecimals } from '@vertex-protocol/utils';

export interface InitialMaintMetrics {
  initial: BigDecimal;
  maintenance: BigDecimal;
}

/**
 * Calculates the value of the perp balance without leverage and pnl. This is used in the margin manager
 * to show the amount of health consumed by a perp position without the impact of unsettled pnl
 *
 * @param balance
 */
export function calcPerpBalanceHealthWithoutPnl(
  balance: BalanceWithProduct,
): InitialMaintMetrics {
  // Perp Balance health w/o PnL is calculated by using formula
  // -1 * abs(notional value) / max leverage

  // Ex. if weight is 0.9, this is 0.1 (adjusts from entry cost INCLUDING 10x leverage)
  const initialLeverageAdjustment = BigDecimals.ONE.minus(
    balance.longWeightInitial,
  );

  const maintenanceLeverageAdjustment = BigDecimals.ONE.minus(
    balance.longWeightMaintenance,
  );

  const baseMarginValue = balance.amount
    .abs()
    .multipliedBy(balance.oraclePrice);

  return {
    initial: baseMarginValue
      .multipliedBy(initialLeverageAdjustment)
      .multipliedBy(-1),
    maintenance: baseMarginValue
      .multipliedBy(maintenanceLeverageAdjustment)
      .multipliedBy(-1),
  };
}

/**
 * Calculate spot health for a balance
 */
export function calcSpotBalanceHealth(
  balance: BalanceWithProduct,
): InitialMaintMetrics {
  const weights = getHealthWeights(balance.amount, balance);
  const oraclePrice = balance.oraclePrice;

  const balanceValue = balance.amount.multipliedBy(oraclePrice);

  return {
    initial: weights.initial.multipliedBy(balanceValue),
    maintenance: weights.maintenance.multipliedBy(balanceValue),
  };
}

/**
 * Calculate healths for an LP balance
 * @param balance
 */
export function calcLpBalanceHealth(
  balance: BalanceWithProduct,
): InitialMaintMetrics {
  // Derive base/quote conversion assuming pool is at oracle price
  // x * y = k, where x = base, y = quote, k = constant
  // x * price * x = k, given y = price * x
  // x^2 = k / price, and y = k / x
  const poolK = balance.totalLpBaseAmount.multipliedBy(
    balance.totalLpQuoteAmount,
  );
  const poolTotalBase = poolK.div(balance.oraclePrice).sqrt();
  const poolTotalQuote = poolTotalBase.isZero()
    ? BigDecimals.ZERO
    : poolK.div(poolTotalBase);

  // Decompose the LP balance into base/quote components
  const fractionOfPool = balance.lpAmount.div(balance.totalLpSupply);
  const lpBaseAmount = poolTotalBase.multipliedBy(fractionOfPool);
  const lpQuoteAmount = poolTotalQuote.multipliedBy(fractionOfPool);

  // Use long weights for LP penalty
  const longWeights = getHealthWeights(BigDecimals.ONE, balance);

  // Overall health = base health + quote health - LP base penalty
  // LP base penalty = (1 - long weight) * base value
  const baseValue = lpBaseAmount.multipliedBy(balance.oraclePrice);

  const initialBaseHealth = baseValue.multipliedBy(longWeights.initial);
  const maintBaseHealth = baseValue.multipliedBy(longWeights.maintenance);

  const initialBasePenalty = BigDecimals.ONE.minus(
    longWeights.initial,
  ).multipliedBy(baseValue);
  const maintBasePenalty = BigDecimals.ONE.minus(
    longWeights.maintenance,
  ).multipliedBy(baseValue);

  return {
    initial: initialBaseHealth.plus(lpQuoteAmount).minus(initialBasePenalty),
    maintenance: maintBaseHealth.plus(lpQuoteAmount).minus(maintBasePenalty),
  };
}

/**
 * Calculate spread basis amount
 * @param spotBalanceAmount
 * @param perpBalanceAmount
 */
export function calcSpreadBasisAmount(
  spotBalanceAmount: BigDecimal,
  perpBalanceAmount: BigDecimal,
) {
  // A spread balance is when spot/perp assets have opposite signs.
  // The product of the balance amounts is negative when this is the case.
  const hasSpread = spotBalanceAmount
    .multipliedBy(perpBalanceAmount)
    .lt(BigDecimals.ZERO);

  if (!hasSpread) {
    return BigDecimals.ZERO;
  }

  // Positive basis amount == positive spot balance
  const basisAmount = BigDecimal.min(
    spotBalanceAmount.abs(),
    perpBalanceAmount.abs(),
  ).multipliedBy(spotBalanceAmount.gt(0) ? 1 : -1);

  return basisAmount;
}

/**
 * Calculate the increase in health due to a spread position
 * A spread is defined as having a positive spot balance and a negative perp balance, or vice versa
 * Ex. +15 BTC, -10 BTC-PERP = +10 BTC spread, this fn will calculate the health benefit from a +10 BTC spread
 *     -15 BTC, +10 BTC-PERP = -10 BTC spread
 *     +15 BTC, +10 BTC-PERP = no spread
 *
 * Logic from https://github.com/vertex-protocol/vertex-core/blob/develop/contracts/Clearinghouse.sol#L120
 *
 * @param spotBalance
 * @param perpBalance
 */
export function calcSpreadHealthIncrease(
  spotBalance: SpotBalanceWithProduct,
  perpBalance: PerpBalanceWithProduct,
): InitialMaintMetrics {
  const basisSize = calcSpreadBasisAmount(
    spotBalance.amount,
    perpBalance.amount,
  ).abs();

  // We don't calculate health if spread is zero.
  if (basisSize.isZero()) {
    return {
      initial: BigDecimals.ZERO,
      maintenance: BigDecimals.ZERO,
    };
  }

  const longPerpWeights = getHealthWeights(BigDecimals.ONE, perpBalance);
  const longSpotWeights = getHealthWeights(BigDecimals.ONE, spotBalance);

  const initialExistingPenalty = longSpotWeights.initial
    .plus(longPerpWeights.initial)
    .div(2);
  const maintExistingPenalty = longSpotWeights.maintenance
    .plus(longPerpWeights.maintenance)
    .div(2);

  // Spread penalty for liquidity considerations
  const spreadLongWeights = spotBalance.amount.gt(0)
    ? longPerpWeights
    : longSpotWeights;
  const initialSpreadPenalty = BigDecimals.ONE.minus(
    BigDecimals.ONE.minus(spreadLongWeights.initial).div(5),
  );
  const maintSpreadPenalty = BigDecimals.ONE.minus(
    BigDecimals.ONE.minus(spreadLongWeights.maintenance).div(5),
  );

  const totalSpreadUnderlyingValue = basisSize.multipliedBy(
    spotBalance.oraclePrice.plus(perpBalance.oraclePrice),
  );

  return {
    initial: totalSpreadUnderlyingValue.multipliedBy(
      initialSpreadPenalty.minus(initialExistingPenalty),
    ),
    maintenance: totalSpreadUnderlyingValue.multipliedBy(
      maintSpreadPenalty.minus(maintExistingPenalty),
    ),
  };
}

interface ProductWeightConfig {
  longWeightInitial: BigDecimal;
  longWeightMaintenance: BigDecimal;
  shortWeightInitial: BigDecimal;
  shortWeightMaintenance: BigDecimal;
}

/**
 * Returns the relevant initial / maint. weights for the position
 * @param balanceAmount
 * @param productWeightConfig
 */
export function getHealthWeights(
  balanceAmount: BigDecimal,
  productWeightConfig: ProductWeightConfig,
): InitialMaintMetrics {
  return balanceAmount.gte(0)
    ? {
        initial: productWeightConfig.longWeightInitial,
        maintenance: productWeightConfig.longWeightMaintenance,
      }
    : {
        initial: productWeightConfig.shortWeightInitial,
        maintenance: productWeightConfig.shortWeightMaintenance,
      };
}
