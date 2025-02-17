import { SmartContractWalletHelperNotification } from 'client/modules/notifications/components/SmartContractWalletHelperNotification';
import toast, { Toast } from 'react-hot-toast';

export const SMART_CONTRACT_WALLET_HELPER_TOAST_ID =
  'smartContractWalletHelper';

export function handleSmartContractWalletHelperNotificationDispatch() {
  toast.custom(
    (t: Toast['message']) => {
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
