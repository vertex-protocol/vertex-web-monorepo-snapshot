import { ChainEnv } from '@vertex-protocol/client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import abstractLogo from './chains/abstract.svg';
import arbitrumLogo from './chains/arbitrum.svg';
import baseLogo from './chains/base.svg';
import berachainLogo from './chains/berachain.svg';
import blastLogo from './chains/blast.svg';
import mantleLogo from './chains/mantle.svg';
import seiLogo from './chains/sei.svg';
import sonicLogo from './chains/sonic.svg';

export const CHAIN_ICON_BY_CHAIN_ENV: Record<ChainEnv, NextImageSrc> = {
  local: arbitrumLogo,
  arbitrum: arbitrumLogo,
  arbitrumTestnet: arbitrumLogo,
  base: baseLogo,
  baseTestnet: baseLogo,
  blast: blastLogo,
  blastTestnet: blastLogo,
  mantle: mantleLogo,
  mantleTestnet: mantleLogo,
  sei: seiLogo,
  seiTestnet: seiLogo,
  sonicTestnet: sonicLogo,
  sonic: sonicLogo,
  beraTestnet: berachainLogo,
  abstractTestnet: abstractLogo,
  abstract: abstractLogo,
};
