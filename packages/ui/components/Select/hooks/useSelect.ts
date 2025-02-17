import { SelectValue, UseSelect, UseSelectParams } from './types';
import { useCallback, useMemo, useState } from 'react';

/**
 * Utility hook for Radix controlled select components. Allows for options with arbitrary values, as long as they have
 * a ID field. Mapping to & from the selected option is done internally to this hook. Also controls the open state
 */
export function useSelect<TValue extends SelectValue>({
  defaultOpen,
  onSelectedValueChange,
  selectedValue,
  options,
}: UseSelectParams<TValue>): UseSelect<TValue> {
  const [open, setOpen] = useState(!!defaultOpen);

  // Get currently selected option.
  const selectedOption = useMemo(() => {
    if (selectedValue == null) {
      return;
    }

    return options.find(
      (option) =>
        getSelectValueId(option.value) === getSelectValueId(selectedValue),
    );
  }, [options, selectedValue]);

  // Pass newly selected value to onValueChange.
  const onValueChange = useCallback(
    (newId: string) => {
      const newOption = options.find(
        (option) => getSelectValueId(option.value) === newId,
      );

      if (newOption == null) {
        return;
      }

      onSelectedValueChange(newOption.value);
    },
    [onSelectedValueChange, options],
  );

  const selectOptions = useMemo(() => {
    return options.map((option) => {
      return {
        label: option.label,
        // Radix expects a string value
        value: getSelectValueId(option.value),
        original: option.value,
      };
    });
  }, [options]);

  return {
    open,
    onValueChange,
    value: selectedOption ? getSelectValueId(selectedOption.value) : undefined,
    onOpenChange: setOpen,
    selectOptions,
    selectedOption,
  };
}

function getSelectValueId<TValue extends SelectValue>(value: TValue) {
  return (typeof value === 'object' ? value.selectId : value).toString();
}
