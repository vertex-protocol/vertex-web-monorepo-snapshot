import { ChainEnv } from '@vertex-protocol/client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import { CHAIN_ICON_BY_CHAIN_ENV } from './chainIcons';
import { getChainEnvName } from './utils/getChainEnvName';
import { ChainEnvType, getChainEnvType } from './utils/getChainEnvType';

export interface ChainEnvMetadata {
  chainEnvType: ChainEnvType;
  chainIcon: NextImageSrc;
  name: string;
}

export function getChainEnvMetadata(chainEnv: ChainEnv): ChainEnvMetadata {
  const chainEnvType = getChainEnvType(chainEnv);

  return {
    chainEnvType,
    chainIcon: CHAIN_ICON_BY_CHAIN_ENV[chainEnv],
    name: getChainEnvName(chainEnv),
  };
}
