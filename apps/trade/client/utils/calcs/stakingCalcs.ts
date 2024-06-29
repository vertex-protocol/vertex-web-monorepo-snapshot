import { BigDecimal, BigDecimals, TimeInSeconds } from '@vertex-protocol/utils';
import { safeDiv } from 'client/utils/safeDiv';
import { mapValues } from 'lodash';

/*
Staking score per unit of VRTX follows (where t0 is time of last stake/unstake action):
- `1 + 1.5 * (t - t0) / 183 days`, if `t - t0 < 183 days`.
- `2.5`, if `t - t0 >= 183 days`.

Essentially, the "base score" is 1 voVRTX per VRTX staked, with a linear increase to 2.5 voVRTX per VRTX over 183 days.
 */

/**
 * Calculates the time, in seconds, of when the maximum staking score will be reached
 * @param lastActionTime Time of last stake/unstake action in seconds
 */
export function calcTimeOfMaxStakingScore(lastActionTime: BigDecimal) {
  return lastActionTime.plus(TimeInSeconds.DAY * 183);
}

/**
 * Calculates the minimum & maximum voVRTX attainable from the amount of VRTX staked
 */
export function calcStakingScoreRange(amountStaked: BigDecimal): {
  min: BigDecimal;
  max: BigDecimal;
} {
  return {
    min: amountStaked,
    max: amountStaked.multipliedBy(2.5),
  };
}

// All values should be already decimal adjusted (i.e. after removeDecimals)
interface CalcStakingAprParams {
  referenceWeeklyUsdcDistribution: BigDecimal;
  totalStakingScore: BigDecimal; // voVRTX
  amountStaked: BigDecimal; // VRTX
  stakingScore: BigDecimal; // voVRTX
  vrtxOraclePrice: BigDecimal;
}

/**
 * Staking rewards are in USDC, the value "staked" is in VRTX, to estimate the "gain" from staking:
 *
 * - USDC earned (per year) per voVRTX = (some 7d total reference distribution of USDC / total voVRTX in pool) * 52 weeks
 * - APR = USDC earned (per year) per voVRTX * (amount voVRTX / amount VRTX)
 */
export function calcStakingApr({
  amountStaked,
  referenceWeeklyUsdcDistribution,
  stakingScore,
  totalStakingScore,
  vrtxOraclePrice,
}: CalcStakingAprParams) {
  const usdcEarnedPerYearPerUnitScore = safeDiv(
    referenceWeeklyUsdcDistribution,
    totalStakingScore,
  ).multipliedBy(52);

  return usdcEarnedPerYearPerUnitScore.multipliedBy(
    safeDiv(stakingScore, amountStaked.multipliedBy(vrtxOraclePrice)),
  );
}

/**
 * Util fn for calculating the APR range for the overall pool
 */
export function calcStakingAprRange({
  referenceWeeklyUsdcDistribution,
  totalStakingScore,
  vrtxOraclePrice,
}: Pick<
  CalcStakingAprParams,
  'referenceWeeklyUsdcDistribution' | 'totalStakingScore' | 'vrtxOraclePrice'
>): {
  min: BigDecimal;
  max: BigDecimal;
} {
  return mapValues(calcStakingScoreRange(BigDecimals.ONE), (score) => {
    return calcStakingApr({
      referenceWeeklyUsdcDistribution,
      totalStakingScore,
      vrtxOraclePrice,
      amountStaked: BigDecimals.ONE,
      stakingScore: score,
    });
  });
}

// 50% of protocol fees go toward stakers
export const STAKING_REWARDS_FEE_SHARE = 0.5;
