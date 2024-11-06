/**
 * A centralized place to store sensitive (but not "secret") items such that we can easily delete the items
 * in this file for open sourcing.
 */

export const SENSITIVE_DATA = {
  fuulApiKey: '',
  spindlApiKey: '',
  transakApiKey: {
    prod: '',
    staging: '',
  },
  perpsAiApiKey: '',
  googleAnalyticsId: {
    vertex: '',
    blitz: '',
  },
  walletConnectProjectId: {
    vertex: '',
    blitz: '',
  },
  microsoftClarityAnalytics: {
    vertex: '',
    blitz: '',
  },
  notifiCardId: {
    arbitrumProd: '',
    mantleProd: '',
    blastProd: '',
    baseProd: '',
    arbitrumTestnet: '',
  },
  sentryDsn: '',
  theTieV1ApiKey: '',
  exodusWalletAppId: '',
  theTieV2ApiKey: '',
} as const;
