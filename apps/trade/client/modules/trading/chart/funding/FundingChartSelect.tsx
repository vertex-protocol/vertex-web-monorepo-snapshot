import { Select, useSelect } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from '@vertex-protocol/web-ui';
import {
  FUNDING_RATE_TIMESPANS,
  FundingRateTimespan,
} from 'client/utils/calcs/funding';
import { useMemo } from 'react';

interface Props {
  timespan: FundingRateTimespan;
  setTimespan: (timespan: FundingRateTimespan) => void;
}

export function FundingChartSelect({ timespan, setTimespan }: Props) {
  const options = useMemo(() => {
    return FUNDING_RATE_TIMESPANS.map((timespan) => {
      const label = {
        hourly: 'Hourly',
        daily: 'Daily',
        annualized: 'Annualized',
      }[timespan];

      return {
        id: timespan,
        label,
        value: timespan,
      };
    });
  }, []);

  const {
    open,
    onValueChange,
    onOpenChange,
    selectedOption,
    selectOptions,
    value,
  } = useSelect({
    selectedValue: timespan,
    onSelectedValueChange: setTimespan,
    options,
  });

  return (
    <Select.Root
      value={value}
      open={open}
      onValueChange={onValueChange}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger endIcon={<UpDownChevronIcon open={open} />}>
        {selectedOption?.label}
      </Select.Trigger>
      <Select.Options align="end">
        {selectOptions.map(({ label, value }) => {
          return (
            <Select.Option value={value} key={label}>
              {label}
            </Select.Option>
          );
        })}
      </Select.Options>
    </Select.Root>
  );
}
