/**
 * Known IDs of wagmi connectors
 */
export const KNOWN_CONNECTOR_IDS = {
  injected: 'injected',
  coinbaseWalletSDK: 'coinbaseWalletSDK',
  walletConnect: 'walletConnect',
  passKeys: 'network.passkeys',
} as const;

export type KnownConnectorID = keyof typeof KNOWN_CONNECTOR_IDS;
