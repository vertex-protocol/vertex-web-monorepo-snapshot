import { EthereumProviderOptions } from '@walletconnect/ethereum-provider';
import { Chain } from 'viem';
import { CoinbaseWalletParameters } from 'wagmi/connectors';

export interface WagmiConfigParams {
  supportedChains: Chain[];
  connectorOptions: {
    walletConnect: Required<
      Pick<EthereumProviderOptions, 'projectId' | 'metadata'>
    >;
    coinbase: Pick<CoinbaseWalletParameters, 'appName'>;
  };
}
