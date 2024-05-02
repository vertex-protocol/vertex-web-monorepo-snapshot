import { joinClassNames } from '@vertex-protocol/web-common';
import { Icons } from '@vertex-protocol/web-ui';
import { WALLET_BUTTON_ICON_SIZE_CLASSNAME } from 'client/modules/app/dialogs/wallet/states/connect/consts';
import Image from 'next/image';
import { ReactNode } from 'react';
import coinbaseIcon from './assets/coinbase.svg';
import walletconnectIcon from './assets/walletconnect.svg';

export interface ConnectorMetadata {
  icon: ReactNode | undefined;
  name: string;
}

/**
 * Metadata overrides by connector ID. There is unfortunately no strict typing for this: https://github.com/wevm/wagmi/discussions/3399#discussioncomment-8055819
 */
export const CUSTOM_CONNECTOR_METADATA_BY_ID: Record<
  string,
  ConnectorMetadata
> = {
  injected: {
    icon: (
      <Icons.PiWalletFill
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
    name: 'Coinbase Wallet',
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
};
