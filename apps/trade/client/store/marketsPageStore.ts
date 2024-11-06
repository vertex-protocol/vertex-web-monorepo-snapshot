import { FundingRateTimespan } from 'client/utils/calcs/funding';
import { atom } from 'jotai';

export const marketsPageFundingRatePeriodAtom =
  atom<FundingRateTimespan>('hourly');
