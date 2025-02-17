import { ChainEnv } from '@vertex-protocol/client';
import {
  getPrimaryChain,
  WagmiConfigParams,
  WagmiConnectorOptions,
} from '@vertex-protocol/react-client';
import { CONNECTOR_OPTIONS_METADATA } from 'common/brandMetadata/connectorMetadata';
import { DataEnv } from 'common/environment/baseClientEnv';
import { clientEnv } from 'common/environment/clientEnv';
import {
  avalanche,
  blast,
  bsc,
  Chain,
  fantom,
  mainnet,
  optimism,
  polygon,
} from 'viem/chains';

const BRIDGE_MAINNET_CHAINS: Chain[] = [
  optimism,
  bsc,
  polygon,
  avalanche,
  fantom,
  blast,
];

const CONNECTOR_OPTIONS: WagmiConnectorOptions = {
  walletConnect: {
    projectId: clientEnv.integrations.walletConnectProjectId,
    metadata: CONNECTOR_OPTIONS_METADATA.walletConnect,
  },
  coinbase: CONNECTOR_OPTIONS_METADATA.coinbase,
};

const CHAIN_ENVS_BY_DATA_ENV: Record<DataEnv, ChainEnv[]> = {
  local: ['local'],
  vertexTestnet: [
    'arbitrumTestnet',
    'baseTestnet',
    'mantleTestnet',
    'seiTestnet',
    'sonicTestnet',
    'abstractTestnet',
  ],
  vertexMainnet: ['arbitrum', 'base', 'mantle', 'sei', 'sonic', 'abstract'],
  blitzTestnet: ['blastTestnet'],
  blitzMainnet: ['blast'],
};

export function getEVMContextParams(): WagmiConfigParams & {
  supportedChainEnvs: ChainEnv[];
} {
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
    connectorOptions: CONNECTOR_OPTIONS,
  };
}
