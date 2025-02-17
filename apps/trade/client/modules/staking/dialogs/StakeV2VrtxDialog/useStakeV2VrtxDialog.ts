import {
  usePrimaryChainVertexClient,
  useVertexMetadataContext,
} from '@vertex-protocol/react-client';
import { addDecimals, removeDecimals } from '@vertex-protocol/utils';
import {
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useExecuteStakeV2Vrtx } from 'client/hooks/execute/vrtxToken/useExecuteStakeV2Vrtx';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useAllDepositableTokenBalances } from 'client/hooks/query/subaccount/useAllDepositableTokenBalances';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useFormTokenAllowance } from 'client/hooks/ui/form/useFormTokenAllowance';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import { useOnFractionSelectedHandler } from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { OnChainActionButtonStateWithApproval } from 'client/types/OnChainActionButtonStateWithApproval';
import { resolvePercentageAmountSubmitValue } from 'client/utils/form/resolvePercentageAmountSubmitValue';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { maxUint256 } from 'viem';

export type StakeVrtxFormErrorType = 'invalid_input' | 'max_exceeded';

export type StakeVrtxActionButtonState = OnChainActionButtonStateWithApproval;

export type StakeVrtxFormValues = LinkedPercentageAmountFormValues;

export function useStakeV2VrtxDialog() {
  const { data: allDepositableTokenBalances } =
    useAllDepositableTokenBalances();
  const {
    protocolTokenMetadata: {
      token: {
        symbol: protocolTokenSymbol,
        tokenDecimals: protocolTokenDecimals,
        address: protocolTokenAddress,
        icon: { asset: protocolTokenIcon },
      },
      productId: protocolTokenProductId,
    },
  } = useVertexMetadataContext();
  const { data: vrtxSpotMarket } = useMarket({
    productId: protocolTokenProductId,
  });
  const { dispatchNotification } = useNotificationManagerContext();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const vrtxWalletBalance = useMemo(() => {
    return removeDecimals(
      allDepositableTokenBalances?.[protocolTokenProductId],
      protocolTokenDecimals,
    );
  }, [
    allDepositableTokenBalances,
    protocolTokenDecimals,
    protocolTokenProductId,
  ]);

  // Form state
  const useStakeV2VrtxForm = useForm<StakeVrtxFormValues>({
    defaultValues: {
      amount: '',
      amountSource: 'absolute',
      percentageAmount: 0,
    },
    mode: 'onTouched',
  });

  // Watched state
  const amountInput = useStakeV2VrtxForm.watch('amount');
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
      validAmountWithDecimals: addDecimals(parsedAmount, protocolTokenDecimals),
    };
  }, [amountInput, protocolTokenDecimals]);

  const amountInputError: StakeVrtxFormErrorType | undefined = watchFormError(
    useStakeV2VrtxForm,
    'amount',
  );

  const percentageAmountInput = useStakeV2VrtxForm.watch('percentageAmount');
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
        primaryChainVertexClient?.context.contractAddresses.vrtxStakingV2,
      tokenAddress: protocolTokenAddress,
    });

  // Linked inputs
  useLinkedPercentageAmountInputEffects({
    validPercentageAmount,
    validAmount,
    maxAmount: vrtxWalletBalance,
    form: useStakeV2VrtxForm,
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

  // Handlers
  const onFractionSelected = useOnFractionSelectedHandler({
    setValue: useStakeV2VrtxForm.setValue,
  });

  // Stake mutation state
  const executeStakeV2Vrtx = useExecuteStakeV2Vrtx();
  const stakeV2VrtxMutation = executeStakeV2Vrtx.mutateAsync;

  const { isLoading: isStakeTxLoading, isSuccess: isStakeTxSuccess } =
    useOnChainMutationStatus({
      mutationStatus: executeStakeV2Vrtx.status,
      txHash: executeStakeV2Vrtx.data,
    });

  useRunWithDelayOnCondition({
    condition: isStakeTxSuccess,
    fn: executeStakeV2Vrtx.reset,
  });

  const onSubmitForm = useCallback(
    (values: StakeVrtxFormValues) => {
      const submissionAmount = resolvePercentageAmountSubmitValue(
        values,
        vrtxWalletBalance,
      );

      if (submissionAmount.isZero()) {
        console.warn('[useStakeV2VrtxForm] Input is zero');
        return;
      }

      const amountWithDecimals = addDecimals(
        submissionAmount,
        protocolTokenDecimals,
      ).toFixed();

      if (requiresApproval) {
        approve(maxUint256);
        return;
      } else {
        const serverExecutionResult = stakeV2VrtxMutation(
          {
            amount: amountWithDecimals,
          },
          {
            onSuccess: () => {
              useStakeV2VrtxForm.resetField('amount');
              useStakeV2VrtxForm.setValue('percentageAmount', 0);
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
      protocolTokenDecimals,
      requiresApproval,
      approve,
      stakeV2VrtxMutation,
      dispatchNotification,
      useStakeV2VrtxForm,
    ],
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

  return {
    form: useStakeV2VrtxForm,
    formError,
    vrtxWalletBalance,
    validAmount,
    validPercentageAmount,
    estimatedStakeValueUsd,
    buttonState,
    protocolTokenSymbol,
    protocolTokenIcon,
    protocolTokenProductId,
    validateAmount,
    onFractionSelected,
    onMaxAmountSelected: () => onFractionSelected(1),
    onSubmit: useStakeV2VrtxForm.handleSubmit(onSubmitForm),
  };
}
