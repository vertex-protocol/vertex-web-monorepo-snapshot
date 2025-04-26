import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';

// Determines if the user wants to use sign once, but the private key is not available
export function useRequiresApproveSignOnce() {
  const { signingPreference } = useSubaccountContext();
  const { current: currentSigningPreference } = signingPreference;

  return (
    currentSigningPreference?.type === 'sign_once' &&
    !currentSigningPreference.linkedSigner
  );
}
