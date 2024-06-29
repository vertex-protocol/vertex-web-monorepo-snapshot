import { useEVMContext } from '@vertex-protocol/react-client';
import {
  arbitrum,
  arbitrumSepolia,
  mantle,
  mantleSepoliaTestnet,
} from 'wagmi/chains';
import {
  ARB_ARB_ONE,
  ARB_ARB_SEPOLIA,
} from 'common/productMetadata/arbitrum/tokens';
import {
  WMNT_MANTLE,
  WMNT_MANTLE_SEPOLIA,
} from 'common/productMetadata/mantle/tokens';
import { NOOP_TOKEN } from 'common/productMetadata/noopMetadata';
import { Token } from 'common/productMetadata/types';
import { useMemo } from 'react';

/**
 * Using a custom implementation here instead of relying on query data so that the data is never nullable
 */
export function useFoundationToken() {
  const { primaryChain } = useEVMContext();

  return useMemo((): Token => {
    switch (primaryChain.id) {
      case arbitrumSepolia.id:
        return ARB_ARB_SEPOLIA;
      case arbitrum.id:
        return ARB_ARB_ONE;
      case mantle.id:
        return WMNT_MANTLE;
      case mantleSepoliaTestnet.id:
        return WMNT_MANTLE_SEPOLIA;
    }
    return NOOP_TOKEN;
  }, [primaryChain.id]);
}
