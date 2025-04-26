import { CHAIN_ID_TO_CHAIN_ENV, ChainEnv } from '@vertex-protocol/client';
import { PrimaryChainID } from '../types';

export function getPrimaryChainEnv<TChainId extends number>(
  primaryChainId: TChainId,
): TChainId extends PrimaryChainID ? ChainEnv : ChainEnv | undefined {
  return CHAIN_ID_TO_CHAIN_ENV[primaryChainId as PrimaryChainID];
}
