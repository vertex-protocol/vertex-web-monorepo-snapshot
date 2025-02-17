import { QUOTE_PRODUCT_ID } from '@vertex-protocol/client';
import { useVertexMetadataContext } from '@vertex-protocol/react-client';
import { BigDecimals, removeDecimals } from '@vertex-protocol/utils';
import {
  percentageValidator,
  safeParseForData,
} from '@vertex-protocol/web-common';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useExecuteSubaccountQuoteTransfer } from 'client/hooks/execute/useExecuteSubaccountQuoteTransfer';
import { usePrimaryQuotePriceUsd } from 'client/hooks/markets/usePrimaryQuotePriceUsd';
import { useMaxWithdrawableAmount } from 'client/hooks/query/subaccount/useMaxWithdrawableAmount';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { SUBACCOUNT_QUOTE_TRANSFER_FEE } from 'client/modules/subaccounts/consts';
import {
  IsolatedAdjustMarginFormErrorType,
  IsolatedAdjustMarginFormValues,
} from 'client/modules/trading/hooks/useIsolatedAdjustMarginForm/types';
import { useIsolatedAdjustMarginAmountValidator } from 'client/modules/trading/hooks/useIsolatedAdjustMarginForm/useIsolatedAdjustMarginAmountValidator';
import { useIsolatedAdjustMarginFormHandlers } from 'client/modules/trading/hooks/useIsolatedAdjustMarginForm/useIsolatedAdjustMarginFormHandlers';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

export function useIsolatedAdjustMarginForm({
  isoSubaccountName,
}: {
  isoSubaccountName: string;
}) {
  const {
    primaryQuoteToken: {
      icon: primaryQuoteTokenIcon,
      symbol: primaryQuoteTokenSymbol,
    },
  } = useVertexMetadataContext();
  const { currentSubaccount } = useSubaccountContext();
  const primaryQuotePriceUsd = usePrimaryQuotePriceUsd();

  const currentSubaccountName = currentSubaccount.name;

  // Form state
  const useIsolatedAdjustMarginForm = useForm<IsolatedAdjustMarginFormValues>({
    defaultValues: {
      amount: '',
      adjustmentMode: 'add',
      amountSource: 'absolute',
      enableBorrows: false,
      percentageAmount: 0,
    },
    mode: 'onTouched',
  });

  // Watched state
  const adjustmentMode = useIsolatedAdjustMarginForm.watch('adjustmentMode');
  const amountInput = useIsolatedAdjustMarginForm.watch('amount').trim();
  const percentageAmountInput =
    useIsolatedAdjustMarginForm.watch('percentageAmount');
  const enableBorrows = useIsolatedAdjustMarginForm.watch('enableBorrows');

  const isAddMargin = adjustmentMode === 'add';

  // Max withdrawable
  const { data: maxWithdrawable } = useMaxWithdrawableAmount({
    productId: QUOTE_PRODUCT_ID,
    spotLeverage: enableBorrows && isAddMargin,
    subaccountName: isAddMargin ? undefined : isoSubaccountName,
  });

  const decimalAdjustedMaxWithdrawableWithFee = useMemo(() => {
    if (!maxWithdrawable) {
      return;
    }

    if (maxWithdrawable.isZero()) {
      return BigDecimals.ZERO;
    }

    return removeDecimals(maxWithdrawable).plus(SUBACCOUNT_QUOTE_TRANSFER_FEE);
  }, [maxWithdrawable]);

  // Amount input
  const validAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, amountInput);
  }, [amountInput]);

  const validPercentageAmount = useMemo(() => {
    return safeParseForData(percentageValidator, percentageAmountInput);
  }, [percentageAmountInput]);

  const validateAmount = useIsolatedAdjustMarginAmountValidator({
    maxWithdrawable: decimalAdjustedMaxWithdrawableWithFee,
    isAddMargin,
  });

  const amountInputError: IsolatedAdjustMarginFormErrorType | undefined =
    watchFormError(useIsolatedAdjustMarginForm, 'amount');

  useLinkedPercentageAmountInputEffects({
    validAmount,
    validPercentageAmount,
    maxAmount: decimalAdjustedMaxWithdrawableWithFee,
    form: useIsolatedAdjustMarginForm,
  });

  // Subaccounts for the transfer
  const subaccounts = {
    recipient: isAddMargin ? isoSubaccountName : currentSubaccountName,
    sender: isAddMargin ? currentSubaccountName : isoSubaccountName,
  };

  // Execute transfer
  const executeSubaccountQuoteTransfer = useExecuteSubaccountQuoteTransfer({
    isIsoTransfer: true,
  });

  useRunWithDelayOnCondition({
    condition: executeSubaccountQuoteTransfer.isSuccess,
    fn: executeSubaccountQuoteTransfer.reset,
  });

  const {
    onEnableBorrowsChange,
    onMaxAmountClicked,
    onSubmitForm,
    onAdjustmentModeChange,
    onFractionSelected,
  } = useIsolatedAdjustMarginFormHandlers({
    form: useIsolatedAdjustMarginForm,
    executeFn: executeSubaccountQuoteTransfer,
    validAmount,
    currentSubaccountName,
    subaccounts,
  });

  // Action button state
  const buttonState = useMemo((): BaseActionButtonState => {
    if (executeSubaccountQuoteTransfer.isPending) {
      return 'loading';
    }
    if (executeSubaccountQuoteTransfer.isSuccess) {
      return 'success';
    }
    if (!amountInput || amountInputError) {
      return 'disabled';
    }
    return 'idle';
  }, [
    amountInputError,
    amountInput,
    executeSubaccountQuoteTransfer.isPending,
    executeSubaccountQuoteTransfer.isSuccess,
  ]);

  // Used to estimate the state of the cross margin account after the transfer.
  const estimatedAdjustmentValueUsd = useMemo(() => {
    return validAmount?.multipliedBy(primaryQuotePriceUsd);
  }, [validAmount, primaryQuotePriceUsd]);

  // Reset amount related inputs when `enableBorrows` or `adjustmentMode` changes.
  useEffect(() => {
    useIsolatedAdjustMarginForm.resetField('amount');
    onFractionSelected(0);
  }, [
    enableBorrows,
    useIsolatedAdjustMarginForm,
    adjustmentMode,
    onFractionSelected,
  ]);

  return {
    form: useIsolatedAdjustMarginForm,
    formError: amountInputError,
    validAmount,
    validPercentageAmount,
    estimatedAdjustmentValueUsd,
    buttonState,
    maxWithdrawable: decimalAdjustedMaxWithdrawableWithFee,
    enableBorrows,
    primaryQuoteTokenSymbol,
    primaryQuoteTokenIcon,
    isAddMargin,
    onAdjustmentModeChange,
    onEnableBorrowsChange,
    onFractionSelected,
    validateAmount,
    onMaxAmountClicked,
    onSubmit: useIsolatedAdjustMarginForm.handleSubmit(onSubmitForm),
  };
}
