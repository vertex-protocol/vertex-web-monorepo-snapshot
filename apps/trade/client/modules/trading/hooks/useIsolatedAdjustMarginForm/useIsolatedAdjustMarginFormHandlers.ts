import { addDecimals, toBigDecimal } from '@vertex-protocol/client';
import BigDecimal from 'bignumber.js';
import { useExecuteSubaccountQuoteTransfer } from 'client/hooks/execute/useExecuteSubaccountQuoteTransfer';
import { useOnFractionSelectedHandler } from 'client/hooks/ui/form/useOnFractionSelectedHandler';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useSubaccountSigningPreference } from 'client/modules/singleSignatureSessions/hooks/useSubaccountSigningPreference';
import { SUBACCOUNT_QUOTE_TRANSFER_FEE } from 'client/modules/subaccounts/consts';
import {
  IsolatedAdjustMarginFormValues,
  IsolatedAdjustMarginMode,
} from 'client/modules/trading/hooks/useIsolatedAdjustMarginForm/types';
import { roundToString } from 'client/utils/rounding';
import { useCallback } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Params {
  form: UseFormReturn<IsolatedAdjustMarginFormValues>;
  executeFn: ReturnType<typeof useExecuteSubaccountQuoteTransfer>;
  validAmount: BigDecimal | undefined;
  subaccounts: Record<'sender' | 'recipient', string>;
}

export function useIsolatedAdjustMarginFormHandlers({
  executeFn,
  form,
  subaccounts: { sender, recipient },
}: Params) {
  const { dispatchNotification } = useNotificationManagerContext();
  const signingPreference = useSubaccountSigningPreference();
  const mutateQuoteTransferAsync = executeFn.mutateAsync;

  const onSubmitForm = useCallback(
    (values: IsolatedAdjustMarginFormValues) => {
      if (!values.amount) {
        return;
      }

      const inputAmount = toBigDecimal(values.amount);

      // Amount submitted via form is inclusive of fee, but the amount in tx is exclusive.
      const amountToTransfer = addDecimals(
        inputAmount.minus(SUBACCOUNT_QUOTE_TRANSFER_FEE),
      );

      const serverExecutionResult = mutateQuoteTransferAsync(
        {
          amount: roundToString(amountToTransfer, 0),
          recipientSubaccountName: recipient,
          subaccountName: sender,
          senderSigningPreference: signingPreference,
        },
        {
          onSuccess: () => {
            form.resetField('amount');
          },
        },
      );

      dispatchNotification({
        type: 'action_error_handler',
        data: {
          errorNotificationTitle: 'Adjust Margin Failed',
          executionData: {
            serverExecutionResult,
          },
        },
      });
    },
    [
      dispatchNotification,
      form,
      mutateQuoteTransferAsync,
      recipient,
      signingPreference,
      sender,
    ],
  );

  const onFractionSelected = useOnFractionSelectedHandler({
    setValue: form.setValue,
  });

  const onEnableBorrowsChange = useCallback(
    (enabled: boolean) => {
      form.setValue('enableBorrows', enabled);
    },
    [form],
  );

  const onAdjustmentModeChange = useCallback(
    (adjustmentMode: IsolatedAdjustMarginMode) => {
      form.setValue('adjustmentMode', adjustmentMode);
    },
    [form],
  );

  const onMaxAmountClicked = useCallback(() => {
    onFractionSelected(1);
  }, [onFractionSelected]);

  return {
    onSubmitForm,
    onFractionSelected,
    onEnableBorrowsChange,
    onAdjustmentModeChange,
    onMaxAmountClicked,
  };
}
