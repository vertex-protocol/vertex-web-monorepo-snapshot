import {
  EVMContextParams,
  WagmiConnectorOptions,
} from '@vertex-protocol/react-client';
import { CONNECTOR_OPTIONS_METADATA } from 'common/brandMetadata/connectorMetadata';
import { clientEnv } from 'common/environment/clientEnv';
import {
  arbitrum,
  arbitrumSepolia,
  avalanche,
  base,
  baseSepolia,
  blast,
  blastSepolia,
  bsc,
  fantom,
  hardhat,
  localhost,
  mainnet,
  mantle,
  mantleSepoliaTestnet,
  optimism,
  polygon,
  sei,
  seiTestnet,
  sepolia,
} from 'viem/chains';

export function getEVMContextParams(): EVMContextParams {
  const connectorOptions: WagmiConnectorOptions = {
    walletConnect: {
      projectId: clientEnv.integrations.walletConnectProjectId,
      metadata: CONNECTOR_OPTIONS_METADATA.walletConnect,
    },
    coinbase: CONNECTOR_OPTIONS_METADATA.coinbase,
  };

  // ETH Mainnet is always required for ENS name resolution
  switch (clientEnv.base.dataEnv) {
    case 'local':
      return {
        supportedChainEnvs: ['local'],
        supportedChains: [localhost, hardhat, mainnet],
        connectorOptions,
      };
    case 'vertexTestnet':
      return {
        supportedChainEnvs: [
          'arbitrumTestnet',
          'baseTestnet',
          'mantleTestnet',
          'seiTestnet',
        ],
        supportedChains: [
          arbitrumSepolia,
          baseSepolia,
          mantleSepoliaTestnet,
          seiTestnet,
          sepolia,
          mainnet,
        ],
        connectorOptions,
      };
    case 'vertexMainnet':
      return {
        supportedChainEnvs: ['arbitrum', 'base', 'mantle', 'sei'],
        supportedChains: [
          arbitrum,
          base,
          mantle,
          sei,
          mainnet,
          // Additional chains for bridging
          optimism,
          bsc,
          polygon,
          avalanche,
          fantom,
          blast,
        ],
        connectorOptions,
      };
    case 'blitzTestnet':
      return {
        supportedChainEnvs: ['blastTestnet'],
        supportedChains: [blastSepolia, sepolia, mainnet],
        connectorOptions,
      };
    case 'blitzMainnet':
      return {
        supportedChainEnvs: ['blast'],
        supportedChains: [
          blast,
          mainnet,
          // Additional chains for bridging
          arbitrum,
          optimism,
          bsc,
          polygon,
          base,
          avalanche,
          fantom,
          mantle,
        ],
        connectorOptions,
      };
  }
}
