import { EmptyObject } from 'type-fest';
import { TriggerCriteriaPriceType } from 'client/modules/trading/tpsl/tpslDialog/types';
import { SavedUserSettings } from 'client/modules/localstorage/userSettings/types/SavedUserSettings';

export interface AnalyticsTradePlacedEvent {
  consolePosition: 'left' | 'right';
}

export interface VrtxPageTabClickedEvent {
  vrtxPageTab: 'staking' | 'pool';
}

export interface MarketsPageTabClickedEvent {
  marketPageTab: 'perps' | 'spot' | 'money_market' | 'funding_rates';
}

export interface CollateralFaqClickedEvent {
  collateralFaq: 'deposit' | 'withdraw';
}

export interface TutorialFlowEvent {
  tutorialStatus: 'completed' | 'dismissed';
}

export interface TpslPlacedEvent {
  priceType: TriggerCriteriaPriceType;
  isTakeProfit: boolean;
}

export interface DepositClickedEvent {
  fromLocation: 'sidebar' | 'portfolio' | 'balance_table';
}

export interface CloseAllPositionsPlacedEvent {
  numOpenPositions: number;
}

export type AnalyticsEvent =
  | {
      type: 'saved_user_settings';
      data: SavedUserSettings;
    }
  | {
      type: 'user_profile_edited';
      data: EmptyObject;
    }
  | {
      type: 'nav_account_info_viewed';
      data: EmptyObject;
    }
  | {
      type: 'notifi_clicked';
      data: EmptyObject;
    }
  | {
      type: 'trade_placed';
      data: AnalyticsTradePlacedEvent;
    }
  | {
      type: 'vrtx_page_tab_clicked';
      data: VrtxPageTabClickedEvent;
    }
  | {
      type: 'markets_page_tab_clicked';
      data: MarketsPageTabClickedEvent;
    }
  | {
      type: 'collateral_faq_clicked';
      data: CollateralFaqClickedEvent;
    }
  | {
      type: 'tutorial_flow';
      data: TutorialFlowEvent;
    }
  | {
      type: 'tpsl_placed';
      data: TpslPlacedEvent;
    }
  | {
      type: 'deposit_clicked';
      data: DepositClickedEvent;
    }
  | {
      type: 'close_all_positions_placed';
      data: CloseAllPositionsPlacedEvent;
    };
