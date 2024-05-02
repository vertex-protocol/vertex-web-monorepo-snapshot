import { useEVMContext } from '@vertex-protocol/web-data';
import { arbitrum, arbitrumSepolia } from '@wagmi/core/chains';
import {
  ARB_ARB_ONE,
  ARB_ARB_SEPOLIA,
} from 'common/productMetadata/arbitrum/tokens';
import { NOOP_TOKEN } from 'common/productMetadata/noopMetadata';
import { Token } from 'common/productMetadata/types';
import { useMemo } from 'react';

/**
 * Using a custom implementation here instead of relying on query data so that the data is never nullable
 */
export function useArbToken() {
  const { primaryChain } = useEVMContext();

  return useMemo((): Token => {
    switch (primaryChain.id) {
      case arbitrumSepolia.id:
        return ARB_ARB_SEPOLIA;
      case arbitrum.id:
        return ARB_ARB_ONE;
    }
    return NOOP_TOKEN;
  }, [primaryChain.id]);
}
