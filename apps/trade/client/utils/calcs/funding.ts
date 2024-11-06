import { BigDecimal } from '@vertex-protocol/client';

export type FundingRates = Record<FundingRateTimespan, BigDecimal>;

export const FUNDING_RATE_TIMESPANS = [
  'hourly',
  'daily',
  'annualized',
] as const;

export type FundingRateTimespan = (typeof FUNDING_RATE_TIMESPANS)[number];

/* Get a FundingRates object from a plain dailyFundingRate BigDecimal */
export function getFundingRates(dailyFundingRate: BigDecimal): FundingRates {
  return {
    hourly: dailyFundingRate.div(24),
    daily: dailyFundingRate,
    annualized: dailyFundingRate.multipliedBy(365),
  };
}
