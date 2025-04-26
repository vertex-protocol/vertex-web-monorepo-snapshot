import { EthereumProviderOptions } from '@walletconnect/ethereum-provider';
import { clientEnv } from 'common/environment/clientEnv';
import { BrandName } from 'common/environment/types';
import { CoinbaseWalletParameters } from 'wagmi/connectors';

interface ConnectorOptionsMetadata {
  walletConnect: EthereumProviderOptions['metadata'];
  coinbase: CoinbaseWalletParameters<'4'>;
}

const CONNECTOR_OPTIONS_METADATA_BY_BRAND_NAME: Record<
  BrandName,
  ConnectorOptionsMetadata
> = {
  vertex: {
    walletConnect: {
      name: 'Vertex',
      description: 'Vertex',
      url: 'https://app.vertexprotocol.com/',
      icons: ['https://app.vertexprotocol.com/vertex-icon.svg'],
    },
    coinbase: {
      appName: 'Vertex',
      // Extra padding from this icon works better with coinbase UI
      appLogoUrl: 'https://app.vertexprotocol.com/vertex-apple-touch-icon.png',
      // Injected wallet detection means that Coinbase Wallet extension will show up automatically, so we can only handle smart wallet here
      preference: 'smartWalletOnly',
    },
  },
  blitz: {
    walletConnect: {
      name: 'Blitz',
      description: 'Blitz',
      url: 'https://app.blitz.exchange/',
      icons: ['https://app.blitz.exchange/blitz-icon.svg'],
    },
    coinbase: {
      appName: 'Blitz',
      appLogoUrl: 'https://app.blitz.exchange/blitz-apple-touch-icon.png',
      // Injected wallet detection means that Coinbase Wallet extension will show up automatically, so we can only handle smart wallet here
      preference: 'smartWalletOnly',
    },
  },
};

export const CONNECTOR_OPTIONS_METADATA =
  CONNECTOR_OPTIONS_METADATA_BY_BRAND_NAME[clientEnv.base.brandName];
