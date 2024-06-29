import { NextImageSrc } from '@vertex-protocol/web-common';
import { PrimaryChainID } from '@vertex-protocol/react-client';
import { mantleSepoliaTestnet } from '@wagmi/core/chains';
import arbitrumLogo from 'client/assets/chains/arbitrum.svg';
import blastLogo from 'client/assets/chains/blast.svg';
import mantleLogo from 'client/assets/chains/mantle.svg';

import {
  arbitrum,
  arbitrumSepolia,
  blast,
  blastSepolia,
  hardhat,
  localhost,
  mantle,
} from 'wagmi/chains';

export const CHAIN_ICON_BY_CHAIN: Record<number, NextImageSrc> = {
  [localhost.id]: arbitrumLogo,
  [hardhat.id]: arbitrumLogo,
  [arbitrumSepolia.id]: arbitrumLogo,
  [arbitrum.id]: arbitrumLogo,
  [blastSepolia.id]: blastLogo,
  [blast.id]: blastLogo,
  [mantleSepoliaTestnet.id]: mantleLogo,
  [mantle.id]: mantleLogo,
} satisfies Record<PrimaryChainID, NextImageSrc>;
