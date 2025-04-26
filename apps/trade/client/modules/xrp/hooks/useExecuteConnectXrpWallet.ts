import { useMutation } from '@tanstack/react-query';
import { XrpConnectorID } from 'client/context/xrp/connectors/types';
import { useXrpContext } from 'client/context/xrp/XrpContext';

/**
 * Simple wrapper hook around XrpConnector.connect() to have access to mutation status & error handling
 */
export function useExecuteConnectXrpWallet() {
  const { connectors } = useXrpContext();
  return useMutation({
    mutationFn: async (connectorId: XrpConnectorID) => {
      await connectors[connectorId].connect();
    },
  });
}
