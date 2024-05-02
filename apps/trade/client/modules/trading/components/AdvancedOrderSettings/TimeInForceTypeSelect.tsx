import { Icons, Select, useSelect } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { TimeInForceType } from '../../types';

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
    defaultOpen,
    onOpenChange,
  } = useSelect({
    defaultOpen: false,
    selectedValue: timeInForceType,
    onSelectedValueChange: (option) => setTimeInForceType(option),
    options: TIME_IN_FORCE_OPTIONS,
  });

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger endIcon={<UpDownChevronIcon open={open} />}>
        {selectedOption?.label}
      </Select.Trigger>
      <Select.Options className="w-28">
        {selectOptions.map(({ label, value }) => (
          <Select.Option
            key={value}
            value={value}
            selectionEndIcon={<Icons.MdCheck />}
          >
            {label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}
