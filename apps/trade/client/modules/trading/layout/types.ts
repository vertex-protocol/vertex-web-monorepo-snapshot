import { WithClassnames } from '@vertex-protocol/web-common';
import { SubaccountCountIndicatorKey } from 'client/hooks/subaccount/useSubaccountCountIndicators';
import { TabIdentifiable } from 'client/hooks/ui/tabs/types';
import { SelectedFilterByTradingTableTab } from 'client/modules/localstorage/userSettings/types/tradingSettings';
import React, { ReactNode } from 'react';

export interface TradingSectionProps extends WithClassnames {
  productId: number | undefined;
}

export interface TradingTabFilterOption<T extends string> {
  id: T;
  name: string;
}

export interface TradingTabFilters<TOption extends string = string> {
  tradingTableTab: keyof SelectedFilterByTradingTableTab;
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
  productId: number | undefined;
  desktopTradingTabs: TradingTab[];
  mobileTradingTabs: TradingTab[];
  MarketSwitcher: React.ElementType<MarketSwitcherProps>;
  InfoCards: React.ElementType<WithClassnames>;
  OrderPlacement: React.ElementType<WithClassnames>;
  ChartComponent: React.ElementType<TradingSectionProps>;
}
