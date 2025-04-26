import {
  KNOWN_CONNECTOR_IDS,
  KnownConnectorID,
} from '@vertex-protocol/react-client';
import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { WALLET_BUTTON_ICON_SIZE_CLASSNAME } from 'client/components/WalletButton';

import binanceIcon from 'client/modules/app/dialogs/onboarding/connect/assets/binance.svg';
import coinbaseIcon from 'client/modules/app/dialogs/onboarding/connect/assets/coinbase.svg';
import passkeyIcon from 'client/modules/app/dialogs/onboarding/connect/assets/passkey.svg';
import walletconnectIcon from 'client/modules/app/dialogs/onboarding/connect/assets/walletconnect.svg';
import Image from 'next/image';
import { ReactNode } from 'react';

export interface ConnectorMetadata {
  icon: ReactNode | undefined;
  name: string;
}

const BINANCE_CONNECTOR_METADATA: ConnectorMetadata = {
  icon: (
    <Image
      src={binanceIcon}
      alt="binance"
      className={WALLET_BUTTON_ICON_SIZE_CLASSNAME}
    />
  ),
  name: 'Binance Wallet',
};

/**
 * Metadata overrides by connector ID. There is unfortunately no strict typing for this: https://github.com/wevm/wagmi/discussions/3399#discussioncomment-8055819
 */
export const CUSTOM_CONNECTOR_METADATA_BY_ID: Partial<
  Record<KnownConnectorID, ConnectorMetadata>
> = {
  [KNOWN_CONNECTOR_IDS.injected]: {
    icon: (
      <Icons.WalletFill
        className={joinClassNames(
          WALLET_BUTTON_ICON_SIZE_CLASSNAME,
          'text-text-secondary',
        )}
      />
    ),
    name: 'Browser Extension',
  },
  [KNOWN_CONNECTOR_IDS.coinbaseWalletSDK]: {
    icon: (
      <Image
        src={coinbaseIcon}
        alt="coinbase"
        className={WALLET_BUTTON_ICON_SIZE_CLASSNAME}
      />
    ),
    name: 'Coinbase Smart Wallet',
  },
  [KNOWN_CONNECTOR_IDS.walletConnect]: {
    icon: (
      <Image
        src={walletconnectIcon}
        alt="walletconnect"
        className={WALLET_BUTTON_ICON_SIZE_CLASSNAME}
      />
    ),
    name: 'WalletConnect',
  },
  [KNOWN_CONNECTOR_IDS.passKeys]: {
    icon: (
      <Image
        src={passkeyIcon}
        alt="passkey"
        className={WALLET_BUTTON_ICON_SIZE_CLASSNAME}
      />
    ),
    name: 'Passkey',
  },
  [KNOWN_CONNECTOR_IDS.binanceWallet]: BINANCE_CONNECTOR_METADATA,
  [KNOWN_CONNECTOR_IDS.binanceApp]: BINANCE_CONNECTOR_METADATA,
};
