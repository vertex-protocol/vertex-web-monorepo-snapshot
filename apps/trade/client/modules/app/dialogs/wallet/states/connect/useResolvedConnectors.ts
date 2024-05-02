import {
  ConnectorMetadata,
  CUSTOM_CONNECTOR_METADATA_BY_ID,
} from 'client/modules/app/dialogs/wallet/states/connect/customConnectorMetadata';
import { get, partition, remove } from 'lodash';
import { useMemo } from 'react';
import { Connector } from 'wagmi';

/**
 * A hook to reorder connectors that are given by wagmi, and overrides metadata for known connectors when needed
 */
export function useResolvedConnectors(connectors: readonly Connector[]) {
  return useMemo(() => {
    const [injectedConnectors, otherConnectors] = partition(
      connectors,
      (connector) => {
        return connector.type === 'injected';
      },
    );
    // Extract the "generic" injected connector - we only show this if no other injected connector is present
    // We only expect 1 generic injected connector
    const genericInjectedConnectors = remove(
      injectedConnectors,
      (connector) => connector.id === 'injected',
    );
    if (injectedConnectors.length === 0) {
      injectedConnectors.push(...genericInjectedConnectors);
    }

    return [...injectedConnectors, ...otherConnectors].map((connector) => {
      const metadata: ConnectorMetadata = get(
        CUSTOM_CONNECTOR_METADATA_BY_ID,
        connector.id,
        {
          icon: connector.icon,
          name: connector.name,
        },
      );

      return {
        connector,
        metadata,
      };
    });
  }, [connectors]);
}
