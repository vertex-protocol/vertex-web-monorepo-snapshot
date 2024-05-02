import { BigDecimal } from '@vertex-protocol/client';
import { Icons, Select, useSelect } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
import { useMemo } from 'react';
import {
  ORDERBOOK_PRICE_TICK_SPACING_MULTIPLIERS,
  OrderbookPriceTickSpacingMultiplier,
} from '../types';

interface TickSpacingSelectProps {
  priceIncrement: BigDecimal | undefined;
  currentTickSpacing: number;
  tickSpacingMultiplier: OrderbookPriceTickSpacingMultiplier;
  setTickSpacingMultiplier: (
    value: OrderbookPriceTickSpacingMultiplier,
  ) => void;
}

export function TickSpacingSelect({
  priceIncrement,
  tickSpacingMultiplier,
  currentTickSpacing,
  setTickSpacingMultiplier,
}: TickSpacingSelectProps) {
  const options = useMemo(() => {
    return ORDERBOOK_PRICE_TICK_SPACING_MULTIPLIERS.map((multiplier) => ({
      id: multiplier.toFixed(),
      label: priceIncrement?.multipliedBy(multiplier).toFixed() ?? 1,
      value: multiplier,
    }));
  }, [priceIncrement]);

  const {
    selectOptions,
    open,
    onValueChange,
    value,
    defaultOpen,
    onOpenChange,
  } = useSelect({
    defaultOpen: false,
    selectedValue: tickSpacingMultiplier,
    onSelectedValueChange: (option) => setTickSpacingMultiplier(option),
    options,
  });

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      defaultOpen={defaultOpen}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger
        className="text-2xs"
        endIcon={<UpDownChevronIcon open={open} />}
      >
        {currentTickSpacing}
      </Select.Trigger>
      <Select.Options className="w-20" align="end">
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
