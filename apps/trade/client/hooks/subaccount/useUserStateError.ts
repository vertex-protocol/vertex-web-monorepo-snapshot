import { useRequiresDeposit } from 'client/hooks/subaccount/useRequiresDeposit';
import { useRequiresApproveSignOnce } from 'client/modules/singleSignatureSessions/hooks/useRequiresApproveSignOnce';
import { useMemo } from 'react';
import { useEVMContext } from '@vertex-protocol/web-data';
import { useIsClient } from '@vertex-protocol/web-common';

export type UserStateError =
  | 'not_connected'
  | 'incorrect_chain'
  | 'requires_deposit'
  | 'requires_sign_once_approval';

export function useUserStateError(): UserStateError | undefined {
  const isClient = useIsClient();
  const { connectionStatus, chainStatus } = useEVMContext();
  const requiresDeposit = useRequiresDeposit();
  const requiresApproveSignOnce = useRequiresApproveSignOnce();

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
    if (requiresApproveSignOnce) {
      return 'requires_sign_once_approval';
    }
    if (requiresDeposit) {
      return 'requires_deposit';
    }
  }, [
    connectionStatus.type,
    isClient,
    chainStatus.isIncorrectChain,
    requiresApproveSignOnce,
    requiresDeposit,
  ]);
}
