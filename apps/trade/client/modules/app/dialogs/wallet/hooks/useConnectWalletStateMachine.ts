import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { useSavedUserState } from 'client/modules/localstorage/userState/useSavedUserState';
import { useCallback, useEffect, useState } from 'react';
import { useEVMContext } from '@vertex-protocol/web-data';
import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

type OnboardingFlowState = 'connect' | 'terms_of_use' | 'key_features';

export interface UseConnectWalletStateMachine {
  currentState: OnboardingFlowState;
  hideDialog: () => void;

  keyFeaturesStartTradingClicked(): void;

  termsOfUseAgreeClicked(): void;
}

export function useConnectWalletStateMachine(): UseConnectWalletStateMachine {
  const { hide } = useDialog();
  const [onboardingFlowState, setOnboardingFlowState] =
    useState<OnboardingFlowState>('connect');

  const { savedUserState, setSavedUserState } = useSavedUserState();
  const onboardingCompleted = savedUserState.onboardingComplete;

  const { connectionStatus } = useEVMContext();
  const { disconnect } = useSubaccountContext();
  const isConnected = connectionStatus.type === 'connected';

  // Route appropriately after connection
  useEffect(() => {
    if (!isConnected || onboardingFlowState !== 'connect') {
      return;
    }
    if (!onboardingCompleted) {
      setOnboardingFlowState('terms_of_use');
    } else {
      hide();
    }
  }, [hide, isConnected, onboardingCompleted, onboardingFlowState]);

  const termsOfUseAgreeClicked = useCallback(() => {
    // Save
    setSavedUserState((prev) => {
      prev.onboardingComplete = true;
      return prev;
    });
    // Go to key features
    setOnboardingFlowState('key_features');
  }, [setSavedUserState]);

  const keyFeaturesStartTradingClicked = useCallback(() => {
    hide();
  }, [hide]);

  const hideDialog = useCallback(() => {
    // If terms of use haven't been agreed, we need to disconnect the user to force them to re-do the flow
    if (!onboardingCompleted) {
      disconnect();
    }
    hide();
  }, [disconnect, hide, onboardingCompleted]);

  return {
    hideDialog,
    currentState: onboardingFlowState,
    keyFeaturesStartTradingClicked,
    termsOfUseAgreeClicked,
  };
}
