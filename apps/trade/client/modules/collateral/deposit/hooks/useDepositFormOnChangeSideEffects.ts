import { BigDecimal } from '@vertex-protocol/utils';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import {
  DepositFormValues,
  DepositProductSelectValue,
} from 'client/modules/collateral/deposit/types';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Params {
  useDepositForm: UseFormReturn<DepositFormValues>;
  productIdInput: number;
  selectedProduct: DepositProductSelectValue | undefined;
  validAmount: BigDecimal | undefined;
  validPercentageAmount: number | undefined;
}

export function useDepositFormOnChangeSideEffects({
  useDepositForm,
  productIdInput,
  selectedProduct,
  validAmount,
  validPercentageAmount,
}: Params) {
  // Reset form on product ID change
  useEffect(
    () => {
      useDepositForm.resetField('amount');
      useDepositForm.setValue('percentageAmount', 0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productIdInput],
  );

  useLinkedPercentageAmountInputEffects({
    validAmount,
    validPercentageAmount,
    maxAmount: selectedProduct?.decimalAdjustedWalletBalance,
    form: useDepositForm,
  });
}
