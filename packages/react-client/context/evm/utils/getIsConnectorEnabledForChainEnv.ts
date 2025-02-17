import { ChainEnv } from '@vertex-protocol/client';
import {
  ABSTRACT_CHAIN_ENVS,
  ARB_CHAIN_ENVS,
  BASE_CHAIN_ENVS,
  BLAST_CHAIN_ENVS,
  MANTLE_CHAIN_ENVS,
} from '../../../consts';

import { KNOWN_CONNECTOR_IDS } from '../consts';

const PASSKEYS_CHAIN_ENVS: ChainEnv[] = [
  ...ARB_CHAIN_ENVS,
  ...MANTLE_CHAIN_ENVS,
];
const COINBASE_SMART_WALLET_CHAIN_ENVS: ChainEnv[] = [
  ...ARB_CHAIN_ENVS,
  ...BASE_CHAIN_ENVS,
];
const BINANCE_WALLET_CHAIN_ENVS: ChainEnv[] = [
  ...ARB_CHAIN_ENVS,
  ...BASE_CHAIN_ENVS,
  ...MANTLE_CHAIN_ENVS,
  ...BLAST_CHAIN_ENVS,
];
const ABSTRACT_GW_CHAIN_ENVS: ChainEnv[] = [...ABSTRACT_CHAIN_ENVS];

export function getIsConnectorEnabledForChainEnv(
  connectorId: string,
  chainEnv: ChainEnv,
) {
  switch (connectorId) {
    case KNOWN_CONNECTOR_IDS.passKeys:
      return PASSKEYS_CHAIN_ENVS.includes(chainEnv);
    case KNOWN_CONNECTOR_IDS.coinbaseWalletSDK:
      return COINBASE_SMART_WALLET_CHAIN_ENVS.includes(chainEnv);
    case KNOWN_CONNECTOR_IDS.binanceApp:
      return BINANCE_WALLET_CHAIN_ENVS.includes(chainEnv);
    case KNOWN_CONNECTOR_IDS.binanceWallet:
      return BINANCE_WALLET_CHAIN_ENVS.includes(chainEnv);
    case KNOWN_CONNECTOR_IDS.abstractGw:
      return ABSTRACT_GW_CHAIN_ENVS.includes(chainEnv);
    default:
      return true;
  }
}
