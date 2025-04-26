import { ChainEnv } from '@vertex-protocol/client';

export type EdgeChainEnv = 'edge';

export type ChainEnvWithEdge = ChainEnv | EdgeChainEnv;
