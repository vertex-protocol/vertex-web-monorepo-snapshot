import AbstractChain from 'client/icons/chains/AbstractChain';
import ArbitrumChain from 'client/icons/chains/ArbitrumChain';
import BaseChain from 'client/icons/chains/BaseChain';
import BlastChain from 'client/icons/chains/BlastChain';
import MantleChain from 'client/icons/chains/MantleChain';
import SeiChain from 'client/icons/chains/SeiChain';
import SonicChain from 'client/icons/chains/SonicChain';

export const HERO_TEXTS = [
  {
    element: 'h1' as const,
    text: 'Trade Crypto with an Edge',
    className:
      'text-header-1 md:text-header-0 font-radio-grotesk mb-2 text-white',
  },
  {
    element: 'p' as const,
    text: 'Traders choose Vertex for decentralized spot and perpetual cryptocurrency trading with the fastest speeds, lowest fees, and deep liquidity.',
    className:
      'text-body-14 md:text-body-16 text-body-gray mx-auto mb-10 max-w-lg',
  },
];

export const NETWORKS = [
  {
    name: 'Arbitrum',
    icon: <ArbitrumChain size={14} />,
  },
  {
    name: 'Sei',
    icon: <SeiChain size={14} />,
  },
  {
    name: 'Mantle',
    icon: <MantleChain size={14} />,
  },
  {
    name: 'Base',
    icon: <BaseChain size={14} />,
  },
  {
    name: 'Blast',
    icon: <BlastChain size={14} />,
  },
  {
    name: 'Sonic',
    icon: <SonicChain size={14} />,
  },
  {
    name: 'Abstract',
    icon: <AbstractChain size={14} />,
  },
];
