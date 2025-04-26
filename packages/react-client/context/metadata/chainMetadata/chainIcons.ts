import { ChainEnv } from '@vertex-protocol/client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import abstractLogo from './chains/abstract.svg';
import arbitrumLogo from './chains/arbitrum.svg';
import avaxLogo from './chains/avax.svg';
import baseLogo from './chains/base.svg';
import berachainLogo from './chains/berachain.svg';
import blastLogo from './chains/blast.svg';
import mantleLogo from './chains/mantle.svg';
import seiLogo from './chains/sei.svg';
import sonicLogo from './chains/sonic.svg';

export const CHAIN_ICON_BY_CHAIN_ENV: Record<ChainEnv, NextImageSrc> = {
  abstract: abstractLogo,
  abstractTestnet: abstractLogo,
  arbitrum: arbitrumLogo,
  arbitrumTestnet: arbitrumLogo,
  avax: avaxLogo,
  avaxTestnet: avaxLogo,
  base: baseLogo,
  baseTestnet: baseLogo,
  bera: berachainLogo,
  beraTestnet: berachainLogo,
  blast: blastLogo,
  blastTestnet: blastLogo,
  local: arbitrumLogo,
  mantle: mantleLogo,
  mantleTestnet: mantleLogo,
  sei: seiLogo,
  seiTestnet: seiLogo,
  sonic: sonicLogo,
  sonicTestnet: sonicLogo,
};
