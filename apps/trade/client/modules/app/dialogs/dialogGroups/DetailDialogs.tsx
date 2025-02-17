import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { LpBalanceDetailsDialog } from 'client/modules/tables/detailDialogs/LpBalanceDetailsDialog';
import { LpMarketDetailsDialog } from 'client/modules/tables/detailDialogs/LpMarketDetailsDialog';
import { MarketDetailsDialog } from 'client/modules/tables/detailDialogs/MarketDetailsDialog';
import { OpenEngineOrderDetailsDialog } from 'client/modules/tables/detailDialogs/OpenEngineOrderDetailsDialog';
import { OpenTriggerOrderDetailsDialog } from 'client/modules/tables/detailDialogs/OpenTriggerOrderDetailsDialog';
import { PerpPositionDetailsDialog } from 'client/modules/tables/detailDialogs/PerpPositionDetailsDialog';
import { PreLiquidationDetailsDialog } from 'client/modules/tables/detailDialogs/PreLiquidationDetailsDialog/PreLiquidationDetailsDialog';
import { RealizedPnlDetailsDialog } from 'client/modules/tables/detailDialogs/RealizedPnlDetailsDialog';
import { SpotBalanceDetailsDialog } from 'client/modules/tables/detailDialogs/SpotBalanceDetailsDialog';

/**
 * Typically shown on tablet/mobile when clicking on a table row
 */
export function DetailDialogs() {
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'perp_position_details' && (
        <PerpPositionDetailsDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'spot_balance_details' && (
        <SpotBalanceDetailsDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'open_engine_order_details' && (
        <OpenEngineOrderDetailsDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'open_trigger_order_details' && (
        <OpenTriggerOrderDetailsDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'realized_pnl_details' && (
        <RealizedPnlDetailsDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'lp_balance_details' && (
        <LpBalanceDetailsDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'lp_market_details' && (
        <LpMarketDetailsDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'market_details' && (
        <MarketDetailsDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'pre_liquidation_details' && (
        <PreLiquidationDetailsDialog {...currentDialog.params} />
      )}
    </>
  );
}
