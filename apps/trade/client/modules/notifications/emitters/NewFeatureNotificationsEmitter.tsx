import { useEVMContext } from '@vertex-protocol/web-data';
import {
  arbitrum,
  arbitrumSepolia,
  blast,
  blastSepolia,
} from '@wagmi/core/chains';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import {
  NEW_FEATURE_DISCLOSURE_KEYS,
  NewFeatureDisclosureKey,
} from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useSavedUserState } from 'client/modules/localstorage/userState/useSavedUserState';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

// If undefined, the notification will be enabled for all chains.
type EnabledChainIdsFilter = number[] | undefined;

/**
 * A mapping of new feature key -> chain IDs for which the notification should be enabled.
 * Use `satisfies` to have type-checking that also works when `NewFeatureDisclosureKey` is `never` (when there are no keys)
 */
const ENABLED_NOTIFICATION_CHAIN_IDS: Record<string, EnabledChainIdsFilter> = {
  // min_order_size_update: [
  //   arbitrumSepolia.id,
  //   arbitrum.id,
  //   blastSepolia.id,
  //   blast.id,
  // ],
} satisfies Record<NewFeatureDisclosureKey, EnabledChainIdsFilter>;

export function NewFeatureNotificationsEmitter() {
  const {
    connectionStatus: { address },
    primaryChain: { id: primaryChainId },
  } = useEVMContext();
  const { dispatchNotification } = useNotificationManagerContext();
  const { savedUserState } = useSavedUserState();
  const { currentDialog } = useDialog();

  const canShowFeatureNotifications = !!address && !currentDialog;
  const dismissedKeys = savedUserState.dismissedDisclosures;

  useEffect(() => {
    NEW_FEATURE_DISCLOSURE_KEYS.forEach((key) => {
      const isDismissed = dismissedKeys.includes(key);
      const isEnabled =
        ENABLED_NOTIFICATION_CHAIN_IDS[key]?.includes(primaryChainId) ?? true;

      const show = !isDismissed && isEnabled && canShowFeatureNotifications;
      if (show) {
        dispatchNotification({
          type: 'new_feature',
          data: key,
        });
      } else {
        // Assume toast ID is the notification key
        toast.dismiss(key);
      }
    });
  }, [
    dismissedKeys,
    dispatchNotification,
    canShowFeatureNotifications,
    primaryChainId,
  ]);

  return null;
}
