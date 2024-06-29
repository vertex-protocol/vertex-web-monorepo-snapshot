import { WagmiConnectorOptions } from '@vertex-protocol/react-client';
import { BrandName } from '@vertex-protocol/web-ui';
import { clientEnv } from 'common/environment/clientEnv';

interface ConnectorOptionsMetadata {
  walletConnect: WagmiConnectorOptions['walletConnect']['metadata'];
  coinbase: WagmiConnectorOptions['coinbase'];
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
    },
  },
};

export const CONNECTOR_OPTIONS_METADATA =
  CONNECTOR_OPTIONS_METADATA_BY_BRAND_NAME[clientEnv.base.brandName];
