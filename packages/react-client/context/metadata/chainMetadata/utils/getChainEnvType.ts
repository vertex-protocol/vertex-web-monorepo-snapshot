import { ChainEnv } from '@vertex-protocol/client';

/**
 * The overarching "type" of the chain - regardless of whether it's testnet or mainnet
 * Ex. Arbitrum Sepolia -> Chain env type of arbitrum
 */
export type ChainEnvType =
  | 'arbitrum'
  | 'mantle'
  | 'sei'
  | 'blast'
  | 'base'
  | 'sonic'
  | 'abstract'
  | 'berachain'
  | 'avax';

export function getChainEnvType(chainEnv: ChainEnv): ChainEnvType {
  switch (chainEnv) {
    case 'local':
      return 'arbitrum';
    case 'arbitrum':
    case 'arbitrumTestnet':
      return 'arbitrum';
    case 'blast':
    case 'blastTestnet':
      return 'blast';
    case 'mantle':
    case 'mantleTestnet':
      return 'mantle';
    case 'sei':
    case 'seiTestnet':
      return 'sei';
    case 'base':
    case 'baseTestnet':
      return 'base';
    case 'sonic':
    case 'sonicTestnet':
      return 'sonic';
    case 'abstract':
    case 'abstractTestnet':
      return 'abstract';
    case 'bera':
    case 'beraTestnet':
      return 'berachain';
    case 'avax':
    case 'avaxTestnet':
      return 'avax';
  }
}
