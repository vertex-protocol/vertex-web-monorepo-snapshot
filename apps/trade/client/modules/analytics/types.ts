import { SizeClass } from 'client/hooks/ui/breakpoints';
import { DialogType } from 'client/modules/app/dialogs/types';
import { SubaccountSigningPreferenceType } from 'client/modules/singleSignatureSessions/types';
import { EmptyObject } from 'type-fest';

export interface AnalyticsBaseEventProperties {
  sizeClass: SizeClass;
}

export interface DialogOpenedEvent {
  dialogType: DialogType;
}

export interface RepayDialogTabViewEvent {
  repayDialogTab: 'deposit' | 'convert';
}

export interface MarketEntrypointClickedEvent {
  entrypoint: 'watchlist' | 'command_center' | 'trade_dropdown' | 'nav_popover';
}

export interface ElixirEntrypointClickedEvent {
  entrypoint: 'spot' | 'perps';
}

export interface CloseAllPositionsPlacedEvent {
  numPositions: number | undefined;
}

export interface PnlSharedClickedEvent {
  sharedMethod: 'tweet' | 'download' | 'copy';
}

export interface TradePageCollateralActionClickedEvent {
  action: 'deposit' | 'withdraw';
}

export interface DepositDialogViewEvent {
  contentType: 'form' | 'help';
}

export interface WithdrawDialogViewEvent {
  contentType: 'form' | 'help';
}

export interface OneClickTradingStatusEvent {
  status: SubaccountSigningPreferenceType;
}

export type AnalyticsEvent =
  | {
      type: 'dialog_opened';
      data: DialogOpenedEvent;
    }
  | {
      type: 'repay_tab_view';
      data: RepayDialogTabViewEvent;
    }
  | {
      type: 'repay_convert_placed';
      data: EmptyObject;
    }
  | {
      type: 'market_entrypoint_clicked';
      data: MarketEntrypointClickedEvent;
    }
  | {
      type: 'elixir_entrypoint_clicked';
      data: ElixirEntrypointClickedEvent;
    }
  | {
      type: 'close_all_positions_placed';
      data: CloseAllPositionsPlacedEvent;
    }
  | {
      type: 'market_details_entrypoint_clicked';
      data: EmptyObject;
    }
  | {
      type: 'pnl_shared_clicked';
      data: PnlSharedClickedEvent;
    }
  | {
      type: 'trade_page_collateral_action_clicked';
      data: TradePageCollateralActionClickedEvent;
    }
  | {
      type: 'deposit_dialog_view';
      data: DepositDialogViewEvent;
    }
  | {
      type: 'withdraw_dialog_view';
      data: WithdrawDialogViewEvent;
    }
  | {
      type: 'one_click_trading_status';
      data: OneClickTradingStatusEvent;
    };
