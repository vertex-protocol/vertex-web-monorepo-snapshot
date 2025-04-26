import { BigDecimal } from '@vertex-protocol/client';
import { FundingRatePeriod } from 'client/modules/localstorage/userState/types/userFundingRatePeriodTypes';

export type FundingRates = Record<FundingRatePeriod, BigDecimal>;

/* Get a FundingRates object from a plain dailyFundingRate BigDecimal */
export function getFundingRates(dailyFundingRate: BigDecimal): FundingRates {
  return {
    '1h': dailyFundingRate.div(24),
    '8h': dailyFundingRate.div(3),
    '1d': dailyFundingRate,
    '1y': dailyFundingRate.multipliedBy(365),
  };
}
