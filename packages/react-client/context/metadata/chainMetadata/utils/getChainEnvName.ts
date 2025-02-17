import { ChainEnv } from '@vertex-protocol/client';
import { startCase } from 'lodash';

export function getChainEnvName(chainEnv: ChainEnv) {
  return startCase(chainEnv);
}
