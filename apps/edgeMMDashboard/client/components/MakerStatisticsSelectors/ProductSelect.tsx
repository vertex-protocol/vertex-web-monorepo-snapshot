import { joinClassNames } from '@vertex-protocol/web-common';
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
  productOptions: SelectOption<string, number>[];
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
    onSelectedValueChange: (option) => setProductId(option),
    options: productOptions,
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
        <Label>Market</Label>
        <Select.Trigger
          className={sharedClassNames}
          endIcon={<UpDownChevronIcon open={open} />}
        >
          {selectedOption?.label ?? 'Select'}
        </Select.Trigger>
      </div>

      <Select.Options
        // max-h to make it scrollable and prevent going off screen
        className={joinClassNames(sharedClassNames, 'max-h-80')}
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
