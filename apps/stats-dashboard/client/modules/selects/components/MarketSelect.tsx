import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { Select } from '@vertex-protocol/web-ui';
import { useMarketSelect } from '../hooks/useMarketSelect';
import { Icons } from 'client/components/Icons/icons';

export function MarketSelect() {
  const { market, selectOptions, open, onValueChange, value, onOpenChange } =
    useMarketSelect();

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger
        className="border-black-200 bg-black-500 border text-sm"
        endIcon={<UpDownChevronIcon open={open} />}
      >
        <div className="flex gap-x-8">
          <span className="font-semibold text-white">Market:</span>
          {market.name}
        </div>
      </Select.Trigger>
      <Select.Options className="w-48">
        {selectOptions.map(({ label, value }) => (
          <Select.Option
            key={value}
            value={value}
            className="hover:text-white-900 text-sm hover:bg-purple-700"
            selectionEndIcon={<Icons.MdCheck />}
          >
            {label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}
