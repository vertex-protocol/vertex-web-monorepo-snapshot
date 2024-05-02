import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { PerpPnlSocialSharingDialog } from 'client/modules/socialSharing/PerpPnlSocialSharingDialog';
import { ClosePositionDialog } from 'client/modules/trading/closePosition/ClosePositionDialog';
import { TpSlDialog } from 'client/modules/trading/tpsl/tpslDialog/TpSlDialog';
import { PerpLeverageDialog } from 'client/pages/PerpTrading/components/PerpLeverageDialog/PerpLeverageDialog';
import { CloseAllPositionsDialog } from 'client/modules/trading/closeAllPositions/CloseAllPositionsDialog';

export function PerpDialogs() {
  const { currentDialog } = useDialog();

  return (
    <>
      {currentDialog?.type === 'close_position' && (
        <ClosePositionDialog productId={currentDialog.params.productId} />
      )}
      {currentDialog?.type === 'perp_leverage' && (
        <PerpLeverageDialog
          initialLeverage={currentDialog.params.initialLeverage}
        />
      )}
      {currentDialog?.type === 'perp_pnl_social_sharing' && (
        <PerpPnlSocialSharingDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'tp_sl' && (
        <TpSlDialog {...currentDialog.params} />
      )}
      {currentDialog?.type === 'close_all_positions' && (
        <CloseAllPositionsDialog />
      )}
    </>
  );
}
