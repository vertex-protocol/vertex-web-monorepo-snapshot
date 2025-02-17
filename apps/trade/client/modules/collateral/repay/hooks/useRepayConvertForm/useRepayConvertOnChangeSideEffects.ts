import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  RepayConvertFormValues,
  RepayConvertProductSelectValue,
} from 'client/modules/collateral/repay/hooks/useRepayConvertForm/types';

interface Params {
  form: UseFormReturn<RepayConvertFormValues>;
  availableSourceProducts: RepayConvertProductSelectValue[];
  repayProductIdInput: number;
}

export function useRepayConvertOnChangeSideEffects({
  repayProductIdInput,
  form,
  availableSourceProducts,
}: Params) {
  // Reset source product if there are no available source products
  useEffect(
    () => {
      if (availableSourceProducts.length === 0) {
        form.setValue('sourceProductId', undefined);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [availableSourceProducts],
  );

  // On changing repay product, reset fields
  useEffect(
    () => {
      form.resetField('repayAmount');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [repayProductIdInput],
  );
}
