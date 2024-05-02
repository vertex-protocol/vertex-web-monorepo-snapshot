import { BigDecimal } from '@vertex-protocol/utils';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import {
  DepositFormValues,
  DepositProduct,
} from 'client/modules/collateral/deposit/types';
import { depositProductIdAtom } from 'client/store/collateralStore';
import { useAtom } from 'jotai';
import { useEffect } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Params {
  useDepositForm: UseFormReturn<DepositFormValues>;
  productIdInput: number;
  selectedProduct: DepositProduct | undefined;
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
  const [depositProductIdAtomValue] = useAtom(depositProductIdAtom);

  // When the atoms change, update local form state
  useEffect(
    () => {
      useDepositForm.setValue('productId', depositProductIdAtomValue, {
        shouldValidate: true,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [depositProductIdAtomValue],
  );

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
