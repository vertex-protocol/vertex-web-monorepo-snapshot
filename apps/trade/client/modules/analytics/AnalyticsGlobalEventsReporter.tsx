import { useEVMContext } from '@vertex-protocol/react-client';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useListSubaccounts } from 'client/hooks/query/subaccount/useListSubaccounts';
import { useEffect } from 'react';

/**
 * Reports wallet connection and saved user settings to analytics:
 */
export function AnalyticsGlobalEventsReporter() {
  const {
    connectionStatus: { address },
    primaryChainEnv,
  } = useEVMContext();
  const {
    signingPreference: { current },
  } = useSubaccountContext();
  const { updateUserAddress, trackEvent } = useAnalyticsContext();
  const { data: subaccounts } = useListSubaccounts();
  const { currentDialog } = useDialog();

  // Update user address
  useEffect(() => {
    if (address) {
      updateUserAddress(address);
    }
  }, [address, updateUserAddress]);

  // Track dialog opens
  useEffect(() => {
    if (currentDialog?.type) {
      trackEvent({
        type: 'dialog_opened',
        data: {
          dialogType: currentDialog.type,
        },
      });
    }
  }, [currentDialog?.type, trackEvent]);

  // Track 1CT status
  useEffect(() => {
    if (current?.type) {
      trackEvent({
        type: 'one_click_trading_status',
        data: {
          status: current.type,
        },
      });
    }
  }, [trackEvent, current?.type]);

  // Track subaccount count and chainEnv
  const subaccountCount = subaccounts?.length;
  useEffect(() => {
    if (subaccountCount) {
      trackEvent({
        type: 'subaccount_count',
        data: {
          numSubaccount: subaccountCount,
          chainEnv: primaryChainEnv,
        },
      });
    }
  }, [subaccountCount, primaryChainEnv, trackEvent]);

  return null;
}
