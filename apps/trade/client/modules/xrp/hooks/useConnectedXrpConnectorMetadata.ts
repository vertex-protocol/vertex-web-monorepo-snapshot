import { isAppManagedWalletConnector, KNOWN_CONNECTOR_IDS, useEVMContext, } from '@vertex-protocol/react-client';
import { evmToXrpAddress } from 'client/modules/xrp/utils/xrplEvmAddressConversion';
import { useMemo } from 'react';

/**
 * Retrieves a set of metadata for the currently connected XRP connector for the EVMContext
 * This is not related to the connection status of the actual XRPL wallet
 *
 * @return {ConnectorMetadata | undefined} The metadata for the connected XRP connector, or undefined if not connected
 */
export function useConnectedXrpConnectorMetadata() {
  const { connectionStatus } = useEVMContext();

  return useMemo(() => {
    const { type, connector, address } = connectionStatus;
    if (type !== 'connected') {
      return;
    }
    if (
      !isAppManagedWalletConnector(connector) ||
      connector.id !== KNOWN_CONNECTOR_IDS.xrp
    ) {
      return;
    }

    const evmAddress = address;
    const linkedSignerAccount = connector.getSigningAccount();
    return {
      evmAddress,
      rAddress: evmToXrpAddress(evmAddress),
      linkedSignerAccount,
    };
  }, [connectionStatus]);
}
