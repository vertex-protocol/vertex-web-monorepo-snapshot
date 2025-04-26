import { ChainEnv } from '@vertex-protocol/client';
import { createContext, ReactNode, use, useCallback, useMemo } from 'react';
import { useEVMContext } from '../evm';
import { useVertexClientsQuery } from './hooks/useVertexClientsQuery';
import {
  VertexClientSetLinkedSignerParams,
  VertexClientWithMetadata,
} from './types';
import { getWalletClientForLinkedSignerAccount } from './utils';

interface Props {
  children: ReactNode;
}

interface VertexClientContextData {
  // Instance of VertexClient on the current primary chain
  primaryChainVertexClient: VertexClientWithMetadata | undefined;
  vertexClientsByChainEnv:
    | Record<ChainEnv, VertexClientWithMetadata>
    | undefined;

  // Updates the 1CT signer on the relevant vertex client
  setLinkedSigner(params: VertexClientSetLinkedSignerParams): void;
}

const VertexClientContext = createContext<VertexClientContextData>(
  {} as VertexClientContextData,
);

export const useVertexClientContext = () => use(VertexClientContext);

export function VertexClientContextProvider({ children }: Props) {
  const {
    primaryChainEnv,
    supportedChainEnvs,
    connectionStatus: { walletClient },
  } = useEVMContext();

  const { vertexClientsByChainEnv } = useVertexClientsQuery({
    walletClient,
    supportedChainEnvs,
  });

  const setLinkedSigner = useCallback(
    ({ signerAccount, chainEnv }: VertexClientSetLinkedSignerParams) => {
      const vertexClientWithMetadata = vertexClientsByChainEnv?.[chainEnv];
      if (!vertexClientWithMetadata) {
        console.warn(
          `[VertexClientContextProvider] Could not find Vertex Client for ${chainEnv}. Skipping setting linked signer.`,
        );
        return;
      }
      vertexClientWithMetadata.client.setLinkedSigner(
        signerAccount
          ? getWalletClientForLinkedSignerAccount(
              signerAccount,
              vertexClientWithMetadata.primaryChain,
            )
          : null,
      );
    },
    [vertexClientsByChainEnv],
  );

  const data: VertexClientContextData = useMemo(() => {
    return {
      primaryChainVertexClient: vertexClientsByChainEnv?.[primaryChainEnv],
      vertexClientsByChainEnv,
      setLinkedSigner,
    };
  }, [primaryChainEnv, setLinkedSigner, vertexClientsByChainEnv]);

  return <VertexClientContext value={data}>{children}</VertexClientContext>;
}
