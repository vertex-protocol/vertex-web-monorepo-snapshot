import type { ActionSuccessDialogParams } from 'client/modules/app/dialogs/ActionSuccessDialog';
import type { EditOrderViaChartDialogProps } from 'client/modules/app/dialogs/EditOrderViaChartDialog';
import type { DirectDepositDialogParams } from 'client/modules/collateral/deposit/components/DirectDepositDialog';
import type { FastWithdrawDialogParams } from 'client/modules/collateral/fastWithdraw/components/FastWithdrawDialog';
import type { RepayDialogParams } from 'client/modules/collateral/repay/RepayDialog';
import type { WithdrawDialogParams } from 'client/modules/collateral/withdraw/components/WithdrawDialog';
import type { ProvideLiquidityDialogParams } from 'client/modules/pools/provide/ProvideLiquidityDialog';
import type { WithdrawLiquidityDialogParams } from 'client/modules/pools/withdraw/WithdrawLiquidityDialog';
import type { ClaimTradingRewardsDialogParams } from 'client/modules/rewards/dialogs/ClaimTradingRewardsDialog/types';
import type { SkateVaultDialogParams } from 'client/modules/skateVaults/dialogs/types';
import type { PerpPnlSocialSharingDialogParams } from 'client/modules/socialSharing/PerpPnlSocialSharingDialog';
import type { EditSubaccountProfileDialogParams } from 'client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/EditSubaccountProfileDialog';
import type { SubaccountQuoteTransferDialogParams } from 'client/modules/subaccounts/components/dialogs/SubaccountQuoteTransferDialog/SubaccountQuoteTransferDialog';
import type { LpBalanceDetailsDialogParams } from 'client/modules/tables/detailDialogs/LpBalanceDetailsDialog';
import type { LpMarketDetailsDialogParams } from 'client/modules/tables/detailDialogs/LpMarketDetailsDialog';
import type { MarketDetailsDialogParams } from 'client/modules/tables/detailDialogs/MarketDetailsDialog';
import type { OpenEngineOrderDetailsDialogParams } from 'client/modules/tables/detailDialogs/OpenEngineOrderDetailsDialog';
import type { OpenTriggerOrderDetailsDialogParams } from 'client/modules/tables/detailDialogs/OpenTriggerOrderDetailsDialog';
import type { PerpPositionDetailsDialogParams } from 'client/modules/tables/detailDialogs/PerpPositionDetailsDialog';
import type { PreLiquidationDetailsDialogParams } from 'client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/types';
import type { RealizedPnlDetailsDialogParams } from 'client/modules/tables/detailDialogs/RealizedPnlDetailsDialog';
import type { SpotBalanceDetailsDialogParams } from 'client/modules/tables/detailDialogs/SpotBalanceDetailsDialog';
import type { SpotMoneyMarketDetailsDialogParams } from 'client/modules/tables/detailDialogs/SpotMoneyMarketDetailsDialog/SpotMoneyMarketDetailsDialog';
import type { ClosePositionDialogParams } from 'client/modules/trading/closePosition/ClosePositionDialog';
import type { IsolatedAdjustMarginDialogParams } from 'client/modules/trading/components/dialogs/IsolatedAdjustMarginDialog/IsolatedAdjustMarginDialog';
import type { TpSlDialogParams } from 'client/modules/trading/tpsl/tpslDialog/TpSlDialog';
import type { UtmCampaignDialogParams } from 'client/modules/utm/dialogs/UtmCampaignDialog/UtmCampaignDialog';
import type { PerpMarginModeDialogParams } from 'client/pages/PerpTrading/components/PerpMarginModeDialog/PerpMarginModeDialog';
import type { ExportHistoryDialogParams } from 'client/pages/Portfolio/subpages/History/exportHistory/types';
import type { EmptyObject } from 'type-fest';

