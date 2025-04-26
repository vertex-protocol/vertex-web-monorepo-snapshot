import { AccountWithPrivateKey } from '@vertex-protocol/client';
import { useEVMContext } from '@vertex-protocol/react-client';
import { getValidatedHex } from '@vertex-protocol/utils';
import { useSavedUserSettings } from 'client/modules/localstorage/userSettings/useSavedUserSettings';
import {
  SavedSubaccountSigningPreference,
  SubaccountSigningPreference,
} from 'client/modules/singleSignatureSessions/types';
import { getSubaccountKey } from 'client/modules/subaccounts/utils/getSubaccountKey';
import { omit } from 'lodash';
import { useCallback, useMemo } from 'react';
import { privateKeyToAccount } from 'viem/accounts';

interface UseSubaccountSigningPreference {
  didLoadPersistedValue: boolean;
  // Undefined if none is saved
  signingPreference?: SubaccountSigningPreference;
  saveSigningPreference: (
    newPreference: SavedSubaccountSigningPreference,
  ) => void;
  // Completely delete any saved settings
  clearSigningPreference: () => void;
}

/**
 * Hook to access & modify the persisted subaccount signing preference
 */
export function useSavedSubaccountSigningPreference(
  subaccountName: string,
): UseSubaccountSigningPreference {
  const { primaryChainEnv } = useEVMContext();
  const { savedUserSettings, setSavedUserSettings, didLoadPersistedValue } =
    useSavedUserSettings();

  const subaccountKey = useMemo(() => {
    return getSubaccountKey(primaryChainEnv, subaccountName);
  }, [primaryChainEnv, subaccountName]);

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
      let linkedSigner: AccountWithPrivateKey | undefined;
      if (savedPreferenceForSubaccount.privateKey) {
        try {
          const privateKey = getValidatedHex(
            savedPreferenceForSubaccount.privateKey,
          );
          linkedSigner = {
            privateKey,
            account: privateKeyToAccount(privateKey),
          };
        } catch (err) {
          console.error('Error loading saved signing wallet', err);
        }
      }

      return {
        type: 'sign_once',
        linkedSigner,
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
  };
}
