import { ChainEnv } from '@vertex-protocol/client';
import {
  ABSTRACT_CHAIN_ENVS,
  ARB_CHAIN_ENVS,
  BASE_CHAIN_ENVS,
  BLAST_CHAIN_ENVS,
  MANTLE_CHAIN_ENVS,
  SEI_CHAIN_ENVS,
  SONIC_CHAIN_ENVS,
} from '../../../../consts';

/**
 * The overarching "type" of the chain - regardless of whether it's testnet or mainnet
 * Ex. Arbitrum Sepolia -> Chain env type of arbitrum
 */
export type ChainEnvType =
  | 'arbitrum'
  | 'mantle'
  | 'sei'
  | 'blast'
  | 'base'
  | 'sonic'
  | 'abstract';

export function getChainEnvType(chainEnv: ChainEnv): ChainEnvType {
  if (ARB_CHAIN_ENVS.includes(chainEnv)) {
    return 'arbitrum';
  }
  if (MANTLE_CHAIN_ENVS.includes(chainEnv)) {
    return 'mantle';
  }
  if (SEI_CHAIN_ENVS.includes(chainEnv)) {
    return 'sei';
  }
  if (BLAST_CHAIN_ENVS.includes(chainEnv)) {
    return 'blast';
  }
  if (BASE_CHAIN_ENVS.includes(chainEnv)) {
    return 'base';
  }
  if (SONIC_CHAIN_ENVS.includes(chainEnv)) {
    return 'sonic';
  }
  if (ABSTRACT_CHAIN_ENVS.includes(chainEnv)) {
    return 'abstract';
  }
  throw Error('Unsupported chain type');
}
