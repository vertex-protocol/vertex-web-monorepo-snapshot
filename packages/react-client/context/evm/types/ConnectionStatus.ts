import { WalletClientWithAccount } from '@vertex-protocol/client';
import { Address } from 'viem';
import { Connector } from 'wagmi';

/**
 * All possible connection states
 */
export type ConnectionStatus =
  | {
      type: 'initializing' | 'disconnected' | 'reconnecting' | 'connecting';
      address: undefined;
      walletClient: undefined;
      connector: Connector | undefined;
    }
  | {
      type: 'connected';
      address: Address;
      walletClient: WalletClientWithAccount | undefined;
      connector: Connector;
    };
