import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  RepayConvertFormValues,
  RepayConvertProduct,
} from 'client/modules/collateral/repay/hooks/useRepayConvertForm/types';

interface Params {
  depositProductIdAtomValue: number;
  form: UseFormReturn<RepayConvertFormValues>;
  availableSourceProducts: RepayConvertProduct[];
  repayProductIdInput: number;
}

export function useRepayConvertOnChangeSideEffects({
  repayProductIdInput,
  depositProductIdAtomValue,
  form,
  availableSourceProducts,
}: Params) {
  // When the repay product ID atom changes, update form value
  useEffect(() => {
    if (depositProductIdAtomValue == null) {
      return;
    }
    form.setValue('repayProductId', depositProductIdAtomValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [depositProductIdAtomValue]);

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
