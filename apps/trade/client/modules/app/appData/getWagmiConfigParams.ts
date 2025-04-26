import { abstractWalletConnector } from '@abstract-foundation/agw-react/connectors';
import { getWagmiConnectorV2 as getBinanceWalletConnector } from '@binance/w3w-wagmi-connector-v2';
import { ChainEnv } from '@vertex-protocol/client';
import {
  ABSTRACT_GW_CHAIN_ENVS,
  appManagedWalletConnector,
  BINANCE_WALLET_CHAIN_ENVS,
  COINBASE_SMART_WALLET_CHAIN_ENVS,
  getPrimaryChain,
  KNOWN_CONNECTOR_IDS,
  WagmiConfigParams,
} from '@vertex-protocol/react-client';
import { CONNECTOR_OPTIONS_METADATA } from 'common/brandMetadata/connectorMetadata';
import { DataEnv } from 'common/environment/baseClientEnv';
import { clientEnv } from 'common/environment/clientEnv';
import {
  avalanche,
  base,
  blast,
  bsc,
  Chain,
  fantom,
  mainnet,
  optimism,
  polygon,
} from 'viem/chains';
import { CreateConnectorFn, injected } from 'wagmi';
import { coinbaseWallet, walletConnect } from 'wagmi/connectors';

const BRIDGE_MAINNET_CHAINS: Chain[] = [
  optimism,
  bsc,
  polygon,
  avalanche,
  fantom,
  blast,
  base,
];

const CHAIN_ENVS_BY_DATA_ENV: Record<DataEnv, ChainEnv[]> = {
  local: ['local'],
  vertexTestnet: [
    'arbitrumTestnet',
    'baseTestnet',
    'mantleTestnet',
    'seiTestnet',
    'sonicTestnet',
    'abstractTestnet',
    'avaxTestnet',
  ],
  vertexMainnet: [
    'arbitrum',
    'base',
    'mantle',
    'sei',
    'sonic',
    'abstract',
    'avax',
  ],
  blitzTestnet: ['blastTestnet'],
  blitzMainnet: ['blast'],
};

function getConnectors(supportedChainEnvs: ChainEnv[]): CreateConnectorFn[] {
  const fns: CreateConnectorFn[] = [
    injected(),
    walletConnect({
      projectId: clientEnv.integrations.walletConnectProjectId,
      metadata: CONNECTOR_OPTIONS_METADATA.walletConnect,
    }),
    appManagedWalletConnector({
      id: KNOWN_CONNECTOR_IDS.customWallet,
    }),
    appManagedWalletConnector({
      id: KNOWN_CONNECTOR_IDS.xrp,
    }),
  ];

  // Some connectors only support a subset of chains. We don't want to enable them if their chain isn't supported
  const enabledOptionalConnectors = {
    coinbase: false,
    binance: false,
    abstract: false,
  };
  supportedChainEnvs.forEach((chainEnv) => {
    if (
      !enabledOptionalConnectors.coinbase &&
      COINBASE_SMART_WALLET_CHAIN_ENVS.includes(chainEnv)
    ) {
      enabledOptionalConnectors.coinbase = true;
    }
    if (
      !enabledOptionalConnectors.binance &&
      BINANCE_WALLET_CHAIN_ENVS.includes(chainEnv)
    ) {
      enabledOptionalConnectors.binance = true;
    }
    if (
      !enabledOptionalConnectors.abstract &&
      ABSTRACT_GW_CHAIN_ENVS.includes(chainEnv)
    ) {
      enabledOptionalConnectors.abstract = true;
    }
  });

  if (enabledOptionalConnectors.coinbase) {
    fns.push(
      coinbaseWallet({
        version: '4',
        ...CONNECTOR_OPTIONS_METADATA.coinbase,
      }),
    );
  }
  if (enabledOptionalConnectors.binance) {
    const binanceWallet = getBinanceWalletConnector();
    fns.push(binanceWallet());
  }
  if (enabledOptionalConnectors.abstract) {
    fns.push(abstractWalletConnector());
  }

  return fns;
}

export function getWagmiConfigParams(): WagmiConfigParams {
  const supportedChainEnvs = CHAIN_ENVS_BY_DATA_ENV[clientEnv.base.dataEnv];
  // ETH Mainnet is always required for ENS name resolution
  const supportedChains: Chain[] = [
    ...supportedChainEnvs.map(getPrimaryChain),
    mainnet,
  ];
  // Add mainnet bridging chains
  if (
    clientEnv.base.dataEnv === 'vertexMainnet' ||
    clientEnv.base.dataEnv === 'blitzMainnet'
  ) {
    supportedChains.push(...BRIDGE_MAINNET_CHAINS);
  }

  return {
    supportedChains,
    supportedChainEnvs,
    connectors: getConnectors(supportedChainEnvs),
  };
}
