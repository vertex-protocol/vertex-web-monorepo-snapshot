import { BigDecimal } from '@vertex-protocol/client';
import { Select, UpDownChevronIcon, useSelect } from '@vertex-protocol/web-ui';
import {
  ORDERBOOK_PRICE_TICK_SPACING_MULTIPLIERS,
  OrderbookPriceTickSpacingMultiplier,
} from 'client/modules/trading/marketOrders/orderbook/types';
import { useMemo } from 'react';

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
      label: priceIncrement?.multipliedBy(multiplier).toFixed() ?? 1,
      value: multiplier,
    }));
  }, [priceIncrement]);

  const { selectOptions, open, onValueChange, value, onOpenChange } = useSelect(
    {
      selectedValue: tickSpacingMultiplier,
      onSelectedValueChange: setTickSpacingMultiplier,
      options,
    },
  );

  return (
    <Select.Root
      open={open}
      onValueChange={onValueChange}
      value={value}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger
        className="text-2xs"
        endIcon={<UpDownChevronIcon open={open} />}
      >
        {currentTickSpacing}
      </Select.Trigger>
      <Select.Options className="min-w-20" align="end">
        {selectOptions.map(({ label, value }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}
