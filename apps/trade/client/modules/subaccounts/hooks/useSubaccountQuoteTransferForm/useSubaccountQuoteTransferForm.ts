import { QUOTE_PRODUCT_ID } from '@vertex-protocol/client';
import { SubaccountTx } from '@vertex-protocol/engine-client';
import { Token } from '@vertex-protocol/react-client';
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
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { AppSubaccount } from 'client/context/subaccount/types';
import { useExecuteSubaccountQuoteTransfer } from 'client/hooks/execute/useExecuteSubaccountQuoteTransfer';
import { useLinkedPercentageAmountInputEffects } from 'client/hooks/ui/form/useLinkedPercentageAmountInputEffects';
import {
  OnFractionSelectedHandler,
  useOnFractionSelectedHandler,
} from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useRunWithDelayOnCondition } from 'client/hooks/util/useRunWithDelayOnCondition';
import { DepositErrorType } from 'client/modules/collateral/deposit/types';
import {
  PRIMARY_SUBACCOUNT_NAME,
  SUBACCOUNT_QUOTE_TRANSFER_FEE,
} from 'client/modules/subaccounts/consts';
import {
  SubaccountQuoteTransferErrorType,
  SubaccountQuoteTransferFormValues,
} from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/types';
import { useSubaccountQuoteTransferAmountValidator } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/useSubaccountQuoteTransferAmountValidator';
import {
  QuoteTransferSubaccount,
  useSubaccountQuoteTransferFormData,
} from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/useSubaccountQuoteTransferFormData';
import { useSubaccountQuoteTransferFormSubmitHandler } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/useSubaccountQuoteTransferFormSubmitHandler';
import { BaseActionButtonState } from 'client/types/BaseActionButtonState';
import { watchFormError } from 'client/utils/form/watchFormError';
import { positiveBigDecimalValidator } from 'client/utils/inputValidators';
import { useCallback, useEffect, useMemo } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';

export interface UseSubaccountQuoteTransferForm {
  form: UseFormReturn<SubaccountQuoteTransferFormValues>;
  formError: SubaccountQuoteTransferErrorType | undefined;
  hasSameSubaccountError: boolean;
  amountInputValueUsd: BigDecimal | undefined;
  validateAmount: InputValidatorFn<string, SubaccountQuoteTransferErrorType>;
  validPercentageAmount?: number;
  onFractionSelected: OnFractionSelectedHandler;
  onEnableBorrowsChange: (enabled: boolean) => void;
  enableBorrows: boolean;
  decimalAdjustedMaxWithdrawableWithFee: BigDecimal | undefined;
  subaccounts: QuoteTransferSubaccount[];
  senderSubaccount: QuoteTransferSubaccount;
  recipientSubaccount: QuoteTransferSubaccount;
  currentSubaccount: AppSubaccount;
  primaryQuoteToken: Token;
  senderEstimateStateTxs: SubaccountTx[];
  recipientEstimateStateTxs: SubaccountTx[];
  senderQuoteBalanceDelta: BigDecimal | undefined;
  recipientQuoteBalanceDelta: BigDecimal | undefined;
  buttonState: BaseActionButtonState;
  onSubmit: () => void;
}

interface UseSubaccountQuoteTransferDialogParams {
  recipientSubaccountName?: string;
}

