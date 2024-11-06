import { usePrimaryChainId } from '@vertex-protocol/react-client';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import {
  SavedSubaccountSigningPreference,
  SubaccountSigningPreference,
} from 'client/modules/singleSignatureSessions/types';
import { getSubaccountKey } from 'client/modules/subaccounts/utils/getSubaccountKey';
import { Wallet } from 'ethers';
import { omit } from 'lodash';
import { useCallback, useMemo } from 'react';

interface UseSubaccountSigningPreference {
  didLoadPersistedValue: boolean;
  // Undefined if none is saved
  signingPreference?: SubaccountSigningPreference;
  saveSigningPreference: (
    newPreference: SavedSubaccountSigningPreference,
  ) => void;
  // Delete any saved private keys, used on disconnect
  clearPrivateKeyIfSaved: () => void;
  // Completely delete any saved settings
  clearSigningPreference: () => void;
}

/**
 * Hook to access & modify the persisted subaccount signing preference
 */
export function useSavedSubaccountSigningPreference(
  subaccountName: string,
): UseSubaccountSigningPreference {
  const primaryChainId = usePrimaryChainId();
  const { savedUserSettings, setSavedUserSettings, didLoadPersistedValue } =
    useSavedUserSettings();

  const subaccountKey = useMemo(() => {
    return getSubaccountKey(primaryChainId, subaccountName);
  }, [primaryChainId, subaccountName]);

  const signingPreference = useMemo(():
    | SubaccountSigningPreference
    | undefined => {
    if (!subaccountKey) {
      return;
    }

    const savedPreferenceForSubaccount:
      | SavedSubaccountSigningPreference
      | undefined =
      savedUserSettings.signingPreferenceBySubaccountKey?.[subaccountKey];

    // Map the localstorage type to the expected type
    if (savedPreferenceForSubaccount?.type === 'sign_always') {
      return {
        type: 'sign_always',
      };
    }
    if (savedPreferenceForSubaccount?.type === 'sign_once') {
      let wallet: Wallet | undefined;
      if (savedPreferenceForSubaccount.privateKey) {
        try {
          wallet = new Wallet(savedPreferenceForSubaccount.privateKey);
        } catch (err) {
          console.error('Error loading saved signing wallet', err);
        }
      }

      return {
        type: 'sign_once',
        authorizedWallet: wallet,
        rememberMe: savedPreferenceForSubaccount.rememberMe,
      };
    }

    return;
  }, [subaccountKey, savedUserSettings.signingPreferenceBySubaccountKey]);

  const saveSigningPreference = useCallback(
    (newPreference: SavedSubaccountSigningPreference) => {
      if (!subaccountKey) {
        return;
      }

      setSavedUserSettings((prev) => {
        prev.signingPreferenceBySubaccountKey[subaccountKey] = newPreference;

        return prev;
      });
    },
    [setSavedUserSettings, subaccountKey],
  );

  const clearPrivateKeyIfSaved = useCallback(() => {
    if (!subaccountKey) {
      return;
    }

    setSavedUserSettings((prev) => {
      const preferencesForSubaccount =
        prev.signingPreferenceBySubaccountKey[subaccountKey];

      if (preferencesForSubaccount?.type !== 'sign_once') {
        return prev;
      }

      prev.signingPreferenceBySubaccountKey[subaccountKey] = {
        ...preferencesForSubaccount,
        privateKey: undefined,
      };

      return prev;
    });
  }, [setSavedUserSettings, subaccountKey]);

  const clearSigningPreference = useCallback(() => {
    if (!subaccountKey) {
      return;
    }

    setSavedUserSettings((prev) => {
      prev.signingPreferenceBySubaccountKey = omit(
        prev.signingPreferenceBySubaccountKey,
        subaccountKey,
      );
      return prev;
    });
  }, [setSavedUserSettings, subaccountKey]);

  return {
    didLoadPersistedValue,
    signingPreference: signingPreference,
    saveSigningPreference,
    clearSigningPreference,
    clearPrivateKeyIfSaved,
  };
}
