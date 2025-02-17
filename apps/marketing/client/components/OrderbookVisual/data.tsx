import React from 'react';
import ArbitrumChain from 'client/icons/chains/ArbitrumChain';
import MantleChain from 'client/icons/chains/MantleChain';
import BlastChain from 'client/icons/chains/BlastChain';

export const OFFER_COMBINATIONS = [
  'Arbitrum',
  'Arbitrum + Mantle',
  'Blast + Arbitrum',
  'Sei + Arbitrum',
  'Sei + Blast',
  'Blast',
  'Blast + Arbitrum',
  'Blast + Arbitrum + Mantle',
  'Mantle',
  'Mantle + Arbitrum',
  'Base',
  'Base + Arbitrum',
  'Base + Blast',
  'Base + Sei',
  'Base + Sei + Arbitrum',
  'Base + Sei + Blast',
];

export const BID_COMBINATIONS = [
  'Mantle',
  'Arbitrum + Mantle',
  'Mantle + Blast',
  'Blast + Mantle',
  'Arbitrum + Blast',
  'Sei + Mantle',
  'Sei + Arbitrum',
  'Sei + Blast',
  'Blast + Arbitrum + Mantle',
  'Base',
  'Base + Mantle',
  'Base + Arbitrum',
  'Base + Blast',
  'Base + Sei',
  'Base + Sei + Arbitrum',
  'Base + Sei + Blast',
];

export const ANIMATION_DURATION = 5000;

export const TRADERS_DATA = [
  {
    name: 'Arbitrum',
    icon: <ArbitrumChain />,
    user: 'Michael',
  },
  {
    name: 'Mantle',
    icon: <MantleChain />,
    user: 'John',
  },
  {
    name: 'Blast',
    icon: <BlastChain />,
    user: 'Samuel',
  },
];
