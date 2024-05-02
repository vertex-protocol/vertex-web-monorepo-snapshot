import { useSelect } from '@vertex-protocol/web-ui';
import { marketsPageFundingRatePeriodAtom } from 'client/store/marketsPageStore';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

export type FundingRatePeriodID =
  (typeof FUNDING_RATE_DROPDOWN_OPTIONS)[number];

export const FUNDING_RATE_DROPDOWN_OPTIONS = [
  'hourly',
  'daily',
  'annualized',
] as const;

export function useFundingRatePeriodSelect() {
  const [fundingRatePeriod, setFundingRatePeriod] = useAtom(
    marketsPageFundingRatePeriodAtom,
  );

  const options = useMemo(() => {
    return FUNDING_RATE_DROPDOWN_OPTIONS.map((id) => ({
      id,
      label: id,
      value: id,
    }));
  }, []);

  const { selectOptions, open, onValueChange, value, onOpenChange } = useSelect(
    {
      defaultOpen: false,
      selectedValue: fundingRatePeriod,
      onSelectedValueChange: (option) => setFundingRatePeriod(option),
      options,
    },
  );

  return {
    fundingRatePeriod,
    selectOptions,
    open,
    value,
    onOpenChange,
    onValueChange,
  };
}
