import { ChainEnv } from '@vertex-protocol/client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import { CHAIN_ICON_BY_CHAIN_ENV } from './chainIcons';
import { ChainEnvType, getChainEnvType } from './utils/getChainEnvType';
import { getChainEnvName } from './utils/getChainEnvName';
import { getPrimaryChain } from '../../../utils';

export interface ChainMetadata {
  chainEnvType: ChainEnvType;
  isTestnet: boolean;
  chainIcon: NextImageSrc;
  name: string;
}

export function getChainMetadata(chainEnv: ChainEnv): ChainMetadata {
  const chainEnvType = getChainEnvType(chainEnv);
  const chain = getPrimaryChain(chainEnv);

  return {
    isTestnet: chain.testnet ?? false,
    chainEnvType,
    chainIcon: CHAIN_ICON_BY_CHAIN_ENV[chainEnv],
    name: getChainEnvName(chainEnv),
  };
}
