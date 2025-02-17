import { IconComponent } from '@vertex-protocol/web-ui';
import ArbitrumChain from 'client/icons/chains/ArbitrumChain';
import AvalancheChain from 'client/icons/chains/AvalancheChain';
import BaseChain from 'client/icons/chains/BaseChain';
import BlastChain from 'client/icons/chains/BlastChain';
import DydxChain from 'client/icons/chains/DydxChain';
import HyperLiquidChain from 'client/icons/chains/HyperChain';
import MantleChain from 'client/icons/chains/MantleChain';
import SeiChain from 'client/icons/chains/SeiChain';
import SonicChain from 'client/icons/chains/SonicChain';
import ARBLogo from 'client/icons/collaterals/ARBLogo';
import BTCLogo from 'client/icons/collaterals/BTCLogo';
import ETHLogo from 'client/icons/collaterals/ETHLogo';
import LINKLogo from 'client/icons/collaterals/LINKLogo';
import UNILogo from 'client/icons/collaterals/UNILogo';
import USDCLogo from 'client/icons/collaterals/USDCLogo';
import USDTLogo from 'client/icons/collaterals/USDTLogo';
import BinanceLogo from 'client/icons/logos/BinanceLogo';
import DydxLogo from 'client/icons/logos/DydxLogo';
import GmxLogo from 'client/icons/logos/GmxLogo';
import HyperLogo from 'client/icons/logos/HyperLogo';
import VertexLogo from 'client/icons/logos/VertexLogo';
import { LINKS } from 'config/links';

// Platform comparison metrics and their display labels
export const PLATFORM_COMPARISON_KEYS = {
  logo: 'Platform Logo',
  spotFees: 'Spot Trading Fees',
  perpFees: 'Perpetual Trading Fees',
  makerRebates: 'Market Maker Rebates',
  speed: 'Transaction Speed (ms)',
  markets: 'Available Markets',
  chains: 'Supported Chains',
  collaterals: 'Accepted Collaterals',
  moneyMarkets: 'Money Markets',
};

export type PlatformComparisonKey = keyof typeof PLATFORM_COMPARISON_KEYS;

interface ChainIcon {
  icon: IconComponent;
  tooltip?: string;
}

export interface PlatformStringCell {
  type: 'string';
  value: string;
  href?: string;
  tooltip?: string;
}

export interface PlatformLogoCell {
  type: 'logo';
  value: IconComponent;
}

export interface PlatformChainsCell {
  type: 'chains';
  value: ChainIcon[];
}

export interface PlatformBooleanCell {
  type: 'boolean';
  value: boolean;
}

export interface PlatformComparisonColumn {
  logo: PlatformLogoCell;
  spotFees: PlatformStringCell;
  perpFees: PlatformStringCell;
  makerRebates: PlatformStringCell;
  speed: PlatformStringCell;
  markets: PlatformStringCell;
  chains: PlatformChainsCell;
  collaterals: PlatformChainsCell;
  moneyMarkets: PlatformBooleanCell;
}

