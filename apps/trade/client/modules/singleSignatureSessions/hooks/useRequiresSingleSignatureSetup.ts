import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

/** If user has never set a signing preference hook will return true */
export function useRequiresSingleSignatureSetup() {
  const { signingPreference } = useSubaccountContext();
  const { current: currentSigningPreference, didLoadPersistedValue } =
    signingPreference;

  return didLoadPersistedValue && !currentSigningPreference?.type;
}
