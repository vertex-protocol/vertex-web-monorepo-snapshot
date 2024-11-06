import { ArrowsLeftRight } from '@phosphor-icons/react/dist/ssr/ArrowsLeftRight';
import { ArrowsSplit } from '@phosphor-icons/react/dist/ssr/ArrowsSplit';
import { BracketsAngle } from '@phosphor-icons/react/dist/ssr/BracketsAngle';
import { Lightning } from '@phosphor-icons/react/dist/ssr/Lightning';
import { IconType } from 'client/sections/Developer/data';

export type BGVariant = 'pink' | 'purple';

export interface ProductData {
  title: string;
  variant: BGVariant;
  icon: IconType;
  subTabs: {
    id: string;
    content: string;
  }[];
}

export const PRODUCT_DATA: ProductData[] = [
  {
    title: 'Trade',
    variant: 'pink',
    icon: BracketsAngle,
    subTabs: [
      {
        id: 'spot',
        content:
          'Buy and sell your favorite assets. Utilize margin to maximize returns or hedge risk.',
      },
      {
        id: 'perps',
        content:
          'Go long or short perpetual contracts. Use leverage to amplify exposure or hedge risk across positions.',
      },
    ],
  },
  {
    title: 'Universal Margin',
    variant: 'purple',
    icon: ArrowsSplit,
    subTabs: [
      {
        id: 'flexible',
        content:
          'Tap into the advantages of one universal margin account across all your assets and open positions. On Vertex, your portfolio is your margin.',
      },
      {
        id: 'efficient',
        content:
          'Utilize your margin to manage risk. Deploy unique trading strategies across spot and perp markets all in one place.',
      },
    ],
  },
  {
    title: 'Earn & Borrow',
    variant: 'pink',
    icon: ArrowsLeftRight,
    subTabs: [
      {
        id: 'earn',
        content:
          'Automatically earn yield on the collateral and assets you deposit.',
      },
      {
        id: 'borrow',
        content:
          'Borrow assets against your margin to trade spot with leverage. Withdraw borrowed assets to utilize elsewhere.',
      },
    ],
  },
  {
    title: 'Orderbook + AMM',
    variant: 'purple',
    icon: Lightning,
    subTabs: [
      {
        id: 'lightning fast',
        content:
          'Wield the power of a turbo-charged orderbook and trading engine. CEX-grade speeds with the self-custody of a DEX.',
      },
      {
        id: 'pools',
        content:
          'A hybrid design to support the best possible price execution and empower users to participate in market making while earning fees.',
      },
    ],
  },
];
