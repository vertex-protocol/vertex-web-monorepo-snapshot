import { Icons, Select, useSelect } from '@vertex-protocol/web-ui';
import { UpDownChevronIcon } from 'client/components/Icons/UpDownChevronIcon';
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
        id: 'quote',
        label: quoteSymbol ?? '',
        value: 'quote',
      },
      {
        id: 'asset',
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
    defaultOpen,
    onOpenChange,
  } = useSelect({
    defaultOpen: false,
    selectedValue,
    onSelectedValueChange,
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
        {selectedOption?.label}
      </Select.Trigger>
      <Select.Options className="min-w-20">
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
