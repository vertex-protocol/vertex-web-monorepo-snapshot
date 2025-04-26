import { ChainEnv, VertexClient } from '@vertex-protocol/client';
import { Account } from 'viem';
import { PrimaryChain } from '../../types';

export interface VertexClientWithMetadata {
  primaryChain: PrimaryChain;
  chainEnv: ChainEnv;
  client: VertexClient;
}

export interface VertexClientSetLinkedSignerParams {
  signerAccount: Account | null;
  chainEnv: ChainEnv;
}
