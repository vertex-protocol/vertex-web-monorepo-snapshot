import { useQuery } from '@tanstack/react-query';
import {
  CHAIN_ENV_TO_CHAIN,
  ChainEnv,
  createVertexClient,
  WalletClientWithAccount,
} from '@vertex-protocol/client';
import { getPublicClient } from '@wagmi/core';
import { useEffect } from 'react';
import { useConfig } from 'wagmi';
import { createQueryKey } from '../../../utils';
import { VertexClientWithMetadata } from '../types';

interface Params {
  walletClient: WalletClientWithAccount | undefined;
  supportedChainEnvs: ChainEnv[];
}

function vertexClientsQueryKey(supportedChainEnvs?: ChainEnv[]) {
  return createQueryKey('vertexClients', supportedChainEnvs);
}

export function useVertexClientsQuery({
  walletClient,
  supportedChainEnvs,
}: Params) {
  const wagmiConfig = useConfig();
  const walletClientChainId = walletClient?.chain?.id;

  const { data: vertexClientsByChainEnv, error } = useQuery({
    queryKey: vertexClientsQueryKey(supportedChainEnvs),
    queryFn: () => {
      return supportedChainEnvs.reduce(
        (prev, chainEnv) => {
          const primaryChain = CHAIN_ENV_TO_CHAIN[chainEnv];
          const publicClient = getPublicClient(wagmiConfig, {
            chainId: primaryChain.id,
          });

          if (!publicClient) {
            throw new Error(
              `[useVertexClientsQuery] No public client found for ${primaryChain.name}`,
            );
          }

          // Only set the wallet client for the chain that it's currently set to
          // Otherwise, we can be in weird states where EIP712 signatures / values are using the wrong chain ID
          const useWalletClient =
            walletClientChainId !== undefined &&
            walletClientChainId === primaryChain.id;
          const client = createVertexClient(chainEnv, {
            walletClient: useWalletClient ? walletClient : undefined,
            publicClient,
          });

          prev[chainEnv] = {
            chainEnv,
            primaryChain,
            client,
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

  // Update walletClient on the clients when it (or its chain ID) changes. We don't want to refetch the entire query
  // as that will reload dependencies such as the TV charts
  useEffect(() => {
    if (!vertexClientsByChainEnv) {
      return;
    }

    console.debug(
      '[useVertexClientsQuery] Updating WalletClient on Vertex clients',
      walletClient,
      walletClientChainId,
    );

    Object.values(vertexClientsByChainEnv).forEach((clientWithMetadata) => {
      const useWalletClient =
        walletClientChainId !== undefined &&
        walletClientChainId === clientWithMetadata.primaryChain.id;

      clientWithMetadata.client.setWalletClient(
        useWalletClient ? walletClient : undefined,
      );
    });
  }, [walletClient, vertexClientsByChainEnv, walletClientChainId]);

  return {
    vertexClientsByChainEnv,
  };
}
