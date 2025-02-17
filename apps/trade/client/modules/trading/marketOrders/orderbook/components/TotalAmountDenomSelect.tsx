import { Select, UpDownChevronIcon, useSelect } from '@vertex-protocol/web-ui';
import { useMemo } from 'react';

interface Props {
  symbol: string | undefined;
  quoteSymbol: string | undefined;
  showOrderbookTotalInQuote: boolean;
  setShowOrderbookTotalInQuote: (value: boolean) => void;
}

export function TotalAmountDenomSelect({
  symbol,
  quoteSymbol,
  showOrderbookTotalInQuote,
  setShowOrderbookTotalInQuote,
}: Props) {
  const options = useMemo(
    () => [
      {
        label: quoteSymbol ?? '',
        value: 'quote',
      },
      {
        label: symbol ?? '',
        value: 'asset',
      },
    ],
    [quoteSymbol, symbol],
  );

  const selectedValue = showOrderbookTotalInQuote ? 'quote' : 'asset';
  const onSelectedValueChange = (selectedValue: string) =>
    setShowOrderbookTotalInQuote(selectedValue === 'quote');

  const {
    selectOptions,
    selectedOption,
    open,
    onValueChange,
    value,
    onOpenChange,
  } = useSelect({
    selectedValue,
    onSelectedValueChange,
    options,
  });

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
        {selectedOption?.label}
      </Select.Trigger>
      <Select.Options className="min-w-20">
        {selectOptions.map(({ label, value }) => (
          <Select.Option key={value} value={value}>
            {label}
          </Select.Option>
        ))}
      </Select.Options>
    </Select.Root>
  );
}
