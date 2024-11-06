import { KNOWN_CONNECTOR_IDS } from 'client/consts/knownConnectorIds';
import {
  ConnectorMetadata,
  CUSTOM_CONNECTOR_METADATA_BY_ID,
} from 'client/modules/app/dialogs/wallet/states/connect/customConnectorMetadata';
import { get, partition, remove } from 'lodash';
import { useMemo } from 'react';
import { Connector } from 'wagmi';
import { useEnabledFeatures } from 'client/modules/envSpecificContent/hooks/useEnabledFeatures';

interface ConnectorWithMetadata {
  connector: Connector;
  metadata: ConnectorMetadata;
}

/**
 * A hook to reorder connectors that are given by wagmi, and overrides metadata for known connectors when needed
 */
export function useResolvedConnectors(connectors: readonly Connector[]) {
  const { isExodusEnabled } = useEnabledFeatures();

  return useMemo(() => {
    // Exodus passkeys is only available on Arbitrum and Mantle
    const filteredConnectors = isExodusEnabled
      ? connectors
      : connectors.filter(
          (connector) => connector.id !== KNOWN_CONNECTOR_IDS.passKeys,
        );

    const [injectedConnectors, otherConnectors] = partition(
      filteredConnectors,
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

    let coinbaseConnector: ConnectorWithMetadata | undefined;

    const connectorsWithMetadata = [
      ...injectedConnectors,
      ...otherConnectors,
    ].map((connector): ConnectorWithMetadata => {
      const metadata: ConnectorMetadata = get(
        CUSTOM_CONNECTOR_METADATA_BY_ID,
        connector.id,
        {
          icon: connector.icon,
          name: connector.name,
        },
      );

      const connectorWithMetadata: ConnectorWithMetadata = {
        connector,
        metadata,
      };

      // Assign known connector IDs in the `map` to avoid additional loops
      if (connector.id === KNOWN_CONNECTOR_IDS.coinbaseWalletSDK) {
        coinbaseConnector = connectorWithMetadata;
      }

      return connectorWithMetadata;
    });

    return {
      connectorsWithMetadata,
      coinbaseConnector,
    };
  }, [connectors, isExodusEnabled]);
}
