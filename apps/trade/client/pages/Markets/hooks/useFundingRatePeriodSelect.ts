import { useSelect } from '@vertex-protocol/web-ui';
import { marketsPageFundingRatePeriodAtom } from 'client/store/marketsPageStore';
import { FUNDING_RATE_TIMESPANS } from 'client/utils/calcs/funding';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

export function useFundingRatePeriodSelect() {
  const [fundingRatePeriod, setFundingRatePeriod] = useAtom(
    marketsPageFundingRatePeriodAtom,
  );

  const options = useMemo(() => {
    return FUNDING_RATE_TIMESPANS.map((id) => ({
      id,
      label: id,
      value: id,
    }));
  }, []);

  const { selectOptions, open, onValueChange, value, onOpenChange } = useSelect(
    {
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
