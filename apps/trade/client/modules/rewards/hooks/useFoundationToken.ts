import {
  ARB_ARB_ONE,
  ARB_ARB_SEPOLIA,
  NOOP_TOKEN,
  Token,
  useEVMContext,
  WMNT_MANTLE,
  WMNT_MANTLE_SEPOLIA,
  WSEI_SEI,
  WSEI_SEI_TESTNET,
} from '@vertex-protocol/react-client';
import {
  WAVAX_AVAX,
  WAVAX_AVAX_TESTNET,
} from '@vertex-protocol/react-client/context/metadata/productMetadata/avax';
import {
  WS_SONIC,
  WS_SONIC_TESTNET,
} from '@vertex-protocol/react-client/context/metadata/productMetadata/sonic';
import { useMemo } from 'react';

/**
 * Returns the foundation token based on the current chain. A "foundation token" is the token associated
 * with the rewards distributed in partnership with the chain itself. For example: wMNT on Mantle, wSEI on Sei, ARB on Arbitrum, etc.
 *
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
      case 'sonicTestnet':
        return WS_SONIC_TESTNET;
      case 'sonic':
        return WS_SONIC;
      case 'avaxTestnet':
        return WAVAX_AVAX_TESTNET;
      case 'avax':
        return WAVAX_AVAX;
      default:
        return NOOP_TOKEN;
    }
  }, [primaryChainEnv]);
}
