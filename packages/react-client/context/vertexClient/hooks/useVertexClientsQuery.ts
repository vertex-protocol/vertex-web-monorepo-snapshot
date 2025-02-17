import { useQuery } from '@tanstack/react-query';
import { ChainEnv, createVertexClient } from '@vertex-protocol/client';
import { getPublicClient } from '@wagmi/core';
import { JsonRpcSigner } from 'ethers';
import { useEffect, useMemo } from 'react';
import { useConfig } from 'wagmi';
import { PrimaryChain } from '../../../types';
import { createQueryKey, getPrimaryChain } from '../../../utils';
import { publicClientToProvider } from '../../evm';
import { VertexClientWithMetadata } from '../types';

interface Params {
  signer: JsonRpcSigner | undefined;
  signerChainId: number | undefined;
  supportedChainEnvs: ChainEnv[];
}

function vertexClientsQueryKey(supportedChainEnvs?: ChainEnv[]) {
  return createQueryKey('vertexClients', supportedChainEnvs);
}

export function useVertexClientsQuery({
  signer,
  signerChainId,
  supportedChainEnvs,
}: Params) {
  const wagmiConfig = useConfig();

  const chainEnvToPrimaryChain = useMemo(() => {
    return supportedChainEnvs.reduce(
      (acc, chainEnv) => {
        const primaryChain = getPrimaryChain(chainEnv);
        return { ...acc, [chainEnv]: primaryChain };
      },
      {} as Record<ChainEnv, PrimaryChain>,
    );
  }, [supportedChainEnvs]);

  const { data: vertexClientsByChainEnv, error } = useQuery({
    queryKey: vertexClientsQueryKey(supportedChainEnvs),
    queryFn: () => {
      return supportedChainEnvs.reduce(
        (prev, chainEnv) => {
          const primaryChain = chainEnvToPrimaryChain[chainEnv];
          const publicClient = getPublicClient(wagmiConfig, {
            chainId: primaryChain.id,
          });

          if (!publicClient) {
            throw Error(
              `[useVertexClientsQuery] No public client found for ${primaryChain.name}`,
            );
          }

          const publicProvider = publicClientToProvider(publicClient);

          // If the signer is on the primary chain, use it
          // Disallow signers from other chains as we can be in weird states where EIP712 signatures / values are using the wrong chain ID
          const useSigner =
            signer && signerChainId && signerChainId === primaryChain.id;
          const signerOrProvider = useSigner ? signer : publicProvider;
          const client = createVertexClient(chainEnv, {
            signerOrProvider,
          });

          prev[chainEnv] = {
            chainEnv,
            primaryChain,
            client,
            provider: publicProvider,
          };
          return prev;
        },
        {} as Record<ChainEnv, VertexClientWithMetadata>,
      );
    },
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  // Error and initialization logging
  useEffect(() => {
    if (error) {
      console.error(
        '[useVertexClientsQuery] Error creating Vertex clients',
        error,
      );
    } else if (vertexClientsByChainEnv) {
      console.debug(
        '[useVertexClientsQuery] Vertex clients initialized',
        Object.keys(vertexClientsByChainEnv),
      );
    }
  }, [error, vertexClientsByChainEnv]);

  // Update signer on the clients when it changes, similar to the logic in the query function, use the public client
  // if signer does not exist, or isn't on the correct chain for the client
  // With signer / signer chain ID changes, we don't want to refetch the entire query as that will reload dependencies
  // such as the TV charts, instead, we set the appropriate signer/provider on the clients directly
  useEffect(() => {
    if (!vertexClientsByChainEnv) {
      return;
    }

    console.debug(
      '[useVertexClientsQuery] Updating signer/provider on clients',
      signer,
      signerChainId,
    );

    Object.values(vertexClientsByChainEnv).forEach((clientWithMetadata) => {
      const useSigner =
        signer != null &&
        signerChainId != null &&
        BigInt(signerChainId) === BigInt(clientWithMetadata.primaryChain.id);

      const signerOrProvider = useSigner ? signer : clientWithMetadata.provider;

      clientWithMetadata.client.setSignerOrProvider(signerOrProvider);
    });
  }, [signer, signerChainId, vertexClientsByChainEnv]);

  return {
    vertexClientsByChainEnv,
  };
}
