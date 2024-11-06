import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { KnownConnectorID } from 'client/consts/knownConnectorIds';

import coinbaseIcon from 'client/modules/app/dialogs/wallet/states/connect/assets/coinbase.svg';
import walletconnectIcon from 'client/modules/app/dialogs/wallet/states/connect/assets/walletconnect.svg';
import passkeyIcon from 'client/modules/app/dialogs/wallet/states/connect/assets/passkey.svg';
import { WALLET_BUTTON_ICON_SIZE_CLASSNAME } from 'client/modules/app/dialogs/wallet/states/connect/consts';
import Image from 'next/image';
import { ReactNode } from 'react';

export interface ConnectorMetadata {
  icon: ReactNode | undefined;
  name: string;
}

/**
 * Metadata overrides by connector ID. There is unfortunately no strict typing for this: https://github.com/wevm/wagmi/discussions/3399#discussioncomment-8055819
 */
export const CUSTOM_CONNECTOR_METADATA_BY_ID: Record<
  KnownConnectorID,
  ConnectorMetadata
> = {
  injected: {
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
  coinbaseWalletSDK: {
    icon: (
      <Image
        src={coinbaseIcon}
        alt="coinbase"
        className={WALLET_BUTTON_ICON_SIZE_CLASSNAME}
      />
    ),
    name: 'Coinbase Smart Wallet',
  },
  walletConnect: {
    icon: (
      <Image
        src={walletconnectIcon}
        alt="walletconnect"
        className={WALLET_BUTTON_ICON_SIZE_CLASSNAME}
      />
    ),
    name: 'WalletConnect',
  },
  passKeys: {
    icon: (
      <Image
        src={passkeyIcon}
        alt="passkey"
        className={WALLET_BUTTON_ICON_SIZE_CLASSNAME}
      />
    ),
    name: 'Passkey',
  },
};
