import { ChainEnv } from '@vertex-protocol/client';
import { SizeClass } from 'client/hooks/ui/breakpoints';
import { DialogType } from 'client/modules/app/dialogs/types';
import { SubaccountSigningPreferenceType } from 'client/modules/singleSignatureSessions/types';
import { EmptyObject } from 'type-fest';

export interface AnalyticsBaseEventProperties {
  sizeClass: SizeClass;
  buildId: string;
}

export interface DialogOpenedEvent {
  dialogType: DialogType;
}

export interface MarketEntrypointClickedEvent {
  entrypoint:
    | 'watchlist'
    | 'command_center'
    | 'trade_dropdown'
    | 'nav_popover'
    | 'sentiment';
}

export interface VaultDialogDepositPlacedEvent {
  vaultAddress: string;
}

export interface VaultDialogWithdrawPlacedEvent {
  vaultAddress: string;
}

export interface OneClickTradingStatusEvent {
  status: SubaccountSigningPreferenceType;
}

export interface OverviewTabsClickedEvent {
  overviewTab: string;
}

export interface BalancesTabsClickedEvent {
  balancesTab: string;
}

export interface PositionsTabsClickedEvent {
  positionsTab: string;
}

export interface BalancesHistoryLinkClickedEvent {
  linkType: 'deposit' | 'withdrawals';
}

export interface PortfolioNavItemsClickedEvent {
  portfolioNavItems: string;
}

export interface OverviewCollateralButtonsClickedEvent {
  buttonType: 'deposit' | 'withdraw';
}

export interface HistoryTabsClickedEvent {
  historyTab: string;
}

export interface NewsfeedClickedEvent {
  clickType: 'headline' | 'link';
}

export interface SubaccountCountEvent {
  numSubaccount: number;
  chainEnv: ChainEnv;
}

export interface WalletDisplayNameShownEvent {
  displayNameType: 'none' | 'ens' | 'clusters';
  length?: number;
}

export interface WalletConnectedEvent {
  walletName: string;
}

export interface TpSLOrderSubmitEvent {
  location: 'perp_order_form' | 'tpsl_dialog';
  type: 'take_profit' | 'stop_loss';
}

export type AnalyticsEvent =
  | {
      type: 'dialog_opened';
      data: DialogOpenedEvent;
    }
  | {
      type: 'market_entrypoint_clicked';
      data: MarketEntrypointClickedEvent;
    }
  | {
      type: 'stake_vrtx';
      data: EmptyObject;
    }
  | {
      type: 'unstake_vrtx';
      data: EmptyObject;
    }
  | {
      type: 'one_click_trading_status';
      data: OneClickTradingStatusEvent;
    }
  | {
      type: 'vault_dialog_deposit_placed';
      data: VaultDialogDepositPlacedEvent;
    }
  | {
      type: 'vault_dialog_withdraw_placed';
      data: VaultDialogWithdrawPlacedEvent;
    }
  | {
      type: 'overview_tabs_clicked';
      data: OverviewTabsClickedEvent;
    }
  | {
      type: 'balances_tabs_clicked';
      data: BalancesTabsClickedEvent;
    }
  | {
      type: 'positions_tabs_clicked';
      data: PositionsTabsClickedEvent;
    }
  | {
      type: 'privacy_clicked';
      data: EmptyObject;
    }
  | {
      type: 'balances_history_link_clicked';
      data: BalancesHistoryLinkClickedEvent;
    }
  | {
      type: 'portfolio_nav_item_clicked';
      data: PortfolioNavItemsClickedEvent;
    }
  | {
      type: 'edit_profile_clicked';
      data: EmptyObject;
    }
  | {
      type: 'overview_collateral_buttons_clicked';
      data: OverviewCollateralButtonsClickedEvent;
    }
  | {
      type: 'history_tabs_clicked';
      data: HistoryTabsClickedEvent;
    }
  | {
      type: 'newsfeed_clicked';
      data: NewsfeedClickedEvent;
    }
  | {
      type: 'subaccount_count';
      data: SubaccountCountEvent;
    }
  | {
      type: 'wallet_display_name_shown';
      data: WalletDisplayNameShownEvent;
    }
  | {
      type: 'wallet_connected';
      data: WalletConnectedEvent;
    }
  | {
      type: 'tpsl_order_submit';
      data: TpSLOrderSubmitEvent;
    };
