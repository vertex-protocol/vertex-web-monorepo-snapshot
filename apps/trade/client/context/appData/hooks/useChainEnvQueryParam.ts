import { ChainEnv } from '@vertex-protocol/client';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

/**
 * We use the ?chain=xxx param to create links pointing to a particular chain env
 */
export function useChainEnvQueryParam({
  supportedChainEnvs,
}: {
  supportedChainEnvs: ChainEnv[];
}) {
  const {
    query: { chain },
  } = useRouter();

  return useMemo(() => {
    if (
      typeof chain === 'string' &&
      supportedChainEnvs.includes(chain as ChainEnv)
    ) {
      return chain as ChainEnv;
    }

    if (chain) {
      console.debug(
        '[useChainEnvQueryParam] Unsupported chain in query param:',
        chain,
      );
    }
  }, [chain, supportedChainEnvs]);
}
