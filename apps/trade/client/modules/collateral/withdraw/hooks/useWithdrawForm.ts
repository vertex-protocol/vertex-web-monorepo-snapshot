import { QUOTE_PRODUCT_ID } from '@vertex-protocol/client';
import { SubaccountTx } from '@vertex-protocol/engine-client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import {
  addDecimals,
  BigDecimal,
  BigDecimals,
  removeDecimals,
  toBigDecimal,
} from '@vertex-protocol/utils';
import {
  InputValidatorFn,
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useExecuteWithdrawCollateral } from 'client/hooks/execute/useExecuteWithdrawCollateral';
import { useMaxWithdrawableAmount } from 'client/hooks/query/subaccount/useMaxWithdrawableAmount';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import {
  OnFractionSelectedHandler,
  useOnFractionSelectedHandler,
} from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useIsSmartContractWalletConnected } from 'client/hooks/util/useIsSmartContractWalletConnected';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useWithdrawalsAreDelayed } from 'client/modules/collateral/hooks/useWithdrawalsAreDelayed';
import { useWithdrawFormData } from 'client/modules/collateral/withdraw/hooks/useWithdrawFormData';
import {
  WithdrawErrorType,
  WithdrawFormValues,
  WithdrawProductSelectValue,
} from 'client/modules/collateral/withdraw/types';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { resolvePercentageAmountSubmitValue } from 'client/utils/form/resolvePercentageAmountSubmitValue';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { roundToString } from 'client/utils/rounding';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

interface UseWithdrawForm {
  // Form errors indicate when to show an input error state
  form: UseFormReturn<WithdrawFormValues>;
  // Error for the info box
  formError: WithdrawErrorType | undefined;
  // $ Value for amount input
  amountInputValueUsd: BigDecimal | undefined;
  validPercentageAmount: number | undefined;
  availableProducts: WithdrawProductSelectValue[];
  withdrawMutation: ReturnType<typeof useExecuteWithdrawCollateral>;
  showGasWarning: boolean;
  showOneClickTradingPrompt: boolean;
  selectedProduct: WithdrawProductSelectValue | undefined;
  selectedProductMaxWithdrawable: BigDecimal | undefined;
  buttonState: BaseActionButtonState;
  estimateStateTxs: SubaccountTx[];
  enableBorrows: boolean;
  suggestBorrowing: boolean;
  isProtocolTokenSelected: boolean;
  validateAmount: InputValidatorFn<string, WithdrawErrorType>;
  onFractionSelected: OnFractionSelectedHandler;
  onMaxAmountSelected: () => void;
  onEnableBorrowsChange: (enabled: boolean) => void;
  onSubmit: () => void;
}

