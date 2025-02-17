import { ChainEnv } from '@vertex-protocol/client';
import { SizeClass } from 'client/hooks/ui/breakpoints';
import { DialogType } from 'client/modules/app/dialogs/types';
import { SubaccountSigningPreferenceType } from 'client/modules/singleSignatureSessions/types';

export interface AnalyticsBaseEventProperties {
  sizeClass: SizeClass;
  buildId: string;
}

interface DialogOpenedEvent {
  dialogType: DialogType;
}

interface MarketEntrypointClickedEvent {
  entrypoint: 'watchlist' | 'command_center' | 'trade_dropdown' | 'nav_popover';
}

interface OneClickTradingStatusEvent {
  status: SubaccountSigningPreferenceType;
}

interface WalletConnectedEvent {
  walletName: string;
}

interface DepositSuccessEvent {
  depositAmount: number;
  depositValue: number;
  productId: number;
  chainEnv: ChainEnv;
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
      type: 'one_click_trading_status';
      data: OneClickTradingStatusEvent;
    }
  | {
      type: 'wallet_connected';
      data: WalletConnectedEvent;
    }
  | {
      type: 'deposit_success';
      data: DepositSuccessEvent;
    };
