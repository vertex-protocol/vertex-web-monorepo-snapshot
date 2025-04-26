import { ChainEnv } from '@vertex-protocol/client';
import { useSearchParams } from 'next/navigation';
import { useMemo } from 'react';

/**
 * We use the ?chain=xxx param to create links pointing to a particular chain env
 */
export function useChainEnvQueryParam({
  supportedChainEnvs,
}: {
  supportedChainEnvs: ChainEnv[];
}) {
  const searchParams = useSearchParams();

  const chainEnv = searchParams.get('chain') as ChainEnv;

  return useMemo(() => {
    if (supportedChainEnvs.includes(chainEnv)) {
      return chainEnv;
    }

    if (chainEnv) {
      console.debug(
        '[useChainEnvQueryParam] Unsupported chain in query param:',
        chainEnv,
      );
    }
  }, [chainEnv, supportedChainEnvs]);
}