export function useWithdrawForm({
  defaultEnableBorrows,
  initialProductId,
}: {
  defaultEnableBorrows: boolean;
  initialProductId: number | undefined;
}): UseWithdrawForm {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { dispatchNotification } = useNotificationManagerContext();
  const areWithdrawalsDelayed = useWithdrawalsAreDelayed();

  const isSmartContractWallet = useIsSmartContractWalletConnected();
  const isSingleSignature = useIsSingleSignatureSession({
    requireActive: true,
  });
  const showOneClickTradingPrompt = Boolean(
    isSmartContractWallet && !isSingleSignature,
  );

  const executeWithdrawCollateral = useExecuteWithdrawCollateral();

  useRunWithDelayOnCondition({
    condition: executeWithdrawCollateral.isSuccess,
    fn: executeWithdrawCollateral.reset,
  });

  // Form state
  const useWithdrawForm = useForm<WithdrawFormValues>({
    defaultValues: {
      productId: initialProductId ?? QUOTE_PRODUCT_ID,
      amount: '',
      amountSource: 'absolute',
      enableBorrows: defaultEnableBorrows,
    },
    mode: 'onTouched',
  });

  // Watched inputs
  const percentageAmountInput = useWithdrawForm.watch('percentageAmount');
  const withdrawAmountInput = useWithdrawForm.watch('amount').trim();
  const productIdInput = useWithdrawForm.watch('productId');
  const enableBorrows = useWithdrawForm.watch('enableBorrows');

  const amountInputError: WithdrawErrorType | undefined = watchFormError(
    useWithdrawForm,
    'amount',
  );

  const { availableProducts, selectedProduct } = useWithdrawFormData({
    productIdInput,
  });

  // Max withdrawable
  const { data: maxWithdrawable } = useMaxWithdrawableAmount({
    productId: selectedProduct?.productId,
    spotLeverage: enableBorrows,
  });
  const decimalAdjustedMaxWithdrawableWithFee = useMemo(() => {
    if (!maxWithdrawable || !selectedProduct) {
      return;
    }
    if (maxWithdrawable.isZero()) {
      return BigDecimals.ZERO;
    }
    // Backend returns max withdrawable exclusive of fee
    // The frontend input is the amount withdrawn inclusive of fee, so we need to add the fee to the backend data
    return removeDecimals(maxWithdrawable).plus(selectedProduct.fee.amount);
  }, [maxWithdrawable, selectedProduct]);

  // Util derived data
  const minInput = selectedProduct?.fee?.amount ?? BigDecimals.ZERO;
  const maxInput = decimalAdjustedMaxWithdrawableWithFee ?? BigDecimals.ZERO;

  // Parsed Amounts
  const validAmount = useMemo((): BigDecimal | undefined => {
    return safeParseForData(positiveBigDecimalValidator, withdrawAmountInput);
  }, [withdrawAmountInput]);

  const validPercentageAmount = useMemo(() => {
    return safeParseForData(percentageValidator, percentageAmountInput);
  }, [percentageAmountInput]);

  // Reset form on borrow toggle or product ID change
  useEffect(
    () => {
      useWithdrawForm.resetField('amount');
      useWithdrawForm.setValue('percentageAmount', 0);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [productIdInput, enableBorrows],
  );

  // Linked inputs for amount & percentage
  useLinkedPercentageAmountInputEffects({
    validAmount,
    validPercentageAmount,
    maxAmount: maxInput,
    form: useWithdrawForm,
  });

  // Validation for inputs
  const validateAmount = useCallback(
    (input: string): WithdrawErrorType | undefined => {
      if (selectedProduct == null || !input) {
        return;
      }
      const positiveBigDecimalValidation =
        positiveBigDecimalValidator.safeParse(input);
      // Check valid input first
      if (!positiveBigDecimalValidation.success) {
        return 'invalid_input';
      }

      const parsedInput = positiveBigDecimalValidation.data;

      // Check min
      if (toBigDecimal(parsedInput).lte(minInput)) {
        return 'below_min';
      }
      // Then check max
      if (toBigDecimal(parsedInput).gt(maxInput)) {
        return 'max_exceeded';
      }
    },
    [maxInput, minInput, selectedProduct],
  );

  const isProtocolTokenSelected =
    selectedProduct?.productId === protocolTokenMetadata.productId;

  // Global form error state
  const formError: WithdrawErrorType | undefined = useMemo(() => {
    // Trigger the other validations only after user has interacted with the form,
    if (selectedProduct == null) {
      return;
    }

    // If the user has selected VRTX and is borrowing, show an error
    if (isProtocolTokenSelected && enableBorrows) {
      return 'vrtx_borrow';
    }

    return amountInputError;
  }, [
    selectedProduct,
    enableBorrows,
    isProtocolTokenSelected,
    amountInputError,
  ]);

  const onFractionSelected = useOnFractionSelectedHandler({
    setValue: useWithdrawForm.setValue,
  });

  const onEnableBorrowsChange = (enabled: boolean) => {
    useWithdrawForm.setValue('enableBorrows', enabled);
  };

  // Button state
  const buttonState = useMemo((): BaseActionButtonState => {
    if (executeWithdrawCollateral.isPending) {
      return 'loading';
    } else if (executeWithdrawCollateral.isSuccess) {
      return 'success';
    } else if (!withdrawAmountInput || !selectedProduct || formError) {
      return 'disabled';
    } else {
      return 'idle';
    }
  }, [
    executeWithdrawCollateral.isPending,
    executeWithdrawCollateral.isSuccess,
    withdrawAmountInput,
    selectedProduct,
    formError,
  ]);

  // Formatted deltas for the selected product
  const estimateStateTxs = useMemo((): SubaccountTx[] => {
    // Returning an empty array if no product is selected or form is empty
    if (!selectedProduct || formError || !validAmount) {
      return [];
    }

    const decimalAdjustedInputAmount = addDecimals(validAmount);
    return [
      {
        type: 'apply_delta',
        tx: {
          productId: selectedProduct.productId,
          amountDelta: decimalAdjustedInputAmount.negated(),
          vQuoteDelta: BigDecimals.ZERO,
        },
      },
    ];
  }, [formError, selectedProduct, validAmount]);

  // Form submit handler
  const onSubmitForm = useCallback(
    (values: WithdrawFormValues) => {
      if (selectedProduct == null) {
        console.warn('No selected product');
        return;
      }

      // No-op if there is no input, this prevents users from clicking on success button states
      if (!values.amount) {
        return;
      }

      const inputAmount = resolvePercentageAmountSubmitValue(
        values,
        decimalAdjustedMaxWithdrawableWithFee,
      );
      // Amount submitted via form is inclusive of fee, but the amount in tx is exclusive
      const amountToWithdraw = inputAmount.minus(selectedProduct.fee.amount);
      if (amountToWithdraw.lte(0)) {
        console.warn('Invalid withdrawal amount', amountToWithdraw);
        return;
      }

      const decimalAdjustedAmountToWithdraw = addDecimals(
        amountToWithdraw,
        selectedProduct.tokenDecimals,
      );

      const serverExecutionResult = executeWithdrawCollateral.mutateAsync(
        {
          productId: selectedProduct.productId,
          amount: roundToString(decimalAdjustedAmountToWithdraw, 0),
          spotLeverage: enableBorrows ?? false,
        },
        {
          // Reset the form on success
          onSuccess: () => {
            // Calling setValue instead of resetField because we never registered percentageAmount
            useWithdrawForm.setValue('percentageAmount', 0);
            useWithdrawForm.resetField('amount');
            useWithdrawForm.resetField('amountSource');
          },
        },
      );

      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Withdraw Failed',
          executionData: {
            serverExecutionResult,
          },
        },
      });
    },
    [
      decimalAdjustedMaxWithdrawableWithFee,
      dispatchNotification,
      enableBorrows,
      executeWithdrawCollateral,
      selectedProduct,
      useWithdrawForm,
    ],
  );

  return {
    form: useWithdrawForm,
    suggestBorrowing: !enableBorrows && !isProtocolTokenSelected,
    formError,
    amountInputValueUsd:
      selectedProduct && validAmount
        ? toBigDecimal(validAmount).multipliedBy(selectedProduct.oraclePriceUsd)
        : undefined,
    withdrawMutation: executeWithdrawCollateral,
    showGasWarning: areWithdrawalsDelayed,
    showOneClickTradingPrompt,
    validPercentageAmount,
    availableProducts,
    selectedProduct,
    selectedProductMaxWithdrawable: decimalAdjustedMaxWithdrawableWithFee,
    buttonState,
    estimateStateTxs,
    enableBorrows,
    isProtocolTokenSelected,
    validateAmount,
    onFractionSelected,
    onMaxAmountSelected: () => onFractionSelected(1),
    onEnableBorrowsChange,
    onSubmit: useWithdrawForm.handleSubmit(onSubmitForm),
  };
}
