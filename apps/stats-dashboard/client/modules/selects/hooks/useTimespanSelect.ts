import { useSelect } from 'client/hooks/ui/select/useSelect';
import { timespanAtom } from 'client/store/store';
import { useAtom } from 'jotai';
import { useMemo } from 'react';

export type TimespanOption = (typeof TIMESPAN_DROPDOWN_OPTIONS)[number];

export const TIMESPAN_DROPDOWN_OPTIONS = [
  {
    id: '7d',
    // Values are bumped by 1 because we take the difference of the values - (i.e. charts would only have 6 bars if we keep at 7)
    value: 8,
  },
  {
    id: '30d',
    value: 31,
  },
  {
    id: '90d',
    value: 91,
  },
  {
    id: 'all',
    value: 100,
  },
] as const;

export function useTimespanSelect() {
  const [timespan, setTimespan] = useAtom(timespanAtom);

  const options = useMemo(() => {
    return TIMESPAN_DROPDOWN_OPTIONS.map((timespan) => ({
      id: timespan.id,
      label: timespan.id,
      value: timespan,
    }));
  }, []);

  const { selectOptions, open, onValueChange, value, onOpenChange } = useSelect(
    {
      defaultOpen: false,
      selectedValue: timespan,
      onSelectedValueChange: (option) => setTimespan(option),
      options,
    },
  );

  return {
    timespan,
    selectOptions,
    open,
    value,
    onOpenChange,
    onValueChange,
  };
}
