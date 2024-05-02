import { useQuery } from '@tanstack/react-query';
import {
  createVertexClient,
  CreateVertexClientContextOpts,
} from '@vertex-protocol/client';
import { useEffect } from 'react';
import { JsonRpcSigner, Provider } from 'ethers';
import { getChainIdFromSigner } from '@vertex-protocol/contracts';
import { asyncResult } from '@vertex-protocol/web-common';
import { createQueryKey } from '../../utils';

interface Params {
  signer: JsonRpcSigner | undefined;
  provider: Provider | undefined;
  clientOpts: CreateVertexClientContextOpts;
  primaryChainId: number;
}

export function useBaseVertexClient(params: Params) {
  const { primaryChainId, signer, provider, clientOpts } = params;
  const hasSignerOrProvider = !!signer || !!provider;

  const { data: vertexClient, error } = useQuery({
    queryKey: createQueryKey('vertexClient', primaryChainId, clientOpts),
    queryFn: async () => {
      const client = await createVertexClient(clientOpts, {
        signerOrProvider: await getSignerOrProvider({
          primaryChainId,
          signer,
          provider,
        }),
      });

      console.log('Vertex client initialized');

      return client;
    },
    enabled: hasSignerOrProvider,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    staleTime: Infinity,
  });

  // Error and initialization logging
  useEffect(() => {
    if (error) {
      console.error('Error creating Vertex client', error);
    }
  }, [error]);

  // Update signerOrProvider on the client when it changes
  useEffect(() => {
    if (!vertexClient || !hasSignerOrProvider) {
      return;
    }
    let cancelled = false;

    getSignerOrProvider(params)
      .then((signerOrProvider) => {
        if (cancelled) {
          return;
        }
        if (vertexClient.context.signerOrProvider === signerOrProvider) {
          return;
        }
        vertexClient.setSignerOrProvider(signerOrProvider).then(() => {
          console.log('Vertex client updated');
        });
      })
      .catch((err) => {
        if (cancelled) {
          return;
        }
        console.error('Error updating signer/provider on Vertex client', err);
      });

    return () => {
      cancelled = true;
    };
  }, [hasSignerOrProvider, params, vertexClient]);

  return vertexClient;
}

async function getSignerOrProvider({
  signer,
  provider,
  primaryChainId,
}: Pick<Params, 'signer' | 'provider' | 'primaryChainId'>) {
  // If the signer is on the primary chain, use it
  // Disallow signers from other chains as we can be in weird states where EIP712 signatures / values are using the wrong chain ID
  if (signer) {
    const [signerChainIdData, signerChainIdError] = await asyncResult(
      getChainIdFromSigner(signer),
    );
    if (signerChainIdError) {
      console.warn('No signer chain ID found', signerChainIdError);
    }
    if (signerChainIdData === BigInt(primaryChainId)) {
      return signer;
    }
  }
  // Otherwise, use the provider
  if (!provider) {
    throw Error('No provider for Vertex client');
  }
  return provider;
}
