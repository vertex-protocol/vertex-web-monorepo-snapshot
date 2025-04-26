import { useQueryIpBlockStatus } from '@vertex-protocol/react-client';
import { truncateAddress } from '@vertex-protocol/web-common';
import { Icons, SecondaryButton } from '@vertex-protocol/web-ui';
import { WALLET_BUTTON_ICON_SIZE_CLASSNAME, WalletButton, } from 'client/components/WalletButton';
import { useXrpContext } from 'client/context/xrp/XrpContext';

import xamanIconImg from 'client/modules/xrp/components/XrpWalletConnection/xaman-icon.svg';
import { useExecuteConnectXrpWallet } from 'client/modules/xrp/hooks/useExecuteConnectXrpWallet';
import Image from 'next/image';

/**
 * When there is no XRPL wallet connection, shows the available XRP connectors. When there is a connection,
 * shows the connected address and the option to disconnect.
 */
export function XrpWalletConnection() {
  const { data: ipBlockStatus } = useQueryIpBlockStatus();
  const { connectedConnector: connectedXrpConnector } = useXrpContext();
  const { mutate: mutateConnectXrpWallet, status: connectXrpWalletStatus } =
    useExecuteConnectXrpWallet();

  const isGeoblocked = !!ipBlockStatus;

  if (connectedXrpConnector) {
    return (
      <div className="flex items-center justify-between gap-x-2">
        <span className="text-text-tertiary">
          <Icons.Check className="text-positive inline align-middle" />{' '}
          <span className="text-text-primary">
            {truncateAddress(connectedXrpConnector.address)}
          </span>{' '}
          connected.
        </span>
        <SecondaryButton
          onClick={() => connectedXrpConnector?.disconnect()}
          size="xs"
        >
          Disconnect
        </SecondaryButton>
      </div>
    );
  }

  const xamanIcon = (
    <Image
      src={xamanIconImg}
      alt="xaman"
      className={WALLET_BUTTON_ICON_SIZE_CLASSNAME}
    />
  );

  return (
    <div className="flex flex-col gap-y-2">
      <WalletButton
        walletIcon={xamanIcon}
        walletName="Xaman"
        isLoading={connectXrpWalletStatus === 'pending'}
        isDisabled={isGeoblocked}
        onClick={() => {
          mutateConnectXrpWallet('xumm');
        }}
      />
      {/*On mobile, Xaman will open a new tab when connected. The old tab will not be in a connected state*/}
      <span className="text-text-tertiary text-left text-xs sm:hidden">
        Your wallet may redirect to a new tab after connecting. Re-open this
        dialog in the new tab to continue.
      </span>
    </div>
  );
}
