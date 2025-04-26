import { CHAIN_ENV_TO_CHAIN, ChainEnv } from '@vertex-protocol/client';
import type { PrimaryChain } from '../types';

export function getPrimaryChain(chainEnv: ChainEnv): PrimaryChain {
  return CHAIN_ENV_TO_CHAIN[chainEnv];
}
