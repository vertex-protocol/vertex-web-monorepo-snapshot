import { BalanceWithProduct } from '@vertex-protocol/client';
import {
  PerpBalanceWithProduct,
  SpotBalanceWithProduct,
} from '@vertex-protocol/contracts';
import { BigDecimal } from '@vertex-protocol/utils';
import { BigDecimals } from 'client/utils/BigDecimals';

export interface InitialMaintMetrics {
  initial: BigDecimal;
  maintenance: BigDecimal;
}

export function calcPerpBalanceHealth(
  balance: BalanceWithProduct,
): InitialMaintMetrics {
  // Perp Balance health is calculated by using formula
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
 * @param spotBalance
 * @param perpBalance
 */
export function calcSpreadHealthIncrease(
  spotBalance: SpotBalanceWithProduct,
  perpBalance: PerpBalanceWithProduct,
): InitialMaintMetrics {
  const basisAmount = calcSpreadBasisAmount(
    spotBalance.amount,
    perpBalance.amount,
  );

  // We don't calculate health if spread is zero.
  if (basisAmount.isZero()) {
    return {
      initial: BigDecimals.ZERO,
      maintenance: BigDecimals.ZERO,
    };
  }

  // Contracts use abs amount (size), which isn't 100% correct, but we'll do the same
  const basisSize = basisAmount.abs();

  // Contracts use perp weights in subaccount info query
  const longPerpWeights = getHealthWeights(BigDecimals.ONE, perpBalance);

  // For spreads, there's a penalty for liquidity considerations, which is
  // penaltyMultiplier * (|spot value| + |perp value|) = penaltyMultiplier * basis size * (spot price + perp price)
  // Random calc in contracts
  const initialSpreadPenaltyMultiplier = BigDecimals.ONE.minus(
    longPerpWeights.initial,
  ).div(5);
  const maintSpreadPenaltyMultiplier = BigDecimals.ONE.minus(
    longPerpWeights.maintenance,
  ).div(5);
  const totalSpreadUnderlyingValue = basisSize.multipliedBy(
    spotBalance.oraclePrice.plus(perpBalance.oraclePrice),
  );

  const initialSpreadPenalty = initialSpreadPenaltyMultiplier.multipliedBy(
    totalSpreadUnderlyingValue,
  );
  const maintSpreadPenalty = maintSpreadPenaltyMultiplier.multipliedBy(
    totalSpreadUnderlyingValue,
  );

  // Normal health for underlying balances in a spread = spot value * spot weight + perp value * perp weight + perp vquote
  // Spread health = spot value + perp value + perp vquote - spread penalty
  // Health increase = spread health - normal health = spot value * (1 - spot weight) + perp value * (1 - perp weight) - spread penalty
  const spotValue = basisAmount.multipliedBy(spotBalance.oraclePrice);
  const perpNotionaValue = basisAmount
    .multipliedBy(perpBalance.oraclePrice)
    .multipliedBy(-1); // As positive basis = short perp

  const spotWeights = getHealthWeights(basisAmount, spotBalance);
  const perpWeights = getHealthWeights(
    basisAmount.multipliedBy(-1),
    perpBalance,
  );

  return {
    initial: spotValue
      .multipliedBy(BigDecimals.ONE.minus(spotWeights.initial))
      .plus(
        perpNotionaValue.multipliedBy(
          BigDecimals.ONE.minus(perpWeights.initial),
        ),
      )
      .minus(initialSpreadPenalty),
    maintenance: spotValue
      .multipliedBy(BigDecimals.ONE.minus(spotWeights.maintenance))
      .plus(
        perpNotionaValue.multipliedBy(
          BigDecimals.ONE.minus(perpWeights.maintenance),
        ),
      )
      .minus(maintSpreadPenalty),
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
