import { useSubaccountContext } from 'client/context/subaccount/SubaccountContext';
import { useRequiresApproveSignOnce } from 'client/modules/singleSignatureSessions/hooks/useRequiresApproveSignOnce';

export function useIsSingleSignatureSession({
  requireActive,
}: { requireActive?: boolean } = {}) {
  const requiresApprove = useRequiresApproveSignOnce();
  const {
    signingPreference: { current },
  } = useSubaccountContext();

  if (requireActive) {
    return current?.type === 'sign_once' && !requiresApprove;
  }

  return current?.type === 'sign_once';
}
