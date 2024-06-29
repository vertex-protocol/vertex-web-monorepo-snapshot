import { addDecimals, BigDecimal, BigDecimals } from '@vertex-protocol/utils';
import {
  InputValidatorFn,
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useExecuteBurnLp } from 'client/hooks/execute/useExecuteBurnLp';
import { useAllMarketsStaticData } from 'client/hooks/markets/useAllMarketsStaticData';
import { useLpYields } from 'client/hooks/markets/useLpYields';
import { useMarket } from 'client/hooks/markets/useMarket';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import {
  LpBalanceItem,
  useLpBalances,
} from 'client/hooks/subaccount/useLpBalances';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import {
  OnFractionSelectedHandler,
  useOnFractionSelectedHandler,
} from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { withdrawLiquidityProductIdAtom } from 'client/store/collateralStore';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { LinkedPercentageAmountFormValues } from 'client/types/linkedPercentageAmountFormTypes';
import { resolvePercentageAmountSubmitValue } from 'client/utils/form/resolvePercentageAmountSubmitValue';
import { watchFormError } from 'client/utils/form/watchFormError';
import { getBaseProductMetadata } from 'client/utils/getBaseProductMetadata';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { roundToString } from 'client/utils/rounding';
import { useAtom } from 'jotai';
import { useCallback, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { PairMetadata, WithdrawLiquidityErrorType } from '../../types';
import { useWithdrawLiquidityValidators } from './useWithdrawLiquidityValidators';

export type WithdrawLiquidityFormValues = LinkedPercentageAmountFormValues;

export interface UseWithdrawLiquidityForm {
  form: UseFormReturn<WithdrawLiquidityFormValues>;
  buttonState: BaseActionButtonState;
  validPercentageAmount: number | undefined;
  currentYield: BigDecimal;
  metadata: PairMetadata | undefined;
  priceIncrement: BigDecimal | undefined;
  currentLpBalance: LpBalanceItem | undefined;
  formError: WithdrawLiquidityErrorType | undefined;
  estimatedChangeAmounts:
    | {
        base: BigDecimal;
        quote: BigDecimal;
        lpTokens: BigDecimal;
        baseValueUsd: BigDecimal;
        quoteValueUsd: BigDecimal;
        lpValueUsd: BigDecimal;
      }
    | undefined;
  validateLpAmount: InputValidatorFn<string, WithdrawLiquidityErrorType>;
  onFractionSelected: OnFractionSelectedHandler;
  onSubmit: () => void;
}

export function useWithdrawLiquidityForm(): UseWithdrawLiquidityForm {
  const [productIdAtomValue] = useAtom(withdrawLiquidityProductIdAtom);
  const { data: marketData } = useMarket({ productId: productIdAtomValue });
  const { data: lpYields } = useLpYields();
  const { balances } = useLpBalances();
  const { data: staticMarketData } = useAllMarketsStaticData();
  const { dispatchNotification } = useNotificationManagerContext();
  const { hide } = useDialog();

  const quoteMetadata = staticMarketData?.primaryQuote;
  const quotePrice = usePrimaryQuotePriceUsd();

  // Mutation to burn LP tokens
  const executeBurnLp = useExecuteBurnLp();

  useRunWithDelayOnCondition({
    condition: executeBurnLp.isSuccess,
    fn: hide,
  });

  /**
   * Form state
   */
  const useWithdrawLiquidityForm = useForm<WithdrawLiquidityFormValues>({
    defaultValues: {
      amountSource: 'absolute',
      amount: '',
      percentageAmount: 0,
    },
    mode: 'onTouched',
  });

  const { setValue, reset, handleSubmit, watch } = useWithdrawLiquidityForm;

  // Watched inputs
  const amountInput = watch('amount');
  const percentageAmountInput = watch('percentageAmount');

  /**
   * Current LP pair information
   */

  // Current subaccount LP balance
  const currentLpBalance = useMemo(() => {
    return balances?.find(
      (balance) => balance.productId === productIdAtomValue,
    );
  }, [balances, productIdAtomValue]);

  // Current subaccount LP yield
  const currentYield = useMemo(() => {
    if (!productIdAtomValue || !lpYields) {
      return BigDecimals.ZERO;
    }
    return lpYields[productIdAtomValue] ?? BigDecimals.ZERO;
  }, [lpYields, productIdAtomValue]);

  // Metadata for the current pair
  const pairMetadata = useMemo((): PairMetadata | undefined => {
    if (!currentLpBalance || !quoteMetadata) {
      return undefined;
    }
    return {
      base: getBaseProductMetadata(currentLpBalance.product.metadata),
      quote: quoteMetadata.metadata.token,
    };
  }, [currentLpBalance, quoteMetadata]);

  /**
   * Error handling
   */

  const { validateLpAmount } = useWithdrawLiquidityValidators({
    currentLpAmount: currentLpBalance?.lpAmount,
  });

  // Watched input errors
  const amountError: WithdrawLiquidityErrorType | undefined = watchFormError(
    useWithdrawLiquidityForm,
    'amount',
  );

  // Parsed Amounts
  const validAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, amountInput);
  }, [amountInput]);

  const validPercentageAmount = useMemo(() => {
    return safeParseForData(percentageValidator, percentageAmountInput);
  }, [percentageAmountInput]);

  // Validation for entire form
  const formError = useMemo((): WithdrawLiquidityErrorType | undefined => {
    if (executeBurnLp.isSuccess) {
      return;
    }
    if (amountError) {
      return amountError;
    }
    return;
  }, [executeBurnLp.isSuccess, amountError]);

  // Action button state
  const buttonState = useMemo((): BaseActionButtonState => {
    if (executeBurnLp.isPending) {
      return 'loading';
    }
    if (executeBurnLp.isSuccess) {
      return 'success';
    }
    if (validAmount && !formError) {
      return 'idle';
    }
    return 'disabled';
  }, [executeBurnLp, formError, validAmount]);

  // Linked inputs
  useLinkedPercentageAmountInputEffects({
    validAmount,
    validPercentageAmount,
    maxAmount: currentLpBalance?.lpAmount,
    form: useWithdrawLiquidityForm,
  });

  // Estimated change amounts based on user input
  const estimatedChangeAmounts = useMemo(() => {
    if (!currentLpBalance || !validPercentageAmount) {
      return;
    }
    const estimatedBaseAmount = currentLpBalance.amountBase.multipliedBy(
      validPercentageAmount,
    );
    const estimatedQuoteAmount = currentLpBalance.amountQuote.multipliedBy(
      validPercentageAmount,
    );
    const estimatedLpAmount = currentLpBalance.lpAmount.multipliedBy(
      validPercentageAmount,
    );
    const estimatedBaseValueUsd = estimatedBaseAmount
      .multipliedBy(currentLpBalance.oraclePrice)
      .multipliedBy(quotePrice);
    const estimatedQuoteValueUsd =
      estimatedQuoteAmount.multipliedBy(quotePrice);
    const estimatedLpValue = estimatedBaseValueUsd.plus(estimatedQuoteValueUsd);

    return {
      base: estimatedBaseAmount,
      quote: estimatedQuoteAmount,
      lpTokens: estimatedLpAmount,
      baseValueUsd: estimatedBaseValueUsd,
      quoteValueUsd: estimatedQuoteValueUsd,
      lpValueUsd: estimatedLpValue,
    };
  }, [currentLpBalance, quotePrice, validPercentageAmount]);

  const onFractionSelected = useOnFractionSelectedHandler({
    setValue,
  });

  // Form submit handler
  const onSubmitForm = useCallback(
    (values: WithdrawLiquidityFormValues) => {
      if (!marketData || !values.amount) {
        return;
      }

      const amountToBurn = resolvePercentageAmountSubmitValue(
        values,
        currentLpBalance?.lpAmount,
      );

      const burnLpResult = executeBurnLp.mutateAsync(
        {
          productId: marketData.productId,
          amount: roundToString(addDecimals(amountToBurn), 0),
        },
        {
          onSuccess: () => {
            reset();
          },
        },
      );

      if (estimatedChangeAmounts) {
        dispatchNotification({
          type: 'action_error_handler',
          data: {
            errorNotificationTitle: 'Withdraw Liquidity Failed',
            executionData: {
              serverExecutionResult: burnLpResult,
            },
          },
        });
      }
    },
    [
      currentLpBalance,
      executeBurnLp,
      marketData,
      estimatedChangeAmounts,
      reset,
      dispatchNotification,
    ],
  );

  return {
    form: useWithdrawLiquidityForm,
    currentLpBalance,
    metadata: pairMetadata,
    priceIncrement: marketData?.priceIncrement,
    currentYield,
    buttonState,
    validPercentageAmount,
    formError,
    estimatedChangeAmounts,
    validateLpAmount,
    onFractionSelected,
    onSubmit: handleSubmit(onSubmitForm),
  };
}
