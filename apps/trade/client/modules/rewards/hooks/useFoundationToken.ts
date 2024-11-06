import { useEVMContext } from '@vertex-protocol/react-client';
import {
  arbitrum,
  arbitrumSepolia,
  mantle,
  mantleSepoliaTestnet,
  seiTestnet,
  sei,
} from 'viem/chains';
import {
  NOOP_TOKEN,
  ARB_ARB_ONE,
  ARB_ARB_SEPOLIA,
  WMNT_MANTLE,
  WMNT_MANTLE_SEPOLIA,
  WSEI_SEI_TESTNET,
  WSEI_SEI,
} from '@vertex-protocol/metadata';
import { Token } from '@vertex-protocol/metadata';
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
      case seiTestnet.id:
        return WSEI_SEI_TESTNET;
      case sei.id:
        return WSEI_SEI;
      default:
        return NOOP_TOKEN;
    }
  }, [primaryChain.id]);
}
