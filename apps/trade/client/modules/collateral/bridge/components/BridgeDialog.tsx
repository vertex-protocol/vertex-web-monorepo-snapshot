import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BridgeDismissible } from 'client/modules/collateral/bridge/components/BridgeDismissible';
import { BridgeFormContent } from 'client/modules/collateral/bridge/components/BridgeFormContent';
import { BridgePoweredBy } from 'client/modules/collateral/bridge/components/BridgePoweredBy';

export function BridgeDialog() {
  const { hide } = useDialog();

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        Cross-Chain Deposit
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        <BridgeDismissible />
        <BridgeFormContent />
        <BridgePoweredBy />
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
