import {
  Select,
  SelectValueWithIdentifier,
  UpDownChevronIcon,
  useSelect,
} from '@vertex-protocol/web-ui';
import { SubaccountQuoteTransferFormValues } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/types';
import { QuoteTransferSubaccount } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/useSubaccountQuoteTransferFormData';
import { useCallback, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

type QuoteTransferSubaccountSelectValue = QuoteTransferSubaccount &
  SelectValueWithIdentifier;

interface Props {
  id: 'senderSubaccountName' | 'recipientSubaccountName';
  form: UseFormReturn<SubaccountQuoteTransferFormValues>;
  subaccounts: QuoteTransferSubaccount[];
  selectedSubaccount: QuoteTransferSubaccount;
  disabled?: boolean;
}

export function SubaccountQuoteTransferSelect({
  id,
  form,
  subaccounts,
  selectedSubaccount,
  disabled,
}: Props) {
  const options = useMemo(() => {
    return subaccounts.map((subaccount) => ({
      label: subaccount.profile.username,
      value: getQuoteTransferSelectValue(subaccount),
    }));
  }, [subaccounts]);

  const onSelectedValueChange = useCallback(
    (option: QuoteTransferSubaccountSelectValue) =>
      form.setValue(id, option.subaccountName),
    [form, id],
  );

  const selectedValue = useMemo(
    () => getQuoteTransferSelectValue(selectedSubaccount),
    [selectedSubaccount],
  );

  const {
    open,
    onOpenChange,
    value,
    onValueChange,
    selectOptions,
    selectedOption,
  } = useSelect({
    selectedValue,
    onSelectedValueChange,
    options,
  });

  const label = id === 'senderSubaccountName' ? 'From' : 'To';

  return (
    <div className="flex items-center justify-center gap-x-2">
      <span className="text-text-tertiary">{label}</span>
      <Select.Root
        open={open}
        value={value}
        onOpenChange={onOpenChange}
        onValueChange={onValueChange}
      >
        <Select.Trigger
          // `max-width` for truncating the label.
          className="bg-surface-1 max-w-28"
          endIcon={<UpDownChevronIcon open={open} />}
          disabled={disabled}
        >
          <span className="truncate">{selectedOption?.label}</span>
        </Select.Trigger>
        <Select.Options>
          {selectOptions.map(({ label, value }) => (
            <Select.Option className="p-2" key={value} value={value}>
              {label}
            </Select.Option>
          ))}
        </Select.Options>
      </Select.Root>
    </div>
  );
}

function getQuoteTransferSelectValue(
  subaccount: QuoteTransferSubaccount,
): QuoteTransferSubaccountSelectValue {
  const { subaccountName } = subaccount;

  return {
    // Use 'empty' as the ID when subaccountName is empty, since the select value cannot be an empty string.
    selectId: subaccountName ? subaccountName : 'empty',
    ...subaccount,
  };
}
