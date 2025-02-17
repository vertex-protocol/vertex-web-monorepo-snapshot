'use client';

import { joinClassNames } from '@vertex-protocol/web-common';
import { Select, useSelect, UpDownChevronIcon } from '@vertex-protocol/web-ui';
import { useChartTimeframe } from 'client/hooks/useChartTimeframe';

export function TimeframeSelect() {
  const { timeframeOptions, timeframe, setTimeframe } = useChartTimeframe();

  const {
    selectOptions,
    selectedOption,
    open,
    onValueChange,
    value,
    onOpenChange,
  } = useSelect({
    selectedValue: timeframe,
    onSelectedValueChange: setTimeframe,
    options: timeframeOptions,
  });

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <div className="flex items-center gap-x-2">
        <div className="text-text-secondary text-nowrap text-sm font-medium">
          Chart timeframe:
        </div>
        <Select.Trigger
          className={joinClassNames(
            'px-0 text-sm',
            'bg-transparent',
            'text-text-primary font-semibold',
          )}
          // Remove default select background on hover.
          stateClassNameOverrides="before:hover:bg-transparent"
          endIcon={<UpDownChevronIcon open={open} />}
        >
          {selectedOption?.label ?? 'Select'}
        </Select.Trigger>
      </div>
      <Select.Options>
        {selectOptions.map(({ label, value }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}
