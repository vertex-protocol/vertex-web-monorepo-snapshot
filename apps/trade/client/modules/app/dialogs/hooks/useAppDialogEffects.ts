import { useEVMContext } from '@vertex-protocol/react-client';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { DialogType } from 'client/modules/app/dialogs/types';
import { useSavedUserState } from 'client/modules/localstorage/userState/useSavedUserState';
import { useEffect } from 'react';

/**
 * Manages app-wide flows for automatically showing / hiding dialogs
 */
export function useAppDialogEffects() {
  const { currentDialog, show, hide } = useDialog();
  const {
    connectionStatus: { type: connectionStatusType },
  } = useEVMContext();
  const isConnected = connectionStatusType === 'connected';
  const isDisconnected = connectionStatusType === 'disconnected';

  /**
   * Dismiss all dialogs when the user disconnects. We do this in an effect instead of a disconnect handler because
   * the user can disconnect through the wallet extension.
   *
   * The only caveat is that we don't want to hide the location restriction / connect dialogs
   */
  useEffect(() => {
    const currentDialogType = currentDialog?.type;
    const ignoredDialogTypes: DialogType[] = [
      'location_restricted',
      'connect',
      'connect_custom_wallet',
      'utm_campaign_connect',
    ];

    if (
      isDisconnected &&
      !!currentDialogType &&
      !ignoredDialogTypes.includes(currentDialogType)
    ) {
      hide();
    }
  }, [currentDialog?.type, hide, isDisconnected]);

  /**
   * If the user hasn't completed onboarding, show the terms of use dialog
   */
  const { savedUserState } = useSavedUserState();
  const hasCompletedOnboarding = savedUserState.onboardingComplete;
  useEffect(() => {
    if (isConnected && !hasCompletedOnboarding && !currentDialog) {
      show({
        type: 'terms_of_use',
        params: {},
      });
    }
  }, [currentDialog, hasCompletedOnboarding, isConnected, show]);
}
