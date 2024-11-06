import { BigDecimal } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { usePrimaryChainVertexClient } from '@vertex-protocol/react-client';
import { addDecimals, removeDecimals } from '@vertex-protocol/utils';
import {
  InputValidatorFn,
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useExecuteStakeVrtx } from 'client/hooks/execute/vrtxToken/useExecuteStakeVrtx';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useLbaTokenWalletBalances } from 'client/hooks/query/vrtxToken/useLbaTokenWalletBalances';
import { useFormTokenAllowance } from 'client/hooks/ui/form/useFormTokenAllowance';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import {
  OnFractionSelectedHandler,
  useOnFractionSelectedHandler,
} from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { OnChainActionButtonStateWithApproval } from 'client/types/OnChainActionButtonStateWithApproval';
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
  const {
    protocolTokenMetadata: {
      token: protocolToken,
      productId: protocolTokenProductId,
    },
  } = useVertexMetadataContext();
  const { data: lbaTokenWalletBalances } = useLbaTokenWalletBalances();
  const { data: vrtxSpotMarket } = useMarket({
    productId: protocolTokenProductId,
  });
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const { trackEvent } = useAnalyticsContext();

  const vrtxWalletBalance = removeDecimals(
    lbaTokenWalletBalances?.vrtx.balanceAmount,
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

  // Watched state
  const amountInput = useStakeVrtxForm.watch('amount');
  const { validAmount, validAmountWithDecimals } = useMemo(() => {
    const parsedAmount = safeParseForData(
      positiveBigDecimalValidator,
      amountInput,
    );

    if (!parsedAmount) {
      return {};
    }

    return {
      validAmount: parsedAmount,
      validAmountWithDecimals: addDecimals(
        parsedAmount,
        protocolToken.tokenDecimals,
      ),
    };
  }, [amountInput, protocolToken.tokenDecimals]);

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
      .multipliedBy(primaryQuotePriceUsd);
  }, [validAmount, vrtxSpotMarket, primaryQuotePriceUsd]);

  // Token allowance
  const primaryChainVertexClient = usePrimaryChainVertexClient();
  const { requiresApproval, approve, approvalButtonState } =
    useFormTokenAllowance({
      amountWithDecimals: validAmountWithDecimals,
      spenderAddress:
        primaryChainVertexClient?.context.contractAddresses.vrtxStaking,
      tokenAddress: protocolToken.address,
    });

  // Stake mutation state
  const stakeVrtxMutation = useExecuteStakeVrtx();
  const { isLoading: isStakeTxLoading, isSuccess: isStakeTxSuccess } =
    useOnChainMutationStatus({
      mutationStatus: stakeVrtxMutation.status,
      txResponse: stakeVrtxMutation.data,
    });
  useRunWithDelayOnCondition({
    condition: isStakeTxSuccess,
    fn: stakeVrtxMutation.reset,
  });

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
    if (approvalButtonState) {
      return approvalButtonState;
    }
    if (isStakeTxLoading) {
      return 'loading';
    }
    if (isStakeTxSuccess) {
      return 'success';
    }
    if (!amountInput || formError) {
      return 'disabled';
    }
    return 'idle';
  }, [
    formError,
    amountInput,
    approvalButtonState,
    isStakeTxSuccess,
    isStakeTxLoading,
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

      if (requiresApproval) {
        approve(MaxUint256);
        return;
      } else {
        const serverExecutionResult = stakeVrtxMutation.mutateAsync(
          {
            amount: amountWithDecimals,
          },
          {
            onSuccess: () => {
              trackEvent({ type: 'stake_vrtx', data: {} });
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
      requiresApproval,
      approve,
      trackEvent,
      stakeVrtxMutation,
      dispatchNotification,
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
