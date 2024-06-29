import { Select, useSelect } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { useTradingCompetitionContext } from 'client/pages/TradingCompetition/context/TradingCompetitionContext';
import { range } from 'lodash';
import { useMemo } from 'react';

interface Params {
  period: number;
  setPeriod: (n: number) => void;
}

export function TradingCompetitionPeriodSelect({ period, setPeriod }: Params) {
  const {
    selectOptions,
    selectedOption,
    open,
    onOpenChange,
    value,
    onValueChange,
  } = useTradingCompetitionPeriodSelect({ period, setPeriod });

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger
        className="capitalize"
        endIcon={<UpDownChevronIcon open={open} />}
      >
        {selectedOption?.label}
      </Select.Trigger>
      <Select.Options>
        {selectOptions.map(({ label, value }) => (
          <Select.Option key={value} value={value} className="capitalize">
            {label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}

function useTradingCompetitionPeriodSelect({ period, setPeriod }: Params) {
  const {
    config: { periodLabel },
    currentPeriod,
  } = useTradingCompetitionContext();

  const options = useMemo(() => {
    // By the time this hook is ran, `currentPeriod` should exist, so this is mainly for TS's sake.
    if (!currentPeriod) {
      return [];
    }

    // Only show periods up to the current period.
    return range(1, currentPeriod + 1).map((id) => ({
      id: `${id}`,
      label: `${periodLabel} ${id}`,
      value: id,
    }));
  }, [periodLabel, currentPeriod]);

  const {
    selectOptions,
    open,
    onValueChange,
    value,
    onOpenChange,
    selectedOption,
  } = useSelect({
    defaultOpen: false,
    selectedValue: period,
    onSelectedValueChange: (option) => setPeriod(option),
    options,
  });

  return {
    selectOptions,
    selectedOption,
    open,
    value,
    onOpenChange,
    onValueChange,
  };
}
