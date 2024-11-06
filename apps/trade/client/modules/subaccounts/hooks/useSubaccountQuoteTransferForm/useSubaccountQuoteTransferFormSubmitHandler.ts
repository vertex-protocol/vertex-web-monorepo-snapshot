import { addDecimals, BigDecimal } from '@vertex-protocol/utils';
import { useExecuteSubaccountQuoteTransfer } from 'client/hooks/execute/useExecuteSubaccountQuoteTransfer';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { SubaccountSigningPreference } from 'client/modules/singleSignatureSessions/types';
import { SUBACCOUNT_QUOTE_TRANSFER_FEE } from 'client/modules/subaccounts/consts';
import { SubaccountQuoteTransferFormValues } from 'client/modules/subaccounts/hooks/useSubaccountQuoteTransferForm/types';
import { resolvePercentageAmountSubmitValue } from 'client/utils/form/resolvePercentageAmountSubmitValue';
import { roundToString } from 'client/utils/rounding';
import { UseFormReturn } from 'react-hook-form';

interface Params {
  useSubaccountQuoteTransferForm: UseFormReturn<SubaccountQuoteTransferFormValues>;
  mutateQuoteTransferAsync: ReturnType<
    typeof useExecuteSubaccountQuoteTransfer
  >['mutateAsync'];
  decimalAdjustedMaxWithdrawableWithFee: BigDecimal | undefined;
  senderSigningPreference: SubaccountSigningPreference | undefined;
}

export function useSubaccountQuoteTransferFormSubmitHandler({
  useSubaccountQuoteTransferForm,
  mutateQuoteTransferAsync,
  decimalAdjustedMaxWithdrawableWithFee,
  senderSigningPreference,
}: Params) {
  const { dispatchNotification } = useNotificationManagerContext();

  return (values: SubaccountQuoteTransferFormValues) => {
    if (!values.amount) {
      return;
    }

    const inputAmount = resolvePercentageAmountSubmitValue(
      values,
      decimalAdjustedMaxWithdrawableWithFee,
    );

    // Amount submitted via form is inclusive of fee, but the amount in tx is exclusive.
    const amountToTransfer = inputAmount.minus(SUBACCOUNT_QUOTE_TRANSFER_FEE);

    if (amountToTransfer.lte(0)) {
      console.warn('Invalid transfer amount', amountToTransfer);
      return;
    }

    const amountToTransferWithDecimals = addDecimals(amountToTransfer);

    const { senderSubaccountName, recipientSubaccountName } = values;

    const serverExecutionResult = mutateQuoteTransferAsync(
      {
        subaccountName: senderSubaccountName,
        recipientSubaccountName,
        amount: roundToString(amountToTransferWithDecimals, 0),
        senderSigningPreference,
      },
      {
        onSuccess: () => {
          useSubaccountQuoteTransferForm.setValue('percentageAmount', 0);
          useSubaccountQuoteTransferForm.resetField('amount');
          useSubaccountQuoteTransferForm.resetField('amountSource');
        },
      },
    );

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        errorNotificationTitle: 'Transfer Failed',
        executionData: { serverExecutionResult },
      },
    });
  };
}
