import { ChainEnv } from '@vertex-protocol/client';
import {
  abstract,
  abstractTestnet,
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  berachainTestnet,
  blast,
  blastSepolia,
  localhost,
  mantle,
  mantleSepoliaTestnet,
  sei,
  seiTestnet,
} from 'wagmi/chains';
import { sonic, sonicTestnet } from '../chains';
import { PrimaryChain } from '../types';

export function getPrimaryChain(chainEnv: ChainEnv): PrimaryChain {
  switch (chainEnv) {
    case 'local':
      return localhost;
    case 'arbitrumTestnet':
      return arbitrumSepolia;
    case 'mantleTestnet':
      return mantleSepoliaTestnet;
    case 'blastTestnet':
      return blastSepolia;
    case 'arbitrum':
      return arbitrum;
    case 'mantle':
      return mantle;
    case 'blast':
      return blast;
    case 'seiTestnet':
      return seiTestnet;
    case 'sei':
      return sei;
    case 'baseTestnet':
      return baseSepolia;
    case 'base':
      return base;
    case 'sonicTestnet':
      return sonicTestnet;
    case 'sonic':
      return sonic;
    case 'beraTestnet':
      return berachainTestnet;
    case 'abstractTestnet':
      return abstractTestnet;
    case 'abstract':
      return abstract;
  }
}
