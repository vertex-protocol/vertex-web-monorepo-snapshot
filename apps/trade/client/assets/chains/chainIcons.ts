import { NextImageSrc } from '@vertex-protocol/web-common';
import { PrimaryChainID } from '@vertex-protocol/react-client';
import arbitrumLogo from 'client/assets/chains/arbitrum.svg';
import baseLogo from 'client/assets/chains/base.svg';
import blastLogo from 'client/assets/chains/blast.svg';
import mantleLogo from 'client/assets/chains/mantle.svg';
import seiLogo from 'client/assets/chains/sei.svg';

import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  blast,
  blastSepolia,
  hardhat,
  localhost,
  mantle,
  mantleSepoliaTestnet,
  sei,
  seiTestnet,
} from 'viem/chains';

export const CHAIN_ICON_BY_CHAIN: Record<number, NextImageSrc> = {
  [localhost.id]: arbitrumLogo,
  [hardhat.id]: arbitrumLogo,
  [arbitrumSepolia.id]: arbitrumLogo,
  [arbitrum.id]: arbitrumLogo,
  [base.id]: baseLogo,
  [baseSepolia.id]: baseLogo,
  [blastSepolia.id]: blastLogo,
  [blast.id]: blastLogo,
  [mantleSepoliaTestnet.id]: mantleLogo,
  [mantle.id]: mantleLogo,
  [sei.id]: seiLogo,
  [seiTestnet.id]: seiLogo,
} satisfies Record<PrimaryChainID, NextImageSrc>;
