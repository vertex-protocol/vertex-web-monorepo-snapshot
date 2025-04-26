import { SmartContractWalletHelperNotification } from 'client/modules/notifications/components/SmartContractWalletHelperNotification';
import { toast } from 'react-hot-toast';

export const SMART_CONTRACT_WALLET_HELPER_TOAST_ID =
  'smartContractWalletHelper';

export function handleSmartContractWalletHelperNotificationDispatch() {
  toast.custom(
    (t) => {
      return (
        <SmartContractWalletHelperNotification
          visible={t.visible}
          onDismiss={() => {
            toast.dismiss(t.id);
          }}
        />
      );
    },
    { id: SMART_CONTRACT_WALLET_HELPER_TOAST_ID, duration: Infinity },
  );
}
