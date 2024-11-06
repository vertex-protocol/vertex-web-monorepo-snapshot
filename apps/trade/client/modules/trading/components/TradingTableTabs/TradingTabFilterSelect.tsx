import { Select, useSelect } from '@vertex-protocol/web-ui';
import { useSelectedFilterByTradingTableTabSetting } from 'client/modules/trading/components/TradingTableTabs/hooks/useSelectedFilterByTradingTableTabSetting';
import { TradingTabFilters } from 'client/modules/trading/layout/types';
import { useMemo } from 'react';

export function TradingTabFilterSelect({
  filters,
}: {
  filters: TradingTabFilters;
}) {
  const { tradingTableTab, options } = filters;

  const { selectedFilter, setSelectedFilter } =
    useSelectedFilterByTradingTableTabSetting({ tradingTableTab });

  const filterOptions = useMemo(
    () =>
      options.map(({ id, name }) => ({
        label: name,
        value: id,
        id,
      })),
    [options],
  );

  const {
    selectedOption,
    selectOptions,
    open,
    onValueChange,
    value,
    onOpenChange,
  } = useSelect({
    selectedValue: selectedFilter,
    onSelectedValueChange: setSelectedFilter,
    options: filterOptions,
  });

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger className="whitespace-nowrap">
        {selectedOption?.label ?? ''}
      </Select.Trigger>
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
