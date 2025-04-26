import { useEVMContext } from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { useXummConnector } from 'client/context/xrp/connectors/xumm/useXummConnector';
import { isConnectedXrpConnector } from 'client/context/xrp/utils/isConnectedXrpConnector';
import { XrpContext, XrpContextData } from 'client/context/xrp/XrpContext';
import { useSyncedRef } from 'client/hooks/util/useSyncedRef';
import { useEffect, useMemo } from 'react';

/**
 * Context for managing XRP wallet connection and interfacing with the EVM context
 */
export function XrpContextProvider({ children }: WithChildren) {
  const xummConnector = useXummConnector();

  const connectors = useMemo((): XrpContextData['connectors'] => {
    return {
      xumm: xummConnector,
    };
  }, [xummConnector]);

  const connectedConnector = useMemo(():
    | XrpContextData['connectedConnector']
    | undefined => {
    for (const connector of Object.values(connectors)) {
      if (isConnectedXrpConnector(connector)) {
        return connector;
      }
    }
  }, [connectors]);

  // Disconnect any connected XRP wallet when the EVM wallet is disconnected
  const {
    connectionStatus: { type: evmConnectionStatusType },
  } = useEVMContext();
  // Use a ref to prevent re-running the useEffect when the connectedConnector changes
  const connectedConnectorRef = useSyncedRef(connectedConnector);
  useEffect(() => {
    if (evmConnectionStatusType === 'disconnected') {
      connectedConnectorRef.current?.disconnect();
    }
  }, [connectedConnectorRef, evmConnectionStatusType]);

  const data = useMemo((): XrpContextData => {
    return {
      connectedConnector,
      connectors,
    };
  }, [connectors, connectedConnector]);

  return <XrpContext value={data}>{children}</XrpContext>;
}
