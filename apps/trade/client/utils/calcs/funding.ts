import { BigDecimal } from '@vertex-protocol/client';

export interface FundingRates {
  hourly: BigDecimal;
  daily: BigDecimal;
  annualized: BigDecimal;
}

/* Get a FundingRates object from a plain dailyFundingRate BigDecimal */
export function getFundingRates(dailyFundingRate: BigDecimal): FundingRates {
  return {
    hourly: dailyFundingRate.div(24),
    daily: dailyFundingRate,
    annualized: dailyFundingRate.multipliedBy(365),
  };
}
