import { WithClassnames } from '@vertex-protocol/web-common';
import { SubaccountCountIndicatorKey } from 'client/hooks/subaccount/useSubaccountCountIndicators';
import { TabIdentifiable } from 'client/hooks/ui/tabs/types';
import { PrimitiveAtom } from 'jotai';
import React, { ReactNode } from 'react';

export interface TradingSectionProps extends WithClassnames {
  productId?: number;
}

export interface TradingTabFilterOption<T extends string> {
  id: T;
  name: string;
}

export interface TradingTabFilters<TOption extends string = string> {
  valueAtom: PrimitiveAtom<TOption>;
  options: TradingTabFilterOption<TOption>[];
}

export interface TradingTab<
  TTabID extends string = string,
  // `any` is required here for typing to match for the atom write function. Not sure why.
  TFilterOptionID extends string = any,
> extends TabIdentifiable<TTabID> {
  label: string;
  content: ReactNode;
  countIndicatorKey?: SubaccountCountIndicatorKey;
  filters?: TradingTabFilters<TFilterOptionID>;
}

export interface MarketSwitcherProps {
  triggerClassName?: string;
}

export interface TradingLayoutProps {
  productId?: number;
  desktopTradingTabs: TradingTab[];
  mobileTradingTabs: TradingTab[];
  MarketSwitcher: React.ElementType<MarketSwitcherProps>;
  InfoCards: React.ElementType<TradingSectionProps>;
  OrderPlacement: React.ElementType<WithClassnames>;
  AccountHealth: React.ElementType<WithClassnames>;
  PriceChart: React.ElementType<TradingSectionProps>;
}
