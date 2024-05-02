import { UseFormReturn } from 'react-hook-form';
import { useEffect } from 'react';
import { SpotOrderFormValues } from 'client/pages/SpotTrading/context/types';

interface Params {
  form: UseFormReturn<SpotOrderFormValues>;
  spotLeverageEnabled: boolean;
}

export function useSpotOrderFormOnChangeSideEffects({
  form,
  spotLeverageEnabled,
}: Params) {
  // Reset amounts on leverage change
  useEffect(
    () => {
      // Reset numerical fields and keep the rest
      form.setValue('percentageAmount', 0);
      form.resetField('assetAmount');
      form.resetField('quoteAmount');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [spotLeverageEnabled],
  );
}
