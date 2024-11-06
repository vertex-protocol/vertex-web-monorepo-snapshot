import { useEVMContext } from '@vertex-protocol/react-client';
import { NextImageSrc } from '@vertex-protocol/web-common';
import { CHAIN_ICON_BY_CHAIN } from 'client/assets/chains/chainIcons';
import { UserStateError } from 'client/hooks/subaccount/useUserStateError';
import { AccountCenterSubaccountSwitcher } from 'client/modules/accountCenter/components/AccountCenterHeader/AccountCenterSubaccountSwitcher';
import { ActionButtons } from 'client/modules/accountCenter/components/AccountCenterHeader/ActionButtons';
import { WalletAddressWithActions } from 'client/modules/accountCenter/components/AccountCenterHeader/WalletAddressWithActions';
import { AccountCenterWalletIcon } from 'client/modules/accountCenter/components/AccountCenterWalletIcon';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import Image from 'next/image';

interface Props {
  userStateError: UserStateError | undefined;
}

export function AccountCenterHeader({ userStateError }: Props) {
  const { push } = useDialog();
  const { connectionStatus, chainStatus } = useEVMContext();
  const [isAddressPrivate, setIsAddressPrivate] =
    usePrivacySetting('isAddressPrivate');

  const chainIconSrc: NextImageSrc | undefined = chainStatus.connectedChain
    ? CHAIN_ICON_BY_CHAIN[chainStatus.connectedChain.id]
    : undefined;

  return (
    <div className="flex items-center justify-between gap-x-2">
      <div className="flex grow items-center gap-x-3">
        {/*User icon*/}
        <div className="relative">
          <AccountCenterWalletIcon userStateError={userStateError} size={30} />
          <div className="absolute -bottom-1 -right-1">
            {chainIconSrc && (
              <Image
                alt={chainStatus.connectedChain?.name ?? ''}
                src={chainIconSrc}
                className="h-3.5 w-auto"
              />
            )}
          </div>
        </div>
        {/*Address & edit profile*/}
        <div className="flex flex-col gap-y-1">
          <WalletAddressWithActions
            isAddressPrivate={isAddressPrivate}
            connectionStatus={connectionStatus}
            setIsAddressPrivate={setIsAddressPrivate}
          />
          <AccountCenterSubaccountSwitcher className="w-28" />
        </div>
      </div>
      <ActionButtons
        onShowSettingsClick={() => {
          push({ type: 'settings', params: {} });
        }}
      />
    </div>
  );
}
