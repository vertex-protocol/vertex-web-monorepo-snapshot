import { BigDecimal } from '@vertex-protocol/client';
import {
  InputValidatorFn,
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useVertexMetadataContext } from 'client/context/vertexMetadata/VertexMetadataContext';
import { useExecuteApproveStakingVrtxAllowance } from 'client/hooks/execute/vrtxToken/useExecuteApproveStakingVrtxAllowance';
import { useExecuteStakeVrtx } from 'client/hooks/execute/vrtxToken/useExecuteStakeVrtx';
import { useMarket } from 'client/hooks/markets/useMarket';
import { useQuotePriceUsd } from 'client/hooks/markets/useQuotePriceUsd';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useLbaTokenWalletBalances } from 'client/hooks/query/vrtxToken/useLbaTokenWalletBalances';
import { useStakingVrtxAllowance } from 'client/hooks/query/vrtxToken/useStakingVrtxAllowance';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import {
  OnFractionSelectedHandler,
  useOnFractionSelectedHandler,
} from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { OnChainActionButtonStateWithApproval } from 'client/types/OnChainActionButtonStateWithApproval';
import { addDecimals, removeDecimals } from 'client/utils/decimalAdjustment';
import { resolvePercentageAmountSubmitValue } from 'client/utils/form/resolvePercentageAmountSubmitValue';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { MaxUint256 } from 'ethers';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

export type StakeVrtxFormErrorType = 'invalid_input' | 'max_exceeded';

export type StakeVrtxActionButtonState = OnChainActionButtonStateWithApproval;

export interface StakeVrtxFormValues extends LinkedPercentageAmountFormValues {}

interface UseStakeVrtxForm {
  form: UseFormReturn<StakeVrtxFormValues>;
  formError: StakeVrtxFormErrorType | undefined;
  vrtxWalletBalance: BigDecimal | undefined;
  estimatedStakeValueUsd: BigDecimal | undefined;
  validAmount: BigDecimal | undefined;
  validPercentageAmount: number | undefined;
  buttonState: StakeVrtxActionButtonState;
  protocolTokenProductId: number;
  validateAmount: InputValidatorFn<string, StakeVrtxFormErrorType>;
  onFractionSelected: OnFractionSelectedHandler;
  onMaxAmountSelected: () => void;
  onSubmit: () => void;
}

