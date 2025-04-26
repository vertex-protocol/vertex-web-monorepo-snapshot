import {
  AppManagedWalletConnector,
  KNOWN_CONNECTOR_IDS,
  useEVMContext,
} from '@vertex-protocol/react-client';
import { asyncResult } from '@vertex-protocol/utils';
import { useXrpContext } from 'client/context/xrp/XrpContext';
import { useAnalyticsContext } from 'client/modules/analytics/AnalyticsContext';
import { useNotificationManagerContext } from 'client/modules/notifications/NotificationManagerContext';
import { useExecuteCreateXrpLinkedSigner } from 'client/modules/xrp/hooks/useExecuteCreateXrpLinkedSigner';
import { xrpToEvmAddress } from 'client/modules/xrp/utils/xrplEvmAddressConversion';
import { useCallback } from 'react';

export function useConnectXrpWalletContent() {
  const { dispatchNotification } = useNotificationManagerContext();
  const { trackEvent } = useAnalyticsContext();
  const { connectedConnector: connectedXrpConnector } = useXrpContext();
  const { connect, connectors } = useEVMContext();

  const {
    mutateAsync: mutateCreateXrpLinkedSignerAsync,
    status: createXrpLinkedSignerStatus,
  } = useExecuteCreateXrpLinkedSigner();

  const createLinkedSignerAndConnectEvmWallet = useCallback(async () => {
    if (!connectedXrpConnector) {
      console.error('[useConnectWithLinkedSigner] XRP wallet not connected');
      return;
    }

    const xrpConnector = connectors.find(
      (connector) => connector.id === KNOWN_CONNECTOR_IDS.xrp,
    ) as AppManagedWalletConnector | undefined;
    if (!xrpConnector) {
      console.error('[useConnectWithLinkedSigner] XRP Connector not found');
      return;
    }

    const createLinkedSignerPromise = mutateCreateXrpLinkedSignerAsync();

    dispatchNotification({
      type: 'action_error_handler',
      data: {
        executionData: { serverExecutionResult: createLinkedSignerPromise },
        errorNotificationTitle: 'Enable 1-Click Trading Failed',
      },
    });

    const [linkedSignerPrivateKey, error] = await asyncResult(
      createLinkedSignerPromise,
    );
    if (error || !linkedSignerPrivateKey) {
      console.error(
        '[useConnectWithLinkedSigner] Error creating XRP linked signer',
        error,
      );
      return;
    }

    xrpConnector.setPrivateKey(linkedSignerPrivateKey);
    xrpConnector.setAddressOverride(
      xrpToEvmAddress(connectedXrpConnector.address),
    );
    connect(xrpConnector);

    trackEvent({
      type: 'wallet_connected',
      data: {
        walletName: xrpConnector.name,
      },
    });
  }, [
    connect,
    connectedXrpConnector,
    connectors,
    dispatchNotification,
    mutateCreateXrpLinkedSignerAsync,
    trackEvent,
  ]);

  return {
    connectedXrpConnector,
    createLinkedSignerAndConnectEvmWallet,
    createXrpLinkedSignerStatus,
  };
}
