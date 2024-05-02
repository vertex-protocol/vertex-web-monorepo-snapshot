import { FundingRatePeriodID } from 'client/pages/Markets/hooks/useFundingRatePeriodSelect';
import { atom } from 'jotai';

export const marketsPageFundingRatePeriodAtom =
  atom<FundingRatePeriodID>('hourly');
