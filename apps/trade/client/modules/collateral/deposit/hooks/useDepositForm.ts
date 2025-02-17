import { MutationStatus } from '@tanstack/react-query';
import { QUOTE_PRODUCT_ID } from '@vertex-protocol/client';
import { SubaccountTx } from '@vertex-protocol/engine-client';
import {
  addDecimals,
  BigDecimal,
  BigDecimals,
  toBigDecimal,
} from '@vertex-protocol/utils';
import {
  InputValidatorFn,
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useExecuteApproveAllowanceForProduct } from 'client/hooks/execute/useExecuteApproveAllowanceForProduct';
import { useExecuteDepositCollateral } from 'client/hooks/execute/useExecuteDepositCollateral';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useRequiresInitialDeposit } from 'client/hooks/subaccount/useRequiresInitialDeposit';
import {
  OnFractionSelectedHandler,
  useOnFractionSelectedHandler,
} from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDepositFormData } from 'client/modules/collateral/deposit/hooks/useDepositFormData';
import { useDepositFormDisplayedInfoCardType } from 'client/modules/collateral/deposit/hooks/useDepositFormDisplayedInfoCardType';
import { useDepositFormOnChangeSideEffects } from 'client/modules/collateral/deposit/hooks/useDepositFormOnChangeSideEffects';
import { useDepositFormSubmitHandler } from 'client/modules/collateral/deposit/hooks/useDepositFormSubmitHandler';
import {
  DepositActionButtonState,
  DepositErrorType,
  DepositFormValues,
  DepositInfoCardType,
  DepositProductSelectValue,
} from 'client/modules/collateral/deposit/types';

import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

export interface UseDepositForm {
  // Form errors indicate when to show an input error state
  form: UseFormReturn<DepositFormValues>;
  formError: DepositErrorType | undefined;
  depositCollateralMutationStatus: MutationStatus;
  // Form data
  selectedProduct?: DepositProductSelectValue;
  availableProducts: DepositProductSelectValue[];
  // Parsed amounts
  validAmount?: BigDecimal;
  amountInputValueUsd?: BigDecimal; // $ Value for amount input
  validPercentageAmount?: number;
  // Form state
  displayedInfoCardType: DepositInfoCardType | undefined;
  buttonState: DepositActionButtonState;
  estimateStateTxs: SubaccountTx[];
  isInitialDeposit: boolean;
  validateAmount: InputValidatorFn<string, DepositErrorType>;
  // Handlers
  onFractionSelected: OnFractionSelectedHandler;
  onMaxAmountSelected: () => void;
  onSubmit: () => void;
}

