import { useEVMContext } from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { SUBACCOUNT_LIMIT } from 'client/context/subaccount/consts';
import { useSubaccountNames } from 'client/context/subaccount/hooks/useSubaccountNames';
import {
  SubaccountContext,
  SubaccountContextData,
} from 'client/context/subaccount/SubaccountContext';
import {
  Subaccount,
  UpdateSigningPreferenceFn,
} from 'client/context/subaccount/types';
import { LinkedSignerSync } from 'client/modules/singleSignatureSessions/components/LinkedSignerSync';
import { useSavedSubaccountSigningPreference } from 'client/modules/singleSignatureSessions/hooks/useSavedSubaccountSigningPreference';
import { PRIMARY_SUBACCOUNT_NAME } from 'client/modules/subaccounts/consts';
import { useSavedSubaccountSettings } from 'client/modules/subaccounts/hooks/useSavedSubaccountSettings';
import { getDefaultSubaccountProfile } from 'client/modules/subaccounts/utils/getDefaultSubaccountProfile';
import { Wallet } from 'ethers';
import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Context for managing the current subaccount and its signing preferences
 */
export function SubaccountContextProvider({ children }: WithChildren) {
  const {
    connectionStatus,
    primaryChain: { id: primaryChainId },
    primaryChainEnv,
    disconnect: baseDisconnect,
  } = useEVMContext();

  /**
   * Subaccount
   */

  const {
    selectedSubaccountName,
    saveSelectedSubaccountName,
    getSavedSubaccountProfile,
  } = useSavedSubaccountSettings();

  const currentSubaccount = useMemo((): Subaccount => {
    return {
      name: selectedSubaccountName ?? PRIMARY_SUBACCOUNT_NAME,
      chainEnv: primaryChainEnv,
      chainId: primaryChainId,
      address: connectionStatus?.address,
    };
  }, [
    selectedSubaccountName,
    primaryChainEnv,
    primaryChainId,
    connectionStatus?.address,
  ]);

  const currentSubaccountProfile = useMemo(
    () =>
      getSavedSubaccountProfile(currentSubaccount.name) ??
      getDefaultSubaccountProfile(currentSubaccount.name),
    [currentSubaccount.name, getSavedSubaccountProfile],
  );

  const getSubaccountProfile = useCallback(
    (subaccountName: string) =>
      getSavedSubaccountProfile(subaccountName) ??
      getDefaultSubaccountProfile(subaccountName),
    [getSavedSubaccountProfile],
  );

  const { app: appSubaccountNames } = useSubaccountNames();

  const canAddSubaccount = appSubaccountNames.length < SUBACCOUNT_LIMIT;

  /**
   * Signing preferences
   */

  // Authorized signer for the current session - not persisted
  const [sessionAuthorizedSigner, setSessionAuthorizedSigner] =
    useState<Wallet>();

  // Clear session signer on subaccount changes
  useEffect(() => {
    setSessionAuthorizedSigner(undefined);
  }, [currentSubaccount]);

  const {
    signingPreference: savedSigningPreference,
    didLoadPersistedValue: didLoadSigningPreferencePersistedValue,
    saveSigningPreference,
    clearPrivateKeyIfSaved,
  } = useSavedSubaccountSigningPreference(currentSubaccount.name);

  // Consolidate signing preference with any session state
  const signingPreference = useMemo(() => {
    if (!savedSigningPreference) {
      return;
    }
    if (savedSigningPreference.type === 'sign_always') {
      return savedSigningPreference;
    }
    return {
      ...savedSigningPreference,
      authorizedWallet:
        savedSigningPreference.authorizedWallet ?? sessionAuthorizedSigner,
    };
  }, [savedSigningPreference, sessionAuthorizedSigner]);

  // Update fn for signing preference changes
  const updateSigningPreference = useCallback<UpdateSigningPreferenceFn>(
    (newValue) => {
      if (newValue.type === 'sign_always') {
        saveSigningPreference({
          type: 'sign_always',
        });
        setSessionAuthorizedSigner(undefined);
      } else {
        saveSigningPreference({
          type: 'sign_once',
          rememberMe: newValue.rememberMe,
          privateKey: newValue.rememberMe
            ? newValue.authorizedWallet.privateKey
            : undefined,
        });
        setSessionAuthorizedSigner(newValue.authorizedWallet);
      }
    },
    [saveSigningPreference],
  );

  const disconnect = useCallback(() => {
    clearPrivateKeyIfSaved();
    setSessionAuthorizedSigner(undefined);
    baseDisconnect();
  }, [baseDisconnect, clearPrivateKeyIfSaved]);

  const data: SubaccountContextData = useMemo(() => {
    return {
      currentSubaccount,
      setCurrentSubaccountName: saveSelectedSubaccountName,
      currentSubaccountProfile,
      getSubaccountProfile,
      appSubaccountNames,
      canAddSubaccount,
      signingPreference: {
        current: signingPreference,
        didLoadPersistedValue: didLoadSigningPreferencePersistedValue,
        update: updateSigningPreference,
      },
      disconnect,
    };
  }, [
    currentSubaccount,
    saveSelectedSubaccountName,
    currentSubaccountProfile,
    getSubaccountProfile,
    appSubaccountNames,
    canAddSubaccount,
    signingPreference,
    didLoadSigningPreferencePersistedValue,
    updateSigningPreference,
    disconnect,
  ]);

  return (
    <SubaccountContext.Provider value={data}>
      <LinkedSignerSync />
      {children}
    </SubaccountContext.Provider>
  );
}
