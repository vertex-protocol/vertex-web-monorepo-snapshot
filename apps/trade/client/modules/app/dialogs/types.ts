import { ActionSuccessDialogParams } from 'client/modules/app/dialogs/ActionSuccessDialog';
import { ControlCenterDialogParams } from 'client/modules/controlCenter/components/ControlCenterDialog';
import { MarketDetailsDialogParams } from 'client/modules/markets/marketDetails/MarketDetailsDialog';
import { ClaimTradingRewardsDialogParams } from 'client/modules/rewards/dialogs/staking/ClaimTradingRewardsDialog/types';
import { PerpPnlSocialSharingDialogParams } from 'client/modules/socialSharing/PerpPnlSocialSharingDialog';
import { LpBalanceDetailsDialogParams } from 'client/modules/tables/detailDialogs/LpBalanceDetailsDialog';
import { LpMarketDetailsDialogParams } from 'client/modules/tables/detailDialogs/LpMarketDetailsDialog';
import { OpenEngineOrderDetailsDialogParams } from 'client/modules/tables/detailDialogs/OpenEngineOrderDetailsDialog';
import { OpenTriggerOrderDetailsDialogParams } from 'client/modules/tables/detailDialogs/OpenTriggerOrderDetailsDialog';
import { PerpPositionDetailsDialogParams } from 'client/modules/tables/detailDialogs/PerpPositionDetailsDialog';
import { PreLiquidationDetailsDialogParams } from 'client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/types';
import { RealizedPnlDetailsDialogParams } from 'client/modules/tables/detailDialogs/RealizedPnlDetailsDialog';
import { SpotBalanceDetailsDialogParams } from 'client/modules/tables/detailDialogs/SpotBalanceDetailsDialog';
import { ClosePositionDialogParams } from 'client/modules/trading/closePosition/ClosePositionDialog';
import { TpSlDialogParams } from 'client/modules/trading/tpsl/tpslDialog/TpSlDialog';
import { PerpLeverageDialogParams } from 'client/pages/PerpTrading/components/PerpLeverageDialog/PerpLeverageDialog';
import { EmptyObject } from 'type-fest';

export type DialogParams =
  | {
      type: 'location_restricted';
      params: EmptyObject;
    }
  | {
      type: 'connect';
      params: EmptyObject;
    }
  | {
      type: 'change_subaccount';
      params: EmptyObject;
    }
  | {
      type: 'edit_user_profile';
      params: EmptyObject;
    }
  | {
      type: 'control_center';
      params: ControlCenterDialogParams;
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
      params: EmptyObject;
    }
  | {
      type: 'withdraw';
      params: EmptyObject;
    }
  | {
      type: 'borrow';
      params: EmptyObject;
    }
  | {
      type: 'repay';
      params: EmptyObject;
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
      type: 'perp_leverage';
      params: PerpLeverageDialogParams;
    }
  | {
      type: 'provide_liquidity';
      params: EmptyObject;
    }
  | {
      type: 'withdraw_liquidity';
      params: EmptyObject;
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
      type: 'stake_vrtx';
      params: EmptyObject;
    }
  | {
      type: 'claim_vrtx_staking_rewards';
      params: EmptyObject;
    }
  | {
      type: 'claim_vrtx_trading_rewards';
      params: ClaimTradingRewardsDialogParams;
    }
  | {
      type: 'unstake_vrtx';
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
    };

export type DialogType = DialogParams['type'];