export function useSubaccountQuoteTransferForm({
  recipientSubaccountName: recipientSubaccountNameOverride,
}: UseSubaccountQuoteTransferDialogParams): UseSubaccountQuoteTransferForm {
  const { currentSubaccount } = useSubaccountContext();

  const useSubaccountQuoteTransferForm =
    useForm<SubaccountQuoteTransferFormValues>({
      defaultValues: {
        senderSubaccountName: PRIMARY_SUBACCOUNT_NAME,
        recipientSubaccountName:
          recipientSubaccountNameOverride ?? currentSubaccount.name,
        enableBorrows: false,
        amount: '',
        amountSource: 'absolute',
        percentageAmount: 0,
      },
      mode: 'onTouched',
    });

  const senderSubaccountName = useSubaccountQuoteTransferForm.watch(
    'senderSubaccountName',
  );

  const recipientSubaccountName = useSubaccountQuoteTransferForm.watch(
    'recipientSubaccountName',
  );

  const enableBorrows = useSubaccountQuoteTransferForm.watch('enableBorrows');

  const transferAmountInput = useSubaccountQuoteTransferForm
    .watch('amount')
    .trim();

  const percentageAmountInput =
    useSubaccountQuoteTransferForm.watch('percentageAmount');

  const amountInputError: DepositErrorType | undefined = watchFormError(
    useSubaccountQuoteTransferForm,
    'amount',
  );

  const hasSameSubaccountError =
    recipientSubaccountName === senderSubaccountName;

  const {
    subaccounts,
    primaryQuoteToken,
    primaryQuotePriceUsd,
    decimalAdjustedMaxWithdrawableWithFee,
    senderSigningPreference,
    senderSubaccount,
    recipientSubaccount,
  } = useSubaccountQuoteTransferFormData({
    senderSubaccountName,
    recipientSubaccountName,
    enableBorrows,
  });

  const { mutateAsync, isPending, isSuccess, reset } =
    useExecuteSubaccountQuoteTransfer();

  const validateAmount = useSubaccountQuoteTransferAmountValidator({
    maxAmount: decimalAdjustedMaxWithdrawableWithFee,
  });

  const validAmount = useMemo(() => {
    return safeParseForData(positiveBigDecimalValidator, transferAmountInput);
  }, [transferAmountInput]);

  const amountInputValueUsd = validAmount
    ? toBigDecimal(validAmount).multipliedBy(primaryQuotePriceUsd)
    : undefined;

  const validPercentageAmount = useMemo(() => {
    return safeParseForData(percentageValidator, percentageAmountInput);
  }, [percentageAmountInput]);

  useLinkedPercentageAmountInputEffects({
    validAmount,
    validPercentageAmount,
    maxAmount: decimalAdjustedMaxWithdrawableWithFee,
    form: useSubaccountQuoteTransferForm,
  });

  useRunWithDelayOnCondition({ condition: isSuccess, fn: reset });

  // Reset amount related inputs when `enableBorrows` changes.
  useEffect(() => {
    useSubaccountQuoteTransferForm.resetField('amount');
    useSubaccountQuoteTransferForm.setValue('percentageAmount', 0);
  }, [enableBorrows, useSubaccountQuoteTransferForm]);

  const {
    senderEstimateStateTxs,
    recipientEstimateStateTxs,
    senderQuoteBalanceDelta,
    recipientQuoteBalanceDelta,
  } = useMemo((): {
    senderEstimateStateTxs: SubaccountTx[];
    recipientEstimateStateTxs: SubaccountTx[];
    senderQuoteBalanceDelta: BigDecimal | undefined;
    recipientQuoteBalanceDelta: BigDecimal | undefined;
  } => {
    if (!validAmount) {
      return {
        senderEstimateStateTxs: [],
        recipientEstimateStateTxs: [],
        senderQuoteBalanceDelta: undefined,
        recipientQuoteBalanceDelta: undefined,
      };
    }

    const senderQuoteBalanceDelta = toBigDecimal(validAmount).negated();
    const recipientQuoteBalanceDelta = toBigDecimal(validAmount).minus(
      SUBACCOUNT_QUOTE_TRANSFER_FEE,
    );

    const getEstimateStateTx = (amountDelta: BigDecimal): SubaccountTx => ({
      type: 'apply_delta',
      tx: {
        productId: QUOTE_PRODUCT_ID,
        vQuoteDelta: BigDecimals.ZERO,
        // This does not use token decimals because the query goes to the backend.
        amountDelta: addDecimals(amountDelta),
      },
    });

    return {
      senderEstimateStateTxs: [getEstimateStateTx(senderQuoteBalanceDelta)],
      recipientEstimateStateTxs: [
        getEstimateStateTx(recipientQuoteBalanceDelta),
      ],
      senderQuoteBalanceDelta,
      recipientQuoteBalanceDelta,
    };
  }, [validAmount]);

  const buttonState = useMemo((): BaseActionButtonState => {
    if (isPending) {
      return 'loading';
    } else if (isSuccess) {
      return 'success';
    } else if (
      !transferAmountInput ||
      !!amountInputError ||
      hasSameSubaccountError
    ) {
      return 'disabled';
    } else {
      return 'idle';
    }
  }, [
    isPending,
    isSuccess,
    transferAmountInput,
    amountInputError,
    hasSameSubaccountError,
  ]);

  const onFractionSelected = useOnFractionSelectedHandler({
    setValue: useSubaccountQuoteTransferForm.setValue,
  });

  const onEnableBorrowsChange = useCallback(
    (enabled: boolean) => {
      useSubaccountQuoteTransferForm.setValue('enableBorrows', enabled);
    },
    [useSubaccountQuoteTransferForm],
  );

  const onSubmitForm = useSubaccountQuoteTransferFormSubmitHandler({
    mutateQuoteTransferAsync: mutateAsync,
    senderSigningPreference,
    useSubaccountQuoteTransferForm,
    decimalAdjustedMaxWithdrawableWithFee,
  });

  return {
    form: useSubaccountQuoteTransferForm,
    formError: amountInputError,
    hasSameSubaccountError,
    amountInputValueUsd,
    validateAmount,
    validPercentageAmount,
    onFractionSelected,
    enableBorrows,
    decimalAdjustedMaxWithdrawableWithFee,
    subaccounts,
    senderSubaccount,
    recipientSubaccount,
    currentSubaccount,
    primaryQuoteToken,
    senderEstimateStateTxs,
    recipientEstimateStateTxs,
    senderQuoteBalanceDelta,
    recipientQuoteBalanceDelta,
    buttonState,
    onEnableBorrowsChange,
    onSubmit: useSubaccountQuoteTransferForm.handleSubmit(onSubmitForm),
  };
}
