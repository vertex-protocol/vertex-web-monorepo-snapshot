import {
  useEVMContext,
  useQueryIpBlockStatus,
} from '@vertex-protocol/react-client';
import { WarningPanel } from 'client/components/WarningPanel';
import { useRepeatedClickCountHandler } from 'client/hooks/ui/useRepeatedClickCountHandler';
import { BaseAppDialog } from 'client/modules/app/dialogs/BaseAppDialog';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { ConnectEvmWalletContent } from 'client/modules/app/dialogs/onboarding/connect/evm/ConnectEvmWalletContent';
import { useEffect } from 'react';

export function ConnectWalletDialog() {
  const { push, hide } = useDialog();
  const { connectionStatus } = useEVMContext();
  const { data: ipBlockStatus } = useQueryIpBlockStatus();

  const isGeoblocked = !!ipBlockStatus;

  // Close the dialog when connected. Ideally, `connect` takes some `onSuccess` callback that will then call `hide`
  // However, this does not guarantee that connections established through a browser extension will have the same behavior
  const isConnected = connectionStatus.type === 'connected';
  useEffect(() => {
    if (isConnected) {
      hide();
    }
  }, [hide, isConnected]);

  const geoblockWarningPanel = isGeoblocked ? (
    <WarningPanel title="Restricted Territory">
      It appears that you are accessing from a Restricted Territory. At this
      time, we are not able to support users at your location.
    </WarningPanel>
  ) : null;

  const handleTitleClick = useRepeatedClickCountHandler({
    handler: (count) => {
      if (count === 3) {
        push({ type: 'connect_custom_wallet', params: {} });
      }
    },
  });

  return (
    <BaseAppDialog.Container onClose={hide}>
      <BaseAppDialog.Title onClose={hide}>
        <span onClick={handleTitleClick}>Connect Wallet</span>
      </BaseAppDialog.Title>
      <BaseAppDialog.Body>
        {geoblockWarningPanel}
        <ConnectEvmWalletContent isGeoblocked={isGeoblocked} />
      </BaseAppDialog.Body>
    </BaseAppDialog.Container>
  );
}
