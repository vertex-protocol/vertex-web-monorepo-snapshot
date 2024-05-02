import { VertexClient } from '@vertex-protocol/client';
import { WithChildren } from '@vertex-protocol/web-common';
import { createContext, useContext, useMemo } from 'react';
import { useEVMContext } from '../evm';
import { getVertexClientOpts } from './getVertexClientOpts';
import { useBaseVertexClient } from './useBaseVertexClient';

interface Props extends WithChildren {}

type VertexClientContextData = VertexClient | undefined;

const VertexClientContext = createContext<VertexClientContextData>(
  {} as VertexClientContextData,
);

export const useVertexClient = () => useContext(VertexClientContext);

export function VertexClientContextProvider({ children }: Props) {
  const {
    primaryChainEnv,
    connectionStatus: { signer },
    primaryProvider: provider,
    primaryChain: { id: primaryChainId },
  } = useEVMContext();

  const clientOpts = useMemo(() => {
    return getVertexClientOpts(primaryChainEnv);
  }, [primaryChainEnv]);

  const vertexClient = useBaseVertexClient({
    signer,
    provider,
    primaryChainId,
    clientOpts,
  });

  const data: VertexClientContextData = useMemo(() => {
    return vertexClient;
  }, [vertexClient]);

  return (
    <VertexClientContext.Provider value={data}>
      {children}
    </VertexClientContext.Provider>
  );
}
