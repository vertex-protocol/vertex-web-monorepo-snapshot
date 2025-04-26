import { useRequiresInitialDeposit } from 'client/hooks/subaccount/useRequiresInitialDeposit';
import { useIsConnected } from 'client/hooks/util/useIsConnected';
import { useIsSmartContractWalletConnected } from 'client/hooks/util/useIsSmartContractWalletConnected';
import { SMART_CONTRACT_WALLET_HELPER_TOAST_ID } from 'client/modules/notifications/handlers/handleSmartContractWalletHelperNotificationDispatch';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useIsSingleSignatureSession } from 'client/modules/singleSignatureSessions/hooks/useIsSingleSignatureSession';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

export function SmartContractWalletHelperEventEmitter() {
  const { dispatchNotification } = useNotificationManagerContext();
  const isSingleSignatureSession = useIsSingleSignatureSession({
    requireActive: true,
  });
  const isSmartContractWallet = useIsSmartContractWalletConnected();
  const isConnected = useIsConnected();
  const requiresFirstDeposit = useRequiresInitialDeposit();

  // Show notification if user is connected to a smart contract wallet and not in a single signature session
  // We also need to check if the user is connected to the app so we don't prematurely show the notification
  // Lastly only show the notification if the user has already deposited funds
  const shouldShow =
    isSmartContractWallet &&
    !isSingleSignatureSession &&
    isConnected &&
    !requiresFirstDeposit;

  useEffect(() => {
    if (shouldShow) {
      dispatchNotification({ type: 'smart_contract_wallet_helper' });
    } else {
      toast.dismiss(SMART_CONTRACT_WALLET_HELPER_TOAST_ID);
    }
  }, [dispatchNotification, shouldShow]);

  return null;
}
