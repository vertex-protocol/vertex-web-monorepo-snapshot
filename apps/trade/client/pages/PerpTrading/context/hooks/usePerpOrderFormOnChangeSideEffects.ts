import { PerpOrderFormValues } from 'client/pages/PerpTrading/context/types';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Params {
  form: UseFormReturn<PerpOrderFormValues>;
  selectedLeverage: number;
}

export function usePerpOrderFormOnChangeSideEffects({
  form,
  selectedLeverage,
}: Params) {
  // Reset amounts on leverage change
  useEffect(
    () => {
      // Reset amount fields and keep the rest
      form.setValue('percentageAmount', 0);
      form.resetField('assetAmount');
      form.resetField('quoteAmount');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedLeverage],
  );
}
