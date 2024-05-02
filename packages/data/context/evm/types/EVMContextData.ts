import { ChainEnv } from '@vertex-protocol/client';
import { Provider } from 'ethers';
import { Chain } from 'viem';
import { Connector } from 'wagmi';
import { ChainMetadata } from '../../../utils';
import { ChainStatus } from './ChainStatus';
import { ConnectionStatus } from './ConnectionStatus';

export interface EVMContextData {
  // Chains that are configured with wagmi
  supportedChains: Chain[];
  primaryChainEnv: ChainEnv;
  setPrimaryChainEnv: (chainEnv: ChainEnv) => void;
  // Derived from primaryChainEnv
  primaryChain: Chain;
  primaryChainMetadata: ChainMetadata;
  primaryProvider: Provider | undefined;
  chainStatus: ChainStatus;
  connectionStatus: ConnectionStatus;
  connectors: readonly Connector[];
  // Experimental use only - allow usage of an alternate address for a read-only dashboard
  readOnlyAddressOverride: string;

  connect(connector: Connector): void;

  // Disconnects the wallet, should NOT be used directly - use the fn exposed from `ClearinghouseContext` instead
  disconnect(): void;

  switchChain(chainId?: number): void; // Defaults chainID to the primary chain

  setReadOnlyAddressOverride(address: string): void;
}
