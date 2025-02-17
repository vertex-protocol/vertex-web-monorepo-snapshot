import { ChainEnv } from '@vertex-protocol/client';
import { Chain } from 'viem';
import { Connector } from 'wagmi';
import { PrimaryChain } from '../../../types';
import { ChainStatus } from './ChainStatus';
import { ConnectionStatus } from './ConnectionStatus';

export interface EVMContextData {
  supportedChainEnvs: ChainEnv[];
  // Chains that are configured with wagmi
  supportedChains: Chain[];
  primaryChainEnv: ChainEnv;
  setPrimaryChainEnv: (chainEnv: ChainEnv) => void;
  // Derived from primaryChainEnv
  primaryChain: PrimaryChain;
  chainStatus: ChainStatus;
  connectionStatus: ConnectionStatus;
  connectors: readonly Connector[];

  connect(connector: Connector): void;

  // Disconnects the wallet, should NOT be used directly - use the fn exposed from `ClearinghouseContext` instead
  disconnect(): void;

  switchConnectedChain(chainId?: number): void; // Defaults chainID to the primary chain
}
