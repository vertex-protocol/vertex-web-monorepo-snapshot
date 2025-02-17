import { IconSvgProps } from 'client/icons/types';
import { LINKS } from 'config/links';
import React from 'react';

import AxelarLogo from 'client/icons/logos/AxelarLogo';
import ChainLinkLogo from 'client/icons/logos/ChainLinkLogo';
import ElixirLogo from 'client/icons/logos/ElixirLogo';
import FunLogo from 'client/icons/logos/FunLogo';
import NotifiLogo from 'client/icons/logos/NotifiLogo';
import PearLogo from 'client/icons/logos/PearLogo';
import SkateLogo from 'client/icons/logos/SkateLogo';
import StorkLogo from 'client/icons/logos/StorkLogo';
import TransakLogo from 'client/icons/logos/TransakLogo';

// Interface defining the structure of an ecosystem partner
export interface EcosystemPartner {
  name: string;
  description: string;
  logo: (props: IconSvgProps) => React.JSX.Element;
  link: string;
  ariaLabel?: string;
  comingSoon?: boolean;
}

// Array of ecosystem partners with their details
export const ECOSYSTEM_PARTNERS: EcosystemPartner[] = [
  {
    name: 'Elixir',
    description: 'Decentralized market making vaults',
    logo: ElixirLogo,
    link: LINKS.elixir,
    ariaLabel: 'Visit Elixir - Decentralized market making vaults',
  },
  {
    name: 'PEAR',
    description: 'Pairs trading built on top of Vertex',
    logo: PearLogo,
    link: LINKS.pear,
    ariaLabel: 'Visit PEAR - Pairs trading platform',
  },
  {
    name: 'Chainlink',
    description: 'Bringing VRTX cross-chain',
    logo: ChainLinkLogo,
    link: LINKS.chainlink,
    ariaLabel: 'Visit Chainlink - Price feeds for Vertex',
  },
  {
    name: 'SKATEFI',
    description: 'Provide liquidity to earn incentives',
    logo: SkateLogo,
    link: LINKS.skatefi,
    ariaLabel: 'Visit SKATEFI - Liquidity incentives platform',
  },
  {
    name: 'AXELAR',
    description: 'Deposit into Vertex from 8+ chains in 30s',
    logo: AxelarLogo,
    link: LINKS.axelar,
    ariaLabel: 'Visit AXELAR - Multi-chain deposit solution',
  },
  {
    name: 'notifi',
    description: 'Get trading notifications to your social accounts',
    logo: NotifiLogo,
    link: LINKS.notifi,
    ariaLabel: 'Visit notifi - Trading notifications service',
  },
  {
    name: 'Transak',
    description: 'On-ramp into DeFi without leaving Vertex',
    logo: TransakLogo,
    link: LINKS.transak,
    ariaLabel: 'Visit Transak - DeFi on-ramp solution',
  },
  {
    name: 'Stork',
    description: 'Low-latency data feeds for Vertex markets',
    logo: StorkLogo,
    link: LINKS.stork,
    ariaLabel: 'Visit Stork - Low-latency data feeds',
  },
] as const;

export const ECOSYSTEM_COMING_SOON_PARTNERS: EcosystemPartner[] = [
  {
    name: 'fun.xyz',
    description: 'Deposit from your CEX, Credit Card, and more',
    logo: FunLogo,
    link: LINKS.funXyz,
    ariaLabel: 'Visit fun.xyz - Multiple deposit options platform',
  },
] as const;
