import {
  Label,
  Select,
  SelectOption,
  useSelect,
  UpDownChevronIcon,
} from '@vertex-protocol/web-ui';

interface Props {
  productId: number | undefined;
  setProductId: (value: number) => void;
  productOptions: SelectOption<number>[];
}

export function ProductSelect({
  productId,
  setProductId,
  productOptions,
}: Props) {
  const {
    selectOptions,
    selectedOption,
    open,
    onValueChange,
    value,
    onOpenChange,
  } = useSelect({
    selectedValue: productId,
    onSelectedValueChange: setProductId,
    options: productOptions,
  });

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <div className="flex flex-col gap-y-1">
        <Label sizeVariant="lg">Market</Label>
        <Select.Trigger
          // min-w is used to prevent layout shifts.
          className="min-w-32"
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
