import { AccountWithPrivateKey } from '@vertex-protocol/client';
import { useEVMContext } from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { SUBACCOUNT_LIMIT } from 'client/context/subaccount/consts';
import { useSubaccountNames } from 'client/context/subaccount/hooks/useSubaccountNames';
import {
  SubaccountContext,
  SubaccountContextData,
} from 'client/context/subaccount/SubaccountContext';
import {
  AppSubaccount,
  UpdateSigningPreferenceFn,
} from 'client/context/subaccount/types';
import { LinkedSignerSync } from 'client/modules/singleSignatureSessions/components/LinkedSignerSync';
import { useSavedSubaccountSigningPreference } from 'client/modules/singleSignatureSessions/hooks/useSavedSubaccountSigningPreference';
import { SubaccountSigningPreference } from 'client/modules/singleSignatureSessions/types';
import { PRIMARY_SUBACCOUNT_NAME } from 'client/modules/subaccounts/consts';
import { useSavedSubaccountSettings } from 'client/modules/subaccounts/hooks/useSavedSubaccountSettings';
import { getDefaultSubaccountProfile } from 'client/modules/subaccounts/utils/getDefaultSubaccountProfile';
import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * Context for managing the current subaccount and its signing preferences
 */
export function SubaccountContextProvider({ children }: WithChildren) {
  const {
    connectionStatus,
    primaryChain: { id: primaryChainId },
    primaryChainEnv,
  } = useEVMContext();

  /**
   * Subaccount
   */

  const {
    selectedSubaccountName,
    saveSelectedSubaccountName,
    getSavedSubaccountProfile,
  } = useSavedSubaccountSettings();

  const currentSubaccount = useMemo((): AppSubaccount => {
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

  // Authorized linked signer for the current session - not persisted
  const [linkedSignerForSession, setLinkedSignerForSession] =
    useState<AccountWithPrivateKey>();

  // Clear session linked signer on subaccount changes
  useEffect(() => {
    setLinkedSignerForSession(undefined);
  }, [currentSubaccount]);

  const {
    signingPreference: savedSigningPreference,
    didLoadPersistedValue: didLoadSigningPreferencePersistedValue,
    saveSigningPreference,
  } = useSavedSubaccountSigningPreference(currentSubaccount.name);

  // Consolidate signing preference with any session state
  const signingPreference = useMemo(():
    | SubaccountSigningPreference
    | undefined => {
    if (!savedSigningPreference) {
      return;
    }
    if (savedSigningPreference.type === 'sign_always') {
      return savedSigningPreference;
    }
    return {
      ...savedSigningPreference,
      linkedSigner:
        savedSigningPreference.linkedSigner ?? linkedSignerForSession,
    };
  }, [savedSigningPreference, linkedSignerForSession]);

  // Update fn for signing preference changes
  const updateSigningPreference = useCallback<UpdateSigningPreferenceFn>(
    (newValue) => {
      if (newValue.type === 'sign_always') {
        saveSigningPreference({
          type: 'sign_always',
        });
        setLinkedSignerForSession(undefined);
      } else {
        saveSigningPreference({
          type: 'sign_once',
          rememberMe: newValue.rememberMe,
          privateKey: newValue.rememberMe
            ? newValue.linkedSigner?.privateKey
            : undefined,
        });
        setLinkedSignerForSession(newValue.linkedSigner);
      }
    },
    [saveSigningPreference],
  );

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
  ]);

  return (
    <SubaccountContext value={data}>
      <LinkedSignerSync />
      {children}
    </SubaccountContext>
  );
}
