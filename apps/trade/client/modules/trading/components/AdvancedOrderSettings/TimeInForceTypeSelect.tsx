import { Select, useSelect } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from '@vertex-protocol/web-ui';
import { TimeInForceType } from 'client/modules/trading/types';

interface Props {
  timeInForceType: TimeInForceType;
  setTimeInForceType: (value: TimeInForceType) => void;
}

const TIME_IN_FORCE_OPTIONS: {
  id: TimeInForceType;
  label: string;
  value: TimeInForceType;
}[] = [
  {
    id: 'good_until',
    label: 'Good Until',
    value: 'good_until',
  },
  {
    id: 'ioc',
    label: 'IOC',
    value: 'ioc',
  },
  {
    id: 'fok',
    label: 'FOK',
    value: 'fok',
  },
];

export function TimeInForceTypeSelect({
  timeInForceType,
  setTimeInForceType,
}: Props) {
  const {
    selectOptions,
    selectedOption,
    open,
    onValueChange,
    value,
    onOpenChange,
  } = useSelect({
    selectedValue: timeInForceType,
    onSelectedValueChange: (option) => setTimeInForceType(option),
    options: TIME_IN_FORCE_OPTIONS,
  });

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger endIcon={<UpDownChevronIcon open={open} />}>
        {selectedOption?.label}
      </Select.Trigger>
      <Select.Options className="w-28">
        {selectOptions.map(({ label, value }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}
