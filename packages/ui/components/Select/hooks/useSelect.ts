import { UseSelect, UseSelectParams } from './types';
import { useMemo, useState } from 'react';

/**
 * Utility hook for Radix controlled select components. Allows for options with arbitrary values, as long as they have
 * a string ID field. Mapping to & from the selected option is done internally to this hook. Also controls the open state
 */
export function useSelect<TIdentifier extends string, TValue>({
  defaultOpen,
  onSelectedValueChange,
  selectedValue,
  options,
}: UseSelectParams<TIdentifier, TValue>): UseSelect<TIdentifier, TValue> {
  const [open, setOpen] = useState(defaultOpen);

  // Get currently selected option.
  const selectedOption = useMemo(
    () => options.find((option) => option.value === selectedValue),
    [options, selectedValue],
  );

  // Pass newly selected value to onValueChange.
  const onValueChange = (newId: TIdentifier) => {
    const newOption = options.find((option) => option.id === newId);

    if (newOption == null) {
      return;
    }

    onSelectedValueChange(newOption.value);
  };

  const selectOptions = useMemo(() => {
    return options.map((option) => {
      return {
        label: option.label,
        // Radix expects a string value
        value: option.id,
        original: option.value,
      };
    });
  }, [options]);

  return {
    open,
    onValueChange,
    value: selectedOption?.id,
    defaultOpen,
    onOpenChange: setOpen,
    selectOptions,
    selectedOption,
  };
}