export type DialogParams =
  | {
      type: 'location_restricted';
      params: EmptyObject;
    }
  // Connection flow is: Connect -> Terms of Use -> Key Features
  | {
      type: 'connect';
      params: EmptyObject;
    }
  | {
      type: 'connect_custom_wallet';
      params: EmptyObject;
    }
  | {
      type: 'terms_of_use';
      params: EmptyObject;
    }
  | {
      type: 'key_features';
      params: EmptyObject;
    }
  | {
      type: 'change_subaccount';
      params: EmptyObject;
    }
  | {
      type: 'edit_user_profile';
      params: EditSubaccountProfileDialogParams;
    }
  | {
      type: 'account_center';
      params: EmptyObject;
    }
  | {
      type: 'settings';
      params: EmptyObject;
    }
  | {
      type: 'signature_mode_settings';
      params: EmptyObject;
    }
  | {
      type: 'signature_mode_slow_mode_settings';
      params: EmptyObject;
    }
  | {
      type: 'single_signature_reapproval';
      params: EmptyObject;
    }
  | {
      type: 'notifi_settings';
      params: EmptyObject;
    }
  | {
      type: 'help_center';
      params: EmptyObject;
    }
  | {
      type: 'bridge';
      params: EmptyObject;
    }
  | {
      type: 'deposit';
      params: DirectDepositDialogParams;
    }
  | {
      type: 'withdraw';
      params: WithdrawDialogParams;
    }
  | {
      type: 'fast_withdraw';
      params: FastWithdrawDialogParams;
    }
  | {
      type: 'borrow';
      params: WithdrawDialogParams;
    }
  | {
      type: 'repay';
      params: RepayDialogParams;
    }
  | {
      type: 'close_position';
      params: ClosePositionDialogParams;
    }
  | {
      type: 'close_all_positions';
      params: EmptyObject;
    }
  | {
      type: 'tp_sl';
      params: TpSlDialogParams;
    }
  | {
      type: 'perp_margin_mode';
      params: PerpMarginModeDialogParams;
    }
  | {
      type: 'provide_liquidity';
      params: ProvideLiquidityDialogParams;
    }
  | {
      type: 'withdraw_liquidity';
      params: WithdrawLiquidityDialogParams;
    }
  | {
      type: 'perp_position_details';
      params: PerpPositionDetailsDialogParams;
    }
  | {
      type: 'spot_balance_details';
      params: SpotBalanceDetailsDialogParams;
    }
  | {
      type: 'spot_money_market_details';
      params: SpotMoneyMarketDetailsDialogParams;
    }
  | {
      type: 'open_engine_order_details';
      params: OpenEngineOrderDetailsDialogParams;
    }
  | {
      type: 'open_trigger_order_details';
      params: OpenTriggerOrderDetailsDialogParams;
    }
  | {
      type: 'realized_pnl_details';
      params: RealizedPnlDetailsDialogParams;
    }
  | {
      type: 'perp_pnl_social_sharing';
      params: PerpPnlSocialSharingDialogParams;
    }
  | {
      type: 'lp_balance_details';
      params: LpBalanceDetailsDialogParams;
    }
  | {
      type: 'lp_market_details';
      params: LpMarketDetailsDialogParams;
    }
  | {
      type: 'market_details';
      params: MarketDetailsDialogParams;
    }
  | {
      type: 'action_success';
      params: ActionSuccessDialogParams;
    }
  | {
      type: 'withdraw_lba_liquidity';
      params: EmptyObject;
    }
  | {
      type: 'stake_v2_vrtx';
      params: EmptyObject;
    }
  | {
      type: 'migrate_vrtx';
      params: EmptyObject;
    }
  | {
      type: 'staking_set_trading_wallet';
      params: EmptyObject;
    }
  | {
      type: 'claim_vrtx_trading_rewards';
      params: ClaimTradingRewardsDialogParams;
    }
  | {
      type: 'unstake_v1_vrtx';
      params: EmptyObject;
    }
  | {
      type: 'utm_campaign_connect';
      params: UtmCampaignDialogParams;
    }
  | {
      type: 'unstake_v2_vrtx';
      params: EmptyObject;
    }
  | {
      type: 'epoch_breakdown';
      params: EmptyObject;
    }
  | {
      type: 'transak_onramp_notice';
      params: EmptyObject;
    }
  | {
      type: 'pre_liquidation_details';
      params: PreLiquidationDetailsDialogParams;
    }
  | {
      type: 'customize_fuul_referral_link';
      params: EmptyObject;
    }
  | {
      type: 'confirm_fuul_referral';
      params: EmptyObject;
    }
  | {
      type: 'claim_fuul_referral_earnings';
      params: EmptyObject;
    }
  | {
      type: 'command_center';
      params: EmptyObject;
    }
  | {
      type: 'edit_order_via_chart';
      params: EditOrderViaChartDialogProps;
    }
  | {
      type: 'skate_vaults_deposit';
      params: SkateVaultDialogParams;
    }
  | {
      type: 'skate_vaults_withdraw';
      params: SkateVaultDialogParams;
    }
  | {
      type: 'manage_subaccounts';
      params: EmptyObject;
    }
  | {
      type: 'create_subaccount';
      params: EmptyObject;
    }
  | {
      type: 'subaccount_quote_transfer';
      params: SubaccountQuoteTransferDialogParams;
    }
  | {
      type: 'adjust_iso_margin';
      params: IsolatedAdjustMarginDialogParams;
    }
  | {
      type: 'export_history';
      params: ExportHistoryDialogParams;
    }
  | {
      type: 'provide_vlp_liquidity';
      params: EmptyObject;
    }
  | {
      type: 'redeem_vlp_liquidity';
      params: EmptyObject;
    };

export type DialogType = DialogParams['type'];

export type CollateralDialogType = Extract<
  DialogType,
  'deposit' | 'withdraw' | 'borrow' | 'repay'
>;
