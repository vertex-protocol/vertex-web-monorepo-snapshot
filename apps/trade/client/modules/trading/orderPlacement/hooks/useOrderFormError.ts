import { useCurrentSubaccountSummary } from 'client/hooks/query/subaccount/useCurrentSubaccountSummary';
import { UserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';
import { SpotOrderFormUserStateError } from 'client/pages/SpotTrading/context/types';
import { watchFormError } from 'client/utils/form/watchFormError';
import { useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import {
  BaseOrderFormValues,
  OrderFormError,
  OrderFormInputError,
} from '../../types';

interface Params {
  enableMaxSizeLogic: boolean;
  form: UseFormReturn<BaseOrderFormValues>;
  userStateError: UserStateError | SpotOrderFormUserStateError | undefined;
}

export function useOrderFormError({
  form,
  enableMaxSizeLogic,
  userStateError,
}: Params): OrderFormError | undefined {
  const { data: subaccountSummary } = useCurrentSubaccountSummary();
  const hasNoFundsAvailable = subaccountSummary?.health.initial.health.lte(0);
  const isSingleSignatureEnabled = useIsSingleSignatureSession();

  const priceType = form.watch('priceType');
  const timeInForceType = form.watch('timeInForceType');

  const assetAmountError: OrderFormInputError | undefined = watchFormError(
    form,
    'assetAmount',
  );
  const priceInputError: OrderFormInputError | undefined = watchFormError(
    form,
    'price',
  );
  const timeInForceInDaysInputError: OrderFormInputError | undefined =
    watchFormError(form, 'timeInForceInDays');

  return useMemo((): OrderFormError | undefined => {
    // Trigger orders require single signature enabled
    // !userStateError to make sure we don't show it on disconnected, switch chain, etc... when interaction with single signature switch dialog is not possible elsewhere in the app.
    if (!userStateError && !isSingleSignatureEnabled && priceType === 'stop') {
      return 'trigger_order_single_signature_disabled';
    }

    // Error for no buying power - users can only place FOK orders to close positions
    // conscious decision to not allow limit + FOK selection under time in force to keep simplified logic
    const isFOKOrder = priceType === 'market' || priceType === 'stop';
    if (enableMaxSizeLogic && hasNoFundsAvailable && !isFOKOrder) {
      return 'zero_buying_power_only_fok';
    }

    // Only validate on limit order and good_until is selected.
    if (
      priceType === 'limit' &&
      timeInForceType === 'good_until' &&
      timeInForceInDaysInputError
    ) {
      return timeInForceInDaysInputError;
    }

    if (assetAmountError) {
      return assetAmountError;
    }
    // Now validate price if needed
    if (priceType === 'limit' && priceInputError) {
      return priceInputError;
    }
    return;
  }, [
    userStateError,
    isSingleSignatureEnabled,
    priceType,
    enableMaxSizeLogic,
    hasNoFundsAvailable,
    timeInForceType,
    timeInForceInDaysInputError,
    assetAmountError,
    priceInputError,
  ]);
}
