import { ChainEnv } from '@vertex-protocol/client';
import {
  ABSTRACT_CHAIN_ENVS,
  SONIC_CHAIN_ENVS,
} from '@vertex-protocol/react-client';

// Chain Envs that do not have spot markets
export const NO_SPOT_CHAIN_ENVS: ChainEnv[] = [
  ...SONIC_CHAIN_ENVS,
  ...ABSTRACT_CHAIN_ENVS,
];