export function useStakeVrtxForm(): UseStakeVrtxForm {
  const { protocolTokenProductId, protocolToken } = useVertexMetadataContext();
  const { data: lbaTokenWalletBalances } = useLbaTokenWalletBalances();
  const { data: stakingVrtxAllowance } = useStakingVrtxAllowance();
  const { data: vrtxSpotMarket } = useMarket({
    productId: protocolTokenProductId,
  });
  const quotePriceUsd = useQuotePriceUsd();
  const { hide } = useDialog();

  const vrtxWalletBalance = removeDecimals(
    lbaTokenWalletBalances?.vrtx.balanceAmount,
    protocolToken.tokenDecimals,
  );
  const vrtxAllowance = removeDecimals(
    stakingVrtxAllowance,
    protocolToken.tokenDecimals,
  );

  const { dispatchNotification } = useNotificationManagerContext();

  // Form state
  const useStakeVrtxForm = useForm<StakeVrtxFormValues>({
    defaultValues: {
      amount: '',
      amountSource: 'absolute',
      percentageAmount: 0,
    },
    mode: 'onTouched',
  });

  // Mutations
  const approveMutation = useExecuteApproveStakingVrtxAllowance();

  const { isLoading: isApprovalTxLoading, isSuccess: isApprovalTxSuccess } =
    useOnChainMutationStatus({
      mutationStatus: approveMutation.status,
      txResponse: approveMutation.data,
    });

  useRunWithDelayOnCondition({
    condition: isApprovalTxSuccess,
    fn: approveMutation.reset,
    delay: 3000,
  });

  const stakeVrtxMutation = useExecuteStakeVrtx();

  const { isLoading: isStakeTxLoading, isSuccess: isStakeTxSuccess } =
    useOnChainMutationStatus({
      mutationStatus: stakeVrtxMutation.status,
      txResponse: stakeVrtxMutation.data,
    });

  useRunWithDelayOnCondition({
    condition: isStakeTxSuccess,
    fn: hide,
  });

  // Watched state
  const amountInput = useStakeVrtxForm.watch('amount');
  const validAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, amountInput);
  }, [amountInput]);

  const amountInputError: StakeVrtxFormErrorType | undefined = watchFormError(
    useStakeVrtxForm,
    'amount',
  );

  const percentageAmountInput = useStakeVrtxForm.watch('percentageAmount');
  const validPercentageAmount = useMemo(() => {
    return safeParseForData(percentageValidator, percentageAmountInput);
  }, [percentageAmountInput]);

  const estimatedStakeValueUsd = useMemo(() => {
    if (!validAmount || !vrtxSpotMarket) {
      return;
    }
    return validAmount
      .multipliedBy(vrtxSpotMarket.product.oraclePrice)
      .multipliedBy(quotePriceUsd);
  }, [validAmount, vrtxSpotMarket, quotePriceUsd]);

  // Derive approval state
  const isApprove = Boolean(validAmount && vrtxAllowance?.lt(validAmount));

  // Linked inputs
  useLinkedPercentageAmountInputEffects({
    validPercentageAmount,
    validAmount,
    maxAmount: vrtxWalletBalance,
    form: useStakeVrtxForm,
  });

  // Validation for inputs
  const validateAmount = useCallback(
    (input: string): StakeVrtxFormErrorType | undefined => {
      if (!input) {
        return;
      }

      const parsedInput = safeParseForData(positiveBigDecimalValidator, input);
      if (!parsedInput) {
        return 'invalid_input';
      }
      if (vrtxWalletBalance && parsedInput.gt(vrtxWalletBalance)) {
        return 'max_exceeded';
      }
    },
    [vrtxWalletBalance],
  );

  // Global form error state
  const formError: StakeVrtxFormErrorType | undefined = amountInputError;

  // Action button state
  const buttonState = useMemo((): StakeVrtxActionButtonState => {
    if (isStakeTxSuccess) {
      return 'success';
    } else if (isApprovalTxSuccess) {
      return 'approve_success';
    } else if (isStakeTxLoading) {
      return 'loading';
    } else if (isApprovalTxLoading) {
      return 'approve_loading';
    } else if (formError || !amountInput) {
      return 'disabled';
    } else if (isApprove) {
      return 'approve_idle';
    } else {
      return 'idle';
    }
  }, [
    isStakeTxSuccess,
    isApprovalTxSuccess,
    isStakeTxLoading,
    isApprovalTxLoading,
    formError,
    amountInput,
    isApprove,
  ]);

  // Handlers
  const onFractionSelected = useOnFractionSelectedHandler({
    setValue: useStakeVrtxForm.setValue,
  });

  const onSubmitForm = useCallback(
    (values: StakeVrtxFormValues) => {
      const submissionAmount = resolvePercentageAmountSubmitValue(
        values,
        vrtxWalletBalance,
      );

      if (submissionAmount.isZero()) {
        console.warn('[useStakeVrtxForm] Input is zero');
        return;
      }

      const amountWithDecimals = addDecimals(
        submissionAmount,
        protocolToken.tokenDecimals,
      ).toFixed();

      if (isApprove) {
        const serverExecutionResult = approveMutation.mutateAsync({
          amount: MaxUint256,
        });
        dispatchNotification({
          type: 'action_error_handler',
          data: {
            errorNotificationTitle: 'Approve VRTX Failed',
            executionData: { serverExecutionResult },
          },
        });
      } else {
        const serverExecutionResult = stakeVrtxMutation.mutateAsync(
          {
            amount: amountWithDecimals,
          },
          {
            onSuccess: () => {
              useStakeVrtxForm.resetField('amount');
              useStakeVrtxForm.setValue('percentageAmount', 0);
            },
          },
        );
        dispatchNotification({
          type: 'action_error_handler',
          data: {
            errorNotificationTitle: 'Stake VRTX Failed',
            executionData: { serverExecutionResult },
          },
        });
      }
    },
    [
      vrtxWalletBalance,
      protocolToken.tokenDecimals,
      isApprove,
      approveMutation,
      dispatchNotification,
      stakeVrtxMutation,
      useStakeVrtxForm,
    ],
  );

  return {
    form: useStakeVrtxForm,
    formError,
    vrtxWalletBalance,
    validAmount,
    validPercentageAmount,
    estimatedStakeValueUsd,
    buttonState,
    protocolTokenProductId,
    validateAmount,
    onFractionSelected,
    onMaxAmountSelected: () => onFractionSelected(1),
    onSubmit: useStakeVrtxForm.handleSubmit(onSubmitForm),
  };
}
