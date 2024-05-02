import {
  ChainEnv,
  CreateVertexClientContextOpts,
} from '@vertex-protocol/client';

import sdkConfigLocal from './sdkConfig.localhost.json';

export function getVertexClientOpts(
  chainEnv: ChainEnv,
): CreateVertexClientContextOpts {
  switch (chainEnv) {
    case 'local':
      return sdkConfigLocal.clientContext;
    default:
      return chainEnv;
  }
}
