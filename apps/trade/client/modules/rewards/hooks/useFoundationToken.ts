import {
  ARB_ARB_ONE,
  ARB_ARB_SEPOLIA,
  NOOP_TOKEN,
  Token,
  WMNT_MANTLE,
  WMNT_MANTLE_SEPOLIA,
  WSEI_SEI,
  WSEI_SEI_TESTNET,
} from '@vertex-protocol/react-client';
import { useEVMContext } from '@vertex-protocol/react-client';
import { useMemo } from 'react';

/**
 * Using a custom implementation here instead of relying on query data so that the data is never nullable
 */
export function useFoundationToken() {
  const { primaryChainEnv } = useEVMContext();

  return useMemo((): Token => {
    switch (primaryChainEnv) {
      case 'arbitrumTestnet':
        return ARB_ARB_SEPOLIA;
      case 'arbitrum':
        return ARB_ARB_ONE;
      case 'mantle':
        return WMNT_MANTLE;
      case 'mantleTestnet':
        return WMNT_MANTLE_SEPOLIA;
      case 'seiTestnet':
        return WSEI_SEI_TESTNET;
      case 'sei':
        return WSEI_SEI;
      default:
        return NOOP_TOKEN;
    }
  }, [primaryChainEnv]);
}