export function useDepositForm({
  initialProductId,
}: {
  initialProductId: number | undefined;
}): UseDepositForm {
  const isInitialDeposit = useRequiresInitialDeposit();

  const useDepositForm = useForm<DepositFormValues>({
    defaultValues: {
      productId: initialProductId ?? QUOTE_PRODUCT_ID,
      amount: '',
      amountSource: 'absolute',
    },
    mode: 'onTouched',
  });
  // Watched inputs
  const percentageAmountInput = useDepositForm.watch('percentageAmount');
  const depositAmountInput = useDepositForm.watch('amount').trim();
  const productIdInput = useDepositForm.watch('productId');

  const amountInputError: DepositErrorType | undefined = watchFormError(
    useDepositForm,
    'amount',
  );

  // Data
  const {
    availableProducts,
    hasLoadedDepositableBalances,
    tokenAllowance,
    selectedProduct,
  } = useDepositFormData({ productIdInput });

  // Validators
  const validateAmount = useCallback<
    InputValidatorFn<string, DepositErrorType>
  >(
    (depositAmount) => {
      if (!depositAmount) {
        return;
      }

      // Check valid input first
      const parsedAmount = positiveBigDecimalValidator.safeParse(depositAmount);
      if (!parsedAmount.success) {
        return 'invalid_input';
      }

      // Check min initial deposit
      if (
        isInitialDeposit &&
        selectedProduct?.decimalAdjustedMinimumInitialDepositAmount &&
        parsedAmount.data.lt(
          selectedProduct.decimalAdjustedMinimumInitialDepositAmount,
        )
      ) {
        return 'below_min';
      }
    },
    [selectedProduct, isInitialDeposit],
  );

  // Parsed Amounts
  const validAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, depositAmountInput);
  }, [depositAmountInput]);

  const validPercentageAmount = useMemo(() => {
    return safeParseForData(percentageValidator, percentageAmountInput);
  }, [percentageAmountInput]);

  // Change effects
  useDepositFormOnChangeSideEffects({
    validAmount,
    validPercentageAmount,
    selectedProduct,
    useDepositForm,
    productIdInput,
  });

  // Mutations
  const executeApproveAllowance = useExecuteApproveAllowanceForProduct();
  const executeDepositCollateral = useExecuteDepositCollateral();

  const { isLoading: isApprovalTxLoading, isSuccess: isApprovalTxSuccess } =
    useOnChainMutationStatus({
      mutationStatus: executeApproveAllowance.status,
      txHash: executeApproveAllowance.data,
    });

  useRunWithDelayOnCondition({
    condition: isApprovalTxSuccess,
    fn: executeApproveAllowance.reset,
    delay: 3000,
  });

  const { isLoading: isDepositTxLoading, isSuccess: isDepositTxSuccess } =
    useOnChainMutationStatus({
      mutationStatus: executeDepositCollateral.status,
      txHash: executeDepositCollateral.data,
    });

  useRunWithDelayOnCondition({
    condition: isDepositTxSuccess,
    fn: executeDepositCollateral.reset,
  });

  // Deposit by default, approve if we don't have enough allowance
  const isApprove = useMemo(() => {
    if (!selectedProduct || !validAmount) {
      return false;
    }
    const decimalAdjustedAmount = addDecimals(
      validAmount,
      selectedProduct.tokenDecimals,
    );

    return tokenAllowance?.lt(decimalAdjustedAmount) ?? false;
  }, [selectedProduct, tokenAllowance, validAmount]);

  // Global form error state
  const formError: DepositErrorType | undefined = useMemo(() => {
    if (selectedProduct == null) {
      return;
    }
    return amountInputError;
  }, [selectedProduct, amountInputError]);

  // Action button state
  const buttonState = useMemo((): DepositActionButtonState => {
    if (isApprovalTxLoading) {
      return 'approve_loading';
    } else if (isDepositTxLoading) {
      return 'loading';
    } else if (isApprovalTxSuccess) {
      return 'approve_success';
    } else if (isDepositTxSuccess) {
      return 'success';
    } else if (!depositAmountInput || !selectedProduct || !!formError) {
      return 'disabled';
    } else if (isApprove) {
      return 'approve_idle';
    } else {
      return 'idle';
    }
  }, [
    isDepositTxLoading,
    isApprovalTxLoading,
    isApprovalTxSuccess,
    isDepositTxSuccess,
    depositAmountInput,
    selectedProduct,
    formError,
    isApprove,
  ]);

  // Formatted deltas for the selected product
  const estimateStateTxs = useMemo((): SubaccountTx[] => {
    // Returning an empty array if no product is selected or form is empty
    if (!selectedProduct || formError || !validAmount) {
      return [];
    }
    const productId = selectedProduct.productId;
    // This does not use token decimals because the query goes to the backend
    const decimalAdjustedAmount = addDecimals(toBigDecimal(validAmount));

    return [
      {
        type: 'apply_delta',
        tx: {
          productId,
          amountDelta: decimalAdjustedAmount,
          vQuoteDelta: BigDecimals.ZERO,
        },
      },
    ];
  }, [selectedProduct, validAmount, formError]);

  const onFractionSelected = useOnFractionSelectedHandler({
    setValue: useDepositForm.setValue,
  });

  // Form submit handler
  const onSubmitForm = useDepositFormSubmitHandler({
    selectedProduct,
    isApprove,
    mutateDepositCollateralAsync: executeDepositCollateral.mutateAsync,
    mutateApproveAllowanceAsync: executeApproveAllowance.mutateAsync,
    useDepositForm,
  });

  const displayedInfoCardType = useDepositFormDisplayedInfoCardType({
    selectedProduct,
    hasLoadedDepositableBalances,
  });

  return {
    form: useDepositForm,
    formError,
    depositCollateralMutationStatus: executeDepositCollateral.status,
    amountInputValueUsd:
      selectedProduct && validAmount
        ? toBigDecimal(validAmount).multipliedBy(selectedProduct.oraclePriceUsd)
        : undefined,
    validPercentageAmount,
    validAmount,
    availableProducts,
    selectedProduct,
    buttonState,
    estimateStateTxs,
    displayedInfoCardType,
    isInitialDeposit,
    validateAmount,
    onFractionSelected,
    onSubmit: useDepositForm.handleSubmit(onSubmitForm),
    onMaxAmountSelected: () => onFractionSelected(1),
  };
}
