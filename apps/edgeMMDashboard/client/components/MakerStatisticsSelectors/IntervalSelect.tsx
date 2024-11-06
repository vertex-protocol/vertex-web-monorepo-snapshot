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
  intervalOptions: SelectOption<string, number>[];
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
    onSelectedValueChange: (option) => setInterval(option),
    options: intervalOptions,
  });

  // min-w used to prevent layout shifts. It's shared between trigger and options to keep them aligned.
  const sharedClassNames = 'min-w-32';

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
          className={sharedClassNames}
          endIcon={<UpDownChevronIcon open={open} />}
        >
          {selectedOption?.label ?? 'Select'}
        </Select.Trigger>
      </div>
      <Select.Options className={sharedClassNames}>
        {selectOptions.map(({ label, value }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}
