import { useSelect } from '@vertex-protocol/web-ui';
import {
  UseComboBoxParams,
  UseComboBox,
} from 'client/components/ComboBox/hooks/types';
import { useState } from 'react';

/**
 * Returns search query getter / setter along with utilities from `useSelect`.
 */
export function useComboBox<TIdentifier extends string, TValue>({
  defaultOpen,
  onSelectedValueChange,
  selectedValue,
  options,
}: UseComboBoxParams<TIdentifier, TValue>): UseComboBox<TIdentifier, TValue> {
  const [query, setQuery] = useState('');

  const { onOpenChange, onValueChange, ...rest } = useSelect({
    defaultOpen,
    selectedValue,
    onSelectedValueChange,
    options,
  });

  // Overrides `useSelect`'s onValueChange` so we can also close the popover.
  const handleValueChange = (value: TIdentifier) => {
    onValueChange(value);
    onOpenChange(false);
  };

  return {
    query,
    setQuery,
    onOpenChange,
    onValueChange: handleValueChange,
    ...rest,
  };
}