// Platform comparison data
export const PLATFORM_COMPARISON_COLUMNS: PlatformComparisonColumn[] = [
  {
    logo: {
      type: 'logo',
      value: VertexLogo,
    },
    spotFees: {
      type: 'string',
      value: 'Free / 0.02%',
    },
    perpFees: {
      type: 'string',
      value: 'Free / 0.02%',
    },
    makerRebates: {
      type: 'string',
      value: '0.005%',
      href: LINKS.docs,
      tooltip:
        'Maker rebates are determined by the total amount of VRTX staked by makers. The more VRTX staked, the higher the rebate. Click here to learn more.',
    },
    speed: {
      type: 'string',
      value: '15',
    },
    markets: {
      type: 'string',
      value: '50+',
    },
    chains: {
      type: 'chains',
      value: [
        { icon: ArbitrumChain, tooltip: 'Arbitrum' },
        { icon: SeiChain, tooltip: 'Sei' },
        { icon: MantleChain, tooltip: 'Mantle' },
        { icon: BaseChain, tooltip: 'Base' },
        { icon: BlastChain, tooltip: 'Blast' },
        { icon: SonicChain, tooltip: 'Sonic' },
      ],
    },
    collaterals: {
      type: 'chains',
      value: [
        { icon: ETHLogo, tooltip: 'wETH' },
        { icon: USDCLogo, tooltip: 'USDC' },
        { icon: ARBLogo, tooltip: 'ARB' },
        { icon: BTCLogo, tooltip: 'wBTC' },
        { icon: USDTLogo, tooltip: 'USDT' },
      ],
    },
    moneyMarkets: {
      type: 'boolean',
      value: true,
    },
  },
  {
    logo: {
      type: 'logo',
      value: DydxLogo,
    },
    spotFees: {
      type: 'string',
      value: 'No spot trading',
    },
    perpFees: {
      type: 'string',
      value: '0.01% / 0.05%',
    },
    makerRebates: {
      type: 'string',
      value: 'None',
    },
    speed: {
      type: 'string',
      value: '1006',
    },
    markets: {
      type: 'string',
      value: '140',
    },
    chains: {
      type: 'chains',
      value: [{ icon: DydxChain }],
    },
    collaterals: {
      type: 'chains',
      value: [{ icon: USDCLogo, tooltip: 'USDC' }],
    },
    moneyMarkets: {
      type: 'boolean',
      value: false,
    },
  },
  {
    logo: {
      type: 'logo',
      value: GmxLogo,
    },
    spotFees: {
      type: 'string',
      value: '0.07%',
    },
    perpFees: {
      type: 'string',
      value: '0.045% - 0.07%',
    },
    makerRebates: {
      type: 'string',
      value: 'None',
    },
    speed: {
      type: 'string',
      value: '215',
    },
    markets: {
      type: 'string',
      value: '40+',
    },
    chains: {
      type: 'chains',
      value: [
        { icon: ArbitrumChain, tooltip: 'Arbitrum' },
        { icon: AvalancheChain, tooltip: 'Avalanche' },
      ],
    },
    collaterals: {
      type: 'chains',
      value: [
        { icon: ETHLogo, tooltip: 'wETH' },
        { icon: USDCLogo, tooltip: 'USDC' },
        { icon: BTCLogo, tooltip: 'wBTC' },
        { icon: UNILogo, tooltip: 'UNI' },
        { icon: LINKLogo, tooltip: 'LINK' },
      ],
    },
    moneyMarkets: {
      type: 'boolean',
      value: false,
    },
  },
  {
    logo: {
      type: 'logo',
      value: HyperLogo,
    },
    spotFees: {
      type: 'string',
      value: 'No spot trading',
    },
    perpFees: {
      type: 'string',
      value: '0.01% / 0.035%',
    },
    makerRebates: {
      type: 'string',
      value: '0.002%',
    },
    speed: {
      type: 'string',
      value: '63',
    },
    markets: {
      type: 'string',
      value: '135',
    },
    chains: {
      type: 'chains',
      value: [{ icon: HyperLiquidChain, tooltip: 'HyperLiquid' }],
    },
    collaterals: {
      type: 'chains',
      value: [{ icon: USDCLogo, tooltip: 'USDC' }],
    },
    moneyMarkets: {
      type: 'boolean',
      value: false,
    },
  },
  {
    logo: {
      type: 'logo',
      value: BinanceLogo,
    },
    spotFees: {
      type: 'string',
      value: '0.10%',
    },
    perpFees: {
      type: 'string',
      value: '0.02% / 0.05%',
    },
    makerRebates: {
      type: 'string',
      value: '0.005%',
    },
    speed: {
      type: 'string',
      value: '5',
    },
    markets: {
      type: 'string',
      value: '350',
    },
    chains: {
      type: 'chains',
      value: [],
    },
    collaterals: {
      type: 'chains',
      value: [],
    },
    moneyMarkets: {
      type: 'boolean',
      value: false,
    },
  },
];
