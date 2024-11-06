import { BigDecimal } from '@vertex-protocol/client';
import { addDecimals, removeDecimals } from '@vertex-protocol/utils';
import {
  InputValidatorFn,
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useVertexMetadataContext } from '@vertex-protocol/metadata';
import { useExecuteUnstakeVrtx } from 'client/hooks/execute/vrtxToken/useExecuteUnstakeVrtx';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useAccountStakingState } from 'client/hooks/query/vrtxToken/useAccountStakingState';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import {
  OnFractionSelectedHandler,
  useOnFractionSelectedHandler,
} from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { resolvePercentageAmountSubmitValue } from 'client/utils/form/resolvePercentageAmountSubmitValue';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

export type UnstakeVrtxFormErrorType = 'invalid_input' | 'max_exceeded';

export interface UnstakeVrtxFormValues
  extends LinkedPercentageAmountFormValues {}

interface UseUnstakeVrtxForm {
  form: UseFormReturn<UnstakeVrtxFormValues>;
  formError: UnstakeVrtxFormErrorType | undefined;
  estimatedStakeValueUsd: BigDecimal | undefined;
  validAmount: BigDecimal | undefined;
  validPercentageAmount: number | undefined;
  amountVrtxStaked: BigDecimal | undefined;
  buttonState: BaseActionButtonState;
  validateAmount: InputValidatorFn<string, UnstakeVrtxFormErrorType>;
  onFractionSelected: OnFractionSelectedHandler;
  onMaxAmountSelected: () => void;
  onSubmit: () => void;
}

export function useUnstakeVrtxForm(): UseUnstakeVrtxForm {
  const { protocolTokenMetadata } = useVertexMetadataContext();
  const { data: accountStakingState } = useAccountStakingState();
  const { data: vrtxSpotMarket } = useMarket({
    productId: protocolTokenMetadata.productId,
  });
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();
  const amountVrtxStaked = removeDecimals(
    accountStakingState?.amountStaked,
    protocolTokenMetadata.token.tokenDecimals,
  );

  const { trackEvent } = useAnalyticsContext();

  const { dispatchNotification } = useNotificationManagerContext();

  // Form state
  const useUnstakeVrtxForm = useForm<UnstakeVrtxFormValues>({
    defaultValues: {
      amount: '',
      amountSource: 'absolute',
      percentageAmount: 0,
    },
    mode: 'onTouched',
  });

  // Mutation
  const unstakeVrtxMutation = useExecuteUnstakeVrtx();

  const { isLoading: isTxLoading, isSuccess: isTxSuccessful } =
    useOnChainMutationStatus({
      mutationStatus: unstakeVrtxMutation.status,
      txResponse: unstakeVrtxMutation.data,
    });

  useRunWithDelayOnCondition({
    condition: isTxSuccessful,
    fn: unstakeVrtxMutation.reset,
  });

  // Watched state
  const amountInput = useUnstakeVrtxForm.watch('amount');
  const validAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, amountInput);
  }, [amountInput]);

  const amountInputError: UnstakeVrtxFormErrorType | undefined = watchFormError(
    useUnstakeVrtxForm,
    'amount',
  );

  const percentageAmountInput = useUnstakeVrtxForm.watch('percentageAmount');
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

  // Linked inputs
  useLinkedPercentageAmountInputEffects({
    validPercentageAmount,
    validAmount,
    maxAmount: amountVrtxStaked,
    form: useUnstakeVrtxForm,
  });

  // Validation for inputs
  const validateAmount = useCallback(
    (input: string): UnstakeVrtxFormErrorType | undefined => {
      if (!input) {
        return;
      }

      const parsedInput = safeParseForData(positiveBigDecimalValidator, input);
      if (!parsedInput) {
        return 'invalid_input';
      }
      if (amountVrtxStaked && parsedInput.gt(amountVrtxStaked)) {
        return 'max_exceeded';
      }
    },
    [amountVrtxStaked],
  );

  // Global form error state
  const formError: UnstakeVrtxFormErrorType | undefined = amountInputError;

  // Action button state
  const buttonState = useMemo((): BaseActionButtonState => {
    if (isTxSuccessful) {
      return 'success';
    } else if (isTxLoading) {
      return 'loading';
    } else if (formError || !amountInput) {
      return 'disabled';
    } else {
      return 'idle';
    }
  }, [isTxSuccessful, isTxLoading, formError, amountInput]);

  // Handlers
  const onFractionSelected = useOnFractionSelectedHandler({
    setValue: useUnstakeVrtxForm.setValue,
  });

  const onSubmitForm = useCallback(
    (values: UnstakeVrtxFormValues) => {
      const submissionAmount = resolvePercentageAmountSubmitValue(
        values,
        amountVrtxStaked,
      );

      if (submissionAmount.isZero()) {
        console.warn('[useUnstakeVrtxForm] Input is zero');
        return;
      }

      const amountWithDecimals = addDecimals(
        submissionAmount,
        protocolTokenMetadata.token.tokenDecimals,
      ).toFixed();

      const serverExecutionResult = unstakeVrtxMutation.mutateAsync(
        {
          amount: amountWithDecimals,
        },
        {
          onSuccess: () => {
            trackEvent({ type: 'unstake_vrtx', data: {} });
            useUnstakeVrtxForm.resetField('amount');
            useUnstakeVrtxForm.setValue('percentageAmount', 0);
          },
        },
      );
      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Unstake VRTX Failed',
          executionData: { serverExecutionResult },
        },
      });
    },
    [
      amountVrtxStaked,
      protocolTokenMetadata.token.tokenDecimals,
      unstakeVrtxMutation,
      dispatchNotification,
      trackEvent,
      useUnstakeVrtxForm,
    ],
  );

  return {
    form: useUnstakeVrtxForm,
    formError,
    estimatedStakeValueUsd,
    validAmount,
    validPercentageAmount,
    buttonState,
    amountVrtxStaked,
    validateAmount,
    onFractionSelected,
    onMaxAmountSelected: () => onFractionSelected(1),
    onSubmit: useUnstakeVrtxForm.handleSubmit(onSubmitForm),
  };
}
