/**
 * Known IDs of wagmi connectors
 */
export const KNOWN_CONNECTOR_IDS = {
  injected: 'injected',
  coinbaseWalletSDK: 'coinbaseWalletSDK',
  walletConnect: 'walletConnect',
  passKeys: 'network.passkeys',
  binanceWallet: 'BinanceW3WSDK',
  binanceApp: 'wallet.binance.com',
  abstractGw: 'xyz.abs.privy',
} as const;

export type KnownConnectorID =
  (typeof KNOWN_CONNECTOR_IDS)[keyof typeof KNOWN_CONNECTOR_IDS];
