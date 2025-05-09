import { useEVMContext } from '@vertex-protocol/react-client';
import { removeDecimals, toBigDecimal } from '@vertex-protocol/utils';
import {
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useDebounce } from 'ahooks';
import { useOnChainMutationStatus } from 'client/hooks/query/useOnChainMutationStatus';
import { useRequiresInitialDeposit } from 'client/hooks/subaccount/useRequiresInitialDeposit';
import { useOnFractionSelectedHandler } from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useExecuteBridgeTokens } from 'client/modules/collateral/bridge/hooks/execute/useExecuteBridgeTokens';
import {
  BridgeFormActionButtonState,
  BridgeFormErrorType,
  BridgeFormValues,
  UseBridgeForm,
} from 'client/modules/collateral/bridge/hooks/form/types';
import { useBridgeFormData } from 'client/modules/collateral/bridge/hooks/form/useBridgeFormData';
import { useBridgeFormOnChangeSideEffects } from 'client/modules/collateral/bridge/hooks/form/useBridgeFormOnChangeSideEffects';
import { useEstimatedBridgeRoute } from 'client/modules/collateral/bridge/hooks/query/useEstimatedBridgeRoute';
import { BridgeRequestParams } from 'client/modules/collateral/bridge/types';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { edgeReferralCodeAtom } from 'client/store/referralsStore';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export function useBridgeForm(): UseBridgeForm {
  const { dispatchNotification } = useNotificationManagerContext();
  const isInitialDeposit = useRequiresInitialDeposit();

  const [edgeReferralCodeAtomValue] = useAtom(edgeReferralCodeAtom);

  const {
    switchConnectedChain,
    chainStatus: { connectedChain, type: chainStatusType },
  } = useEVMContext();

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

  const executeBridgeTokens = useExecuteBridgeTokens();

  const { isLoading: isBridgeTxLoading, isSuccess: isBridgeTxSuccess } =
    useOnChainMutationStatus({
      mutationStatus: executeBridgeTokens.status,
      txHash: executeBridgeTokens.data,
    });

  useRunWithDelayOnCondition({
    condition: isBridgeTxSuccess,
    fn: executeBridgeTokens.reset,
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
    minimumInitialDepositAmount,
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
  const requiresSwitchConnectedChain =
    !!selectedSourceChain && selectedSourceChain.chainId !== connectedChain?.id;

  const bridgeRequestParams = useMemo((): BridgeRequestParams | undefined => {
    if (!validAmount || !selectedSourceToken || !selectedDestinationToken) {
      return;
    }

    return {
      amount: validAmount,
      destinationToken: selectedDestinationToken,
      sourceToken: selectedSourceToken,
      referralCode: edgeReferralCodeAtomValue,
    };
  }, [
    edgeReferralCodeAtomValue,
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
      if (
        isInitialDeposit &&
        minimumInitialDepositAmount &&
        estimatedBridgeRoute
      ) {
        const bridgedAmount = removeDecimals(
          toBigDecimal(estimatedBridgeRoute.route.estimate.toAmount),
          estimatedBridgeRoute.route.estimate.toToken.decimals,
        );
        if (bridgedAmount.lt(minimumInitialDepositAmount)) {
          return 'below_min';
        }
      }
    },
    [
      estimatedBridgeRoute,
      isInitialDeposit,
      minimumInitialDepositAmount,
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
    if (requiresSwitchConnectedChain) {
      return 'requires_switch_connected_chain';
    }
    if (formError || !bridgeRequestParams || !estimatedBridgeRoute) {
      return 'disabled';
    }
    return 'idle';
  }, [
    chainStatusType,
    requiresSwitchConnectedChain,
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
    if (requiresSwitchConnectedChain) {
      switchConnectedChain(selectedSourceChain.chainId);
      // Require another manual action to continue with bridging, given switch chain is async
      return;
    }
    if (!bridgeRequestParams) {
      console.warn('[useBridgeForm] onSubmit called with incomplete form data');
      return;
    }

    const txHashPromise = executeBridgeTokens.mutateAsync(bridgeRequestParams);

    dispatchNotification({
      type: 'bridge_deposit',
      data: {
        amount: bridgeRequestParams.amount,
        sourceChainName: selectedSourceChain?.chainName ?? '',
        sourceTokenSymbol: bridgeRequestParams.sourceToken.symbol,
        txHashPromise,
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
    minimumInitialDepositAmount,
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
