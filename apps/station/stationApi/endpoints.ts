import { ChainEnv } from '@vertex-protocol/client';

export const STATION_ENDPOINTS: Record<ChainEnv, string> = {
  arbitrum: 'https://station.prod.vertexprotocol.com/v1',
  arbitrumTestnet: 'https://station.sepolia-test.vertexprotocol.com/v1',
  base: 'https://station.base-prod.vertexprotocol.com/v1',
  baseTestnet: 'https://station.base-test.vertexprotocol.com/v1',
  blast: 'https://station.blast-prod.vertexprotocol.com/v1',
  blastTestnet: 'https://station.blast-test.vertexprotocol.com/v1',
  local: '',
  mantle: 'https://station.mantle-prod.vertexprotocol.com/v1',
  mantleTestnet: 'https://station.mantle-test.vertexprotocol.com/v1',
  sei: 'https://station.sei-prod.vertexprotocol.com/v1',
  seiTestnet: 'https://station.sei-test.vertexprotocol.com/v1',
};
