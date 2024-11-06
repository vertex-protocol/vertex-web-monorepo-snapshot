import { Select, UpDownChevronIcon, useSelect } from '@vertex-protocol/web-ui';
import { TpSlPlaceOrderFormValues } from 'client/modules/trading/tpsl/hooks/useTpSlPlaceOrderForm/types';
import { TriggerCriteriaPriceType } from 'client/modules/trading/tpsl/tpslDialog/types';
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<TpSlPlaceOrderFormValues>;
}

const OPTIONS = [
  {
    id: 'last_price',
    label: 'Last Price',
    value: 'last_price',
  },
  {
    id: 'oracle_price',
    label: 'Oracle Price',
    value: 'oracle_price',
  },
] as const;

export function TpSlTriggerCriteriaPriceTypeSelect({ form }: Props) {
  const onSelectedValueChange = useCallback(
    (val: TriggerCriteriaPriceType) =>
      form.setValue('triggerCriteriaPriceType', val),
    [form],
  );

  const {
    open,
    onValueChange,
    onOpenChange,
    selectedOption,
    selectOptions,
    value,
  } = useSelect({
    selectedValue: form.watch('triggerCriteriaPriceType'),
    onSelectedValueChange,
    options: OPTIONS,
  });

  return (
    <Select.Root
      value={value}
      open={open}
      onValueChange={onValueChange}
      onOpenChange={onOpenChange}
    >
      <Select.Trigger endIcon={<UpDownChevronIcon open={open} />}>
        {selectedOption?.label}
      </Select.Trigger>
      <Select.Options align="end">
        {selectOptions.map(({ label, value }) => {
          return (
            <Select.Option value={value} key={label}>
              {label}
            </Select.Option>
          );
        })}
      </Select.Options>
    </Select.Root>
  );
}
