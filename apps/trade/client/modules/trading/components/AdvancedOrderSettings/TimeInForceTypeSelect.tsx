import {
  Select,
  SelectOption,
  UpDownChevronIcon,
  useSelect,
} from '@vertex-protocol/web-ui';
import { TimeInForceType } from 'client/modules/trading/types';

interface Props {
  timeInForceType: TimeInForceType;
  setTimeInForceType: (value: TimeInForceType) => void;
}

const TIME_IN_FORCE_OPTIONS: SelectOption<TimeInForceType>[] = [
  {
    label: 'Good Until',
    value: 'good_until',
  },
  {
    label: 'IOC',
    value: 'ioc',
  },
  {
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
    onSelectedValueChange: setTimeInForceType,
    options: TIME_IN_FORCE_OPTIONS,
  });

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger
        className="min-w-24"
        endIcon={<UpDownChevronIcon open={open} />}
      >
        {selectedOption?.label}
      </Select.Trigger>
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
