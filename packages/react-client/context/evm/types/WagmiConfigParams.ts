import { ChainEnv } from '@vertex-protocol/client';
import { CreateConnectorFn } from 'wagmi';
import { Chain } from 'wagmi/chains';

export interface WagmiConfigParams {
  supportedChains: Chain[];
  supportedChainEnvs: ChainEnv[];
  connectors?: CreateConnectorFn[];
}
