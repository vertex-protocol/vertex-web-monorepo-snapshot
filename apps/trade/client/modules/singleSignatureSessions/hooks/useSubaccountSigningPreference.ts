import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useSavedSubaccountSigningPreference } from 'client/modules/singleSignatureSessions/hooks/useSavedSubaccountSigningPreference';
import { SubaccountSigningPreference } from 'client/modules/singleSignatureSessions/types';

/**
 * Hook to get the signing preference for a subaccount, or undefined if none is saved
 *
 * @param subaccountName The subaccount name to get the signing preference for, defaults to the current subaccount
 */
export function useSubaccountSigningPreference(
  subaccountName?: string,
): SubaccountSigningPreference | undefined {
  const {
    currentSubaccount,
    signingPreference: { current: currentSubaccountSigningPreference },
  } = useSubaccountContext();

  const targetSubaccountName = subaccountName ?? currentSubaccount.name;

  const { signingPreference: savedSenderSigningPreference } =
    useSavedSubaccountSigningPreference(targetSubaccountName);

  // If `rememberMe` is off, the saved signing preference won't include the 1CT key. In this case,
  // we can still take advantage of 1CT (even when `rememberMe` is off) by
  // using the current signing preference from `SubaccountContext` instead of the saved one.
  return currentSubaccount.name === targetSubaccountName
    ? currentSubaccountSigningPreference
    : savedSenderSigningPreference;
}
