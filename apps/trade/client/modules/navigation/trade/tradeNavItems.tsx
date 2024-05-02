import { ProductEngineType } from '@vertex-protocol/client';
import { ROUTES } from 'client/modules/app/consts/routes';

interface TradeNavItem {
  title: string;
  description: string;
  href: string;
  marketType: ProductEngineType;
}

// Shared between mobile and desktop trade nav items. Mobile is a Collapsible whereas Desktop is a Popover component.
export const TRADE_NAV_ITEMS: TradeNavItem[] = [
  {
    title: 'Perps',
    description: 'Trade perp contracts',
    href: ROUTES.perpTrading,
    marketType: ProductEngineType.PERP,
  },
  {
    title: 'Spot',
    description: 'Buy and sell tokens',
    href: ROUTES.spotTrading,
    marketType: ProductEngineType.SPOT,
  },
];
