import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { Select } from '@vertex-protocol/web-ui';
import { useTimespanSelect } from '../hooks/useTimespanSelect';
import { Icons } from 'client/components/Icons/icons';

export function TimespanSelect() {
  const { timespan, selectOptions, open, onValueChange, value, onOpenChange } =
    useTimespanSelect();

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger
        className="border-black-200 bg-black-500 border text-sm uppercase"
        endIcon={<UpDownChevronIcon open={open} />}
        // This prevents sorting icon from being clicked
        onClick={(e) => e.stopPropagation()}
      >
        {timespan.id}
      </Select.Trigger>
      <Select.Options className="w-16">
        {selectOptions.map(({ label, value }) => (
          <Select.Option
            key={value}
            value={value}
            className="hover:text-white-900 flex gap-x-2 text-sm uppercase hover:bg-purple-700"
            selectionEndIcon={<Icons.MdCheck />}
          >
            {label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}
