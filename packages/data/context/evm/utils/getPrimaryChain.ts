import { ChainEnv } from '@vertex-protocol/client';
import {
  arbitrum,
  arbitrumSepolia,
  blast,
  blastSepolia,
  localhost,
  mantleSepoliaTestnet,
} from 'wagmi/chains';
import { PrimaryChain } from '../../../types';

export function getPrimaryChain(chainEnv: ChainEnv): PrimaryChain {
  switch (chainEnv) {
    case 'local':
      return localhost;
    case 'testnet':
      return arbitrumSepolia;
    case 'mantleTestnet':
      return mantleSepoliaTestnet;
    case 'blastTestnet':
      return blastSepolia;
    case 'mainnet':
      return arbitrum;
    case 'blastMainnet':
      return blast;
  }
}
