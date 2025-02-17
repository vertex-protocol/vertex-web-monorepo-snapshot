import {
  Label,
  Select,
  SelectOption,
  useSelect,
  UpDownChevronIcon,
} from '@vertex-protocol/web-ui';

interface Props {
  epoch: number | undefined;
  setEpoch: (value: number) => void;
  epochOptions: SelectOption<number>[];
}

export function EpochSelect({ epoch, setEpoch, epochOptions }: Props) {
  const {
    selectOptions,
    selectedOption,
    open,
    onValueChange,
    value,
    onOpenChange,
  } = useSelect({
    selectedValue: epoch,
    onSelectedValueChange: setEpoch,
    options: epochOptions,
  });

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <div className="flex flex-col gap-y-1">
        <Label>Epoch</Label>
        <Select.Trigger
          // min-w is used to prevent layout shifts
          className="min-w-20"
          endIcon={<UpDownChevronIcon open={open} />}
        >
          {selectedOption?.label ?? 'Select'}
        </Select.Trigger>
      </div>
      <Select.Options
        // max-h to make it scrollable and prevent going off screen
        className="max-h-80"
      >
        {selectOptions.map(({ label, value }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}
