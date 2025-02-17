import { WithClassnames } from '@vertex-protocol/web-common';
import {
  Label,
  Select,
  SelectOption,
  useSelect,
  UpDownChevronIcon,
} from '@vertex-protocol/web-ui';

interface Props extends WithClassnames {
  interval: number;
  setInterval: (value: number) => void;
  intervalOptions: SelectOption<number>[];
}

export function IntervalSelect({
  interval,
  setInterval,
  intervalOptions,
}: Props) {
  const {
    selectOptions,
    selectedOption,
    open,
    onValueChange,
    value,
    onOpenChange,
  } = useSelect({
    selectedValue: interval,
    onSelectedValueChange: setInterval,
    options: intervalOptions,
  });

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <div className="flex flex-col gap-y-1">
        <Label>Interval</Label>
        <Select.Trigger
          // min-w is used to prevent layout shifts
          className="min-w-32"
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
