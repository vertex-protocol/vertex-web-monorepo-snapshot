import { useRequiresDeposit } from 'client/hooks/subaccount/useRequiresDeposit';
import { useRequiresApproveSignOnce } from 'client/modules/singleSignatureSessions/hooks/useRequiresApproveSignOnce';
import { useMemo } from 'react';
import { useEVMContext } from '@vertex-protocol/react-client';
import { useIsClient } from '@vertex-protocol/web-common';
import { useRequiresSingleSignatureSetup } from 'client/modules/singleSignatureSessions/hooks/useRequiresSingleSignatureSetup';

export type UserStateError =
  | 'not_connected'
  | 'incorrect_chain'
  | 'requires_deposit'
  | 'requires_sign_once_approval'
  | 'requires_single_signature_setup';

export function useUserStateError(): UserStateError | undefined {
  const isClient = useIsClient();
  const { connectionStatus, chainStatus } = useEVMContext();
  const requiresDeposit = useRequiresDeposit();
  const requiresApproveSignOnce = useRequiresApproveSignOnce();
  const requiresSingleSignatureSetup = useRequiresSingleSignatureSetup();

  return useMemo(() => {
    if (!isClient) {
      return;
    }
    if (connectionStatus.type !== 'connected') {
      return 'not_connected';
    }
    if (chainStatus.isIncorrectChain) {
      return 'incorrect_chain';
    }
    if (requiresDeposit) {
      return 'requires_deposit';
    }
    if (requiresApproveSignOnce) {
      return 'requires_sign_once_approval';
    }
    if (requiresSingleSignatureSetup) {
      return 'requires_single_signature_setup';
    }
  }, [
    isClient,
    connectionStatus.type,
    chainStatus.isIncorrectChain,
    requiresSingleSignatureSetup,
    requiresApproveSignOnce,
    requiresDeposit,
  ]);
}
