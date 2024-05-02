import { NextImageSrc } from '@vertex-protocol/web-common';
import { useEVMContext } from '@vertex-protocol/web-data';
import { Icons, TextButton } from '@vertex-protocol/web-ui';
import { CHAIN_ICON_BY_CHAIN } from 'client/assets/chains/chainIcons';
import { UserStateError } from 'client/hooks/subaccount/useUserStateError';
import { useDialog } from 'client/modules/app/dialogs/hooks/useDialog';
import { BrandSpecificContent } from 'client/modules/brand/components/BrandSpecificContent';
import { ControlCenterIconButtons } from 'client/modules/controlCenter/components/ControlCenterHeader/ControlCenterIconButtons';
import { ControlCenterWalletAddress } from 'client/modules/controlCenter/components/ControlCenterHeader/ControlCenterWalletAddress';
import { ControlCenterWalletIcon } from 'client/modules/controlCenter/components/ControlCenterHeader/ControlCenterWalletIcon';
import { usePrivacySetting } from 'client/modules/privacy/hooks/usePrivacySetting';
import Image from 'next/image';

interface Props {
  userStateError: UserStateError | undefined;
  onShowSettingsClick: () => void;
}

export function ControlCenterHeader({
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
    <div className="flex flex-col gap-y-2.5">
      <div className="text-text-primary flex items-center gap-x-2 text-sm font-medium">
        <div className="flex grow items-center gap-x-3">
          <div className="relative">
            <ControlCenterWalletIcon
              userStateError={userStateError}
              walletIconSize={32}
              errorIconSize={28}
            />
            <div className="absolute -bottom-1 -right-1">
              {chainIconSrc && (
                <Image
                  alt={chainStatus.connectedChain?.name ?? 'Connected chain'}
                  src={chainIconSrc}
                  className="h-auto"
                  width={14}
                />
              )}
            </div>
          </div>
          <ControlCenterWalletAddress
            isAddressPrivate={isAddressPrivate}
            connectionStatus={connectionStatus}
          />
        </div>
        <ControlCenterIconButtons
          isAddressPrivate={isAddressPrivate}
          setIsAddressPrivate={setIsAddressPrivate}
          onShowSettingsClick={onShowSettingsClick}
        />
      </div>
      {/* Hiding edit profile feature on Blitz since we don't have custom Blitz avatars */}
      <BrandSpecificContent enabledBrands={['vertex']}>
        <TextButton
          className="w-fit text-xs"
          endIcon={<Icons.FiChevronRight size={16} />}
          onClick={() => {
            show({ type: 'edit_user_profile', params: {} });
          }}
        >
          Edit profile
        </TextButton>
      </BrandSpecificContent>
    </div>
  );
}
