import { abstractWalletConnector } from '@abstract-foundation/agw-react/connectors';
import { getWagmiConnectorV2 as getBinanceWalletConnector } from '@binance/w3w-wagmi-connector-v2';
import { Chain, createClient } from 'viem';
import { Config, createConfig, CreateConnectorFn, http } from 'wagmi';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import { WagmiConfigParams } from '../types';

/**
 * Creates client required for wagmi context
 */
export function getWagmiConfig(params: WagmiConfigParams): Config {
  const binanceWallet = getBinanceWalletConnector();

  const connectorFns: CreateConnectorFn[] = params.connectorOptions
    ? [
        injected(),
        walletConnect(params.connectorOptions.walletConnect),
        coinbaseWallet({
          version: '4',
          ...params.connectorOptions.coinbase,
        }),
        binanceWallet(),
        abstractWalletConnector(),
      ]
    : [];

  return createConfig({
    chains: params.supportedChains as unknown as readonly [Chain, ...Chain[]],
    connectors: connectorFns,
    client({ chain }) {
      return createClient({ chain, transport: http() });
    },
    ssr: true,
  });
}
