import { useEVMContext } from '@vertex-protocol/react-client';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DialogType } from 'client/modules/app/dialogs/types';
import { useEffect } from 'react';

/**
 * Manages app-wide flows for automatically showing / hiding dialogs
 */
export function useAppDialogEffects() {
  const { currentDialog, hide } = useDialog();
  const {
    connectionStatus: { type: connectionStatusType },
  } = useEVMContext();
  // We don't want to retrigger the useEffects on every change of `currentDialog`
  const currentDialogRef = useSyncedRef(currentDialog);

  /**
   * Dismiss all dialogs when the user disconnects. We do this in an effect instead of a disconnect handler because
   * the user can disconnect through the wallet extension.
   *
   * The only caveat is that we don't want to hide the location restriction / connect dialogs
   */
  useEffect(() => {
    const currentDialogType = currentDialogRef.current?.type;
    const ignoredDialogTypes: DialogType[] = [
      'location_restricted',
      'connect',
      'utm_campaign_connect',
    ];

    if (
      connectionStatusType === 'disconnected' &&
      !!currentDialogType &&
      !ignoredDialogTypes.includes(currentDialogType)
    ) {
      hide();
    }
  }, [connectionStatusType, currentDialogRef, hide]);
}
