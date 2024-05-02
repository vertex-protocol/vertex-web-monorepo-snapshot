import { EVMContextParams, WagmiConfigParams } from '@vertex-protocol/web-data';
import { arbitrumSepolia, mantleSepoliaTestnet } from '@wagmi/core/chains';
import { CONNECTOR_OPTIONS_METADATA } from 'client/modules/brand/consts/connectorMetadata';
import { clientEnv } from 'common/environment/clientEnv';
import {
  arbitrum,
  avalanche,
  base,
  blast,
  blastSepolia,
  bsc,
  fantom,
  hardhat,
  localhost,
  mainnet,
  mantle,
  optimism,
  polygon,
  sepolia,
} from 'wagmi/chains';

export function getEVMContextParams(): EVMContextParams {
  const connectorOptions: WagmiConfigParams['connectorOptions'] = {
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
        supportedChainEnvs: ['testnet', 'mantleTestnet'],
        supportedChains: [
          arbitrumSepolia,
          mantleSepoliaTestnet,
          sepolia,
          mainnet,
        ],
        connectorOptions,
      };
    case 'vertexMainnet':
      return {
        supportedChainEnvs: ['mainnet'],
        supportedChains: [
          arbitrum,
          mainnet,
          // Additional chains for bridging
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
    case 'blitzTestnet':
      return {
        supportedChainEnvs: ['blastTestnet'],
        supportedChains: [blastSepolia, sepolia, mainnet],
        connectorOptions,
      };
    case 'blitzMainnet':
      return {
        supportedChainEnvs: ['blastMainnet'],
        supportedChains: [blast, mainnet],
        connectorOptions,
      };
  }
}
