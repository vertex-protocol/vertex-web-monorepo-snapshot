import { toBigDecimal } from '@vertex-protocol/utils';
import {
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/web-data';
import { useDebounce } from 'ahooks';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useRequiresInitialDeposit } from 'client/hooks/subaccount/useRequiresInitialDeposit';
import { useOnFractionSelectedHandler } from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useEstimatedBridgeRoute } from 'client/modules/collateral/bridge/hooks/base/useEstimatedBridgeRoute';
import { useExecuteBridgeTokens } from 'client/modules/collateral/bridge/hooks/base/useExecuteBridgeTokens';
import {
  BridgeFormActionButtonState,
  BridgeFormErrorType,
  BridgeFormValues,
  UseBridgeForm,
} from 'client/modules/collateral/bridge/hooks/useBridgeForm/types';
import { useBridgeFormData } from 'client/modules/collateral/bridge/hooks/useBridgeForm/useBridgeFormData';
import { useBridgeFormOnChangeSideEffects } from 'client/modules/collateral/bridge/hooks/useBridgeForm/useBridgeFormOnChangeSideEffects';
import { BridgeRequestParams } from 'client/modules/collateral/bridge/types';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { referralCodeAtom } from 'client/store/rewardsStore';
import { removeDecimals } from 'client/utils/decimalAdjustment';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export function useBridgeForm(): UseBridgeForm {
  const [referralCodeAtomValue] = useAtom(referralCodeAtom);
  const { dispatchNotification } = useNotificationManagerContext();
  const isInitialDeposit = useRequiresInitialDeposit();

  const {
    switchChain,
    chainStatus: { connectedChain, type: chainStatusType },
  } = useEVMContext();
  const { hide } = useDialog();

  const useBridgeForm = useForm<BridgeFormValues>({
    defaultValues: {
      amount: '',
      percentageAmount: 0,
      sourceChainId: 0,
      sourceTokenAddress: '',
      destinationTokenAddress: '',
      amountSource: 'absolute',
    },
    mode: 'onTouched',
  });

  const {
    mutateAsync,
    status: bridgeMutationStatus,
    data: bridgeMutationData,
  } = useExecuteBridgeTokens();

  const { isLoading: isBridgeTxLoading, isSuccess: isBridgeTxSuccess } =
    useOnChainMutationStatus({
      mutationStatus: bridgeMutationStatus,
      txResponse: bridgeMutationData,
    });

  useRunWithDelayOnCondition({
    condition: isBridgeTxSuccess,
    fn: hide,
  });

  // Watched inputs
  const sourceChainId = useBridgeForm.watch('sourceChainId');
  const sourceTokenAddress = useBridgeForm.watch('sourceTokenAddress');
  const destinationTokenAddress = useBridgeForm.watch(
    'destinationTokenAddress',
  );
  const percentageAmountInput = useBridgeForm.watch('percentageAmount');
  const amountInput = useBridgeForm.watch('amount');

  const amountError: BridgeFormErrorType | undefined = watchFormError(
    useBridgeForm,
    'amount',
  );

  const validAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, amountInput);
  }, [amountInput]);

  const validPercentageAmount = useMemo(() => {
    return safeParseForData(percentageValidator, percentageAmountInput);
  }, [percentageAmountInput]);

  const onFractionSelected = useOnFractionSelectedHandler({
    setValue: useBridgeForm.setValue,
  });

  // Form data
  const {
    allSourceChains,
    allSourceTokens,
    selectedSourceChain,
    selectedSourceToken,
    sourceTokenBalance,
    allDestinationTokens,
    selectedDestinationToken,
    minimumDepositAmount,
  } = useBridgeFormData({
    sourceChainId,
    sourceTokenAddress,
    destinationTokenAddress,
  });

  // On change effects
  useBridgeFormOnChangeSideEffects({
    form: useBridgeForm,
    validAmount,
    validPercentageAmount,
    sourceTokenBalance,
    sourceChainId,
    sourceTokenAddress,
    selectedSourceToken,
    allDestinationTokens,
  });

  // Derived form state
  const requiresSwitchChain =
    !!selectedSourceChain && selectedSourceChain.chainId !== connectedChain?.id;

  const bridgeRequestParams = useMemo((): BridgeRequestParams | undefined => {
    if (!validAmount || !selectedSourceToken || !selectedDestinationToken) {
      return;
    }

    return {
      amount: validAmount,
      destinationToken: selectedDestinationToken,
      sourceToken: selectedSourceToken,
      referralCode: referralCodeAtomValue,
    };
  }, [
    referralCodeAtomValue,
    selectedDestinationToken,
    selectedSourceToken,
    validAmount,
  ]);

  // Route estimation
  const debouncedParams = useDebounce(bridgeRequestParams, { wait: 500 });
  const {
    data: estimatedBridgeRoute,
    isLoading: isEstimatingRoute,
    isError: isEstimationError,
  } = useEstimatedBridgeRoute(debouncedParams);

  const formError: BridgeFormErrorType | undefined = amountError;

  // Validators
  const validateAmount = useCallback(
    (input: string): BridgeFormErrorType | undefined => {
      if (!input) {
        return;
      }

      const parsedAmount = safeParseForData(positiveBigDecimalValidator, input);
      if (!parsedAmount) {
        return 'invalid_input';
      }
      if (sourceTokenBalance && sourceTokenBalance.lt(parsedAmount)) {
        return 'max_exceeded';
      }
      if (isInitialDeposit && minimumDepositAmount && estimatedBridgeRoute) {
        const bridgedAmount = removeDecimals(
          toBigDecimal(estimatedBridgeRoute.route.estimate.toAmount),
          estimatedBridgeRoute.route.estimate.toToken.decimals,
        );
        if (bridgedAmount.lt(minimumDepositAmount)) {
          return 'under_min';
        }
      }
    },
    [
      estimatedBridgeRoute,
      isInitialDeposit,
      minimumDepositAmount,
      sourceTokenBalance,
    ],
  );

  const buttonState = useMemo((): BridgeFormActionButtonState => {
    if (isBridgeTxSuccess) {
      return 'success';
    }
    if (chainStatusType === 'switching') {
      return 'switching_chain';
    }
    if (isEstimatingRoute) {
      return 'estimating_route';
    }
    if (isEstimationError) {
      return 'estimation_error';
    }
    if (isBridgeTxLoading) {
      return 'loading';
    }
    if (requiresSwitchChain) {
      return 'requires_switch_chain';
    }
    if (formError || !bridgeRequestParams || !estimatedBridgeRoute) {
      return 'disabled';
    }
    return 'idle';
  }, [
    chainStatusType,
    requiresSwitchChain,
    isEstimatingRoute,
    isEstimationError,
    isBridgeTxLoading,
    isBridgeTxSuccess,
    formError,
    bridgeRequestParams,
    estimatedBridgeRoute,
  ]);

  // Estimated usd value using Estimate.fromAmountUSD
  const estimatedSourceValueUsd = useMemo(
    () =>
      estimatedBridgeRoute?.route.estimate.fromAmountUSD
        ? toBigDecimal(estimatedBridgeRoute.route.estimate.fromAmountUSD)
        : undefined,
    [estimatedBridgeRoute],
  );

  // Form submission
  const onSubmitForm = async () => {
    if (requiresSwitchChain) {
      switchChain(selectedSourceChain.chainId);
      // Require another manual action to continue with bridging, given switch chain is async
      return;
    }
    if (!bridgeRequestParams) {
      console.warn('[useBridgeForm] onSubmit called with incomplete form data');
      return;
    }

    const txResponsePromise = mutateAsync(bridgeRequestParams);

    dispatchNotification({
      type: 'bridge_deposit',
      data: {
        amount: bridgeRequestParams.amount,
        sourceChainName: selectedSourceChain?.chainName ?? '',
        sourceTokenSymbol: bridgeRequestParams.sourceToken.symbol,
        txResponsePromise,
      },
    });
  };

  return {
    form: useBridgeForm,
    formError,
    isInitialDeposit,
    allSourceChains,
    allSourceTokens,
    allDestinationTokens,
    selectedSourceChain,
    selectedSourceToken,
    sourceTokenBalance,
    selectedDestinationToken,
    selectedSourceAmount: validAmount,
    minimumDepositAmount,
    buttonState,
    validPercentageAmount,
    estimatedBridgeRoute,
    estimatedSourceValueUsd,
    validateAmount,
    onSubmit: useBridgeForm.handleSubmit(onSubmitForm),
    onFractionSelected,
    onMaxAmountSelected: () => onFractionSelected(1),
  };
}
