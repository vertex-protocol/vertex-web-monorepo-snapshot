import { Select } from '@vertex-protocol/web-ui';
import { useAtomControlledSelect } from 'client/hooks/ui/select/useAtomControlledSelect';
import { TradingTabFilters } from 'client/modules/trading/layout/types';
import { useMemo } from 'react';

export function TradingTabFilterSelect({
  filters,
}: {
  filters: TradingTabFilters;
}) {
  const options = useMemo(
    () =>
      filters.options.map(({ id, name }) => ({
        label: name,
        value: id,
        id,
      })),
    [filters.options],
  );

  const {
    selectedOption,
    selectOptions,
    open,
    onValueChange,
    value,
    defaultOpen,
    onOpenChange,
  } = useAtomControlledSelect({
    valueAtom: filters.valueAtom,
    defaultOpen: false,
    options,
  });

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      defaultOpen={defaultOpen}
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
