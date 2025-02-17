import { ChainEnv } from '@vertex-protocol/client';
import { PrimaryChain, useEVMContext } from '@vertex-protocol/react-client';
import { useIsClient } from '@vertex-protocol/web-common';
import { useRequiresInitialDeposit } from 'client/hooks/subaccount/useRequiresInitialDeposit';
import { useRequiresApproveSignOnce } from 'client/modules/singleSignatureSessions/hooks/useRequiresApproveSignOnce';
import { useRequiresSingleSignatureSetup } from 'client/modules/singleSignatureSessions/hooks/useRequiresSingleSignatureSetup';
import { useMemo } from 'react';

export type UserStateError =
  | 'not_connected'
  | 'incorrect_connected_chain'
  | 'incorrect_chain_env'
  | 'requires_initial_deposit'
  | 'requires_sign_once_approval'
  | 'requires_single_signature_setup';

interface Params {
  requiredConnectedChain?: PrimaryChain;
  requiredChainEnv?: ChainEnv;
}

export function useUserStateError(params?: Params): UserStateError | undefined {
  const isClient = useIsClient();
  const { connectionStatus, chainStatus, primaryChainEnv, primaryChain } =
    useEVMContext();
  const requiresInitialDeposit = useRequiresInitialDeposit();
  const requiresApproveSignOnce = useRequiresApproveSignOnce();
  const requiresSingleSignatureSetup = useRequiresSingleSignatureSetup();

  return useMemo((): UserStateError | undefined => {
    if (!isClient) {
      return;
    }
    if (connectionStatus.type !== 'connected') {
      return 'not_connected';
    }

    if (
      params?.requiredChainEnv &&
      params.requiredChainEnv !== primaryChainEnv
    ) {
      return 'incorrect_chain_env';
    }

    // If a specific chain is required, handle for required chain otherwise handle for primary chain
    if (
      chainStatus.connectedChain?.id !==
      (params?.requiredConnectedChain?.id ?? primaryChain.id)
    ) {
      return 'incorrect_connected_chain';
    }
    if (requiresInitialDeposit) {
      return 'requires_initial_deposit';
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
    params?.requiredChainEnv,
    params?.requiredConnectedChain,
    primaryChainEnv,
    primaryChain.id,
    requiresInitialDeposit,
    requiresApproveSignOnce,
    requiresSingleSignatureSetup,
    chainStatus.connectedChain?.id,
  ]);
}
