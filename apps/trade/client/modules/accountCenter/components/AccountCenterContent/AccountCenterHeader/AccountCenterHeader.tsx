import { NextImageSrc } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/react-client';
import { TextButton } from '@vertex-protocol/web-ui';
import { CHAIN_ICON_BY_CHAIN } from 'client/assets/chains/chainIcons';
import { UserStateError } from 'client/hooks/subaccount/useUserStateError';
import { ActionButtons } from 'client/modules/accountCenter/components/AccountCenterContent/AccountCenterHeader/ActionButtons';
import { WalletAddressWithActions } from 'client/modules/accountCenter/components/AccountCenterContent/AccountCenterHeader/WalletAddressWithActions';
import { AccountCenterWalletIcon } from 'client/modules/accountCenter/components/AccountCenterWalletIcon';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BrandSpecificContent } from 'client/modules/envSpecificContent/BrandSpecificContent';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import Image from 'next/image';

interface Props {
  userStateError: UserStateError | undefined;
  onShowSettingsClick: () => void;
}

export function AccountCenterHeader({
  userStateError,
  onShowSettingsClick,
}: Props) {
  const { show } = useDialog();
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
        <div>
          <WalletAddressWithActions
            isAddressPrivate={isAddressPrivate}
            connectionStatus={connectionStatus}
            setIsAddressPrivate={setIsAddressPrivate}
          />
          {/* Hiding edit profile feature on Blitz since we don't have custom Blitz avatars */}
          <BrandSpecificContent enabledBrands={['vertex']}>
            <TextButton
              className="w-fit text-xs"
              onClick={() => {
                show({ type: 'edit_user_profile', params: {} });
              }}
            >
              Edit profile
            </TextButton>
          </BrandSpecificContent>
        </div>
      </div>
      <ActionButtons onShowSettingsClick={onShowSettingsClick} />
    </div>
  );
}
