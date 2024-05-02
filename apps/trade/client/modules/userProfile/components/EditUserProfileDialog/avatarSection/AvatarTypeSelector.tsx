import { LabelTooltip } from '@vertex-protocol/web-ui';
import { WalletIcon } from 'client/components/Icons/WalletIcon';
import AvatarIcon from 'client/modules/userProfile/assets/avatar_5.png';
import {
  AvatarTypeButton,
  AvatarTypeButtonProps,
} from 'client/modules/userProfile/components/EditUserProfileDialog/avatarSection/AvatarTypeButton';
import { EnsAvatarImage } from 'client/modules/userProfile/components/EnsAvatarImage';

import {
  EnsAvatarData,
  ProfileAvatar,
  ProfileAvatarType,
  SavedUserProfile,
} from 'client/modules/userProfile/types';
import Image from 'next/image';
import { ReactNode, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<SavedUserProfile>;
  watchedAvatar: ProfileAvatar;
  address: string | undefined;
  ensAvatar: EnsAvatarData;
}

interface AvatarTypeButtonConfig {
  title: string;
  type: ProfileAvatarType;
  icon: ReactNode;
  disabled?: boolean;
  tooltipLabel?: string;
}

const ICON_SIZE = 34;

const AVATAR_TYPE_TO_VALUE: Record<ProfileAvatarType, ProfileAvatar> = {
  default: { type: 'default' },
  ens: { type: 'ens' },
  library: { type: 'library', id: 'avatar_1' },
};

export function AvatarTypeSelector({
  form,
  watchedAvatar,
  address,
  ensAvatar,
}: Props) {
  const hasEnsData = !!ensAvatar;

  const avatarTypes: AvatarTypeButtonConfig[] = useMemo(
    () => [
      {
        type: 'default',
        title: 'Default',
        icon: (
          <WalletIcon width={ICON_SIZE} height={ICON_SIZE} address={address} />
        ),
      },
      {
        type: 'ens',
        title: 'ENS Avatar',
        icon: (
          <EnsAvatarImage
            width={ICON_SIZE}
            height={ICON_SIZE}
            ensAvatar={ensAvatar}
          />
        ),
        disabled: !hasEnsData,
        tooltipLabel: hasEnsData ? undefined : 'No ENS Connected',
      },
      {
        type: 'library',
        title: 'Vertex Avatar',
        icon: (
          <Image
            src={AvatarIcon}
            height={ICON_SIZE}
            width={ICON_SIZE}
            alt="Avatar Icon"
            className="rounded-full"
            // leaving library icon unoptimized to keep quality
            unoptimized
          />
        ),
      },
    ],
    [address, ensAvatar, hasEnsData],
  );

  return (
    <div className="text-text-primary flex flex-col gap-y-3">
      <p className="text-sm">Avatar</p>
      <div className="grid grid-cols-3 gap-x-3">
        {avatarTypes.map(({ type, icon, title, disabled, tooltipLabel }) => {
          const avatarValue = AVATAR_TYPE_TO_VALUE[type];

          const commonCardProps: AvatarTypeButtonProps = {
            // Fill width of LabelTooltip
            className: tooltipLabel && 'w-full',
            icon,
            label: title,
            disabled,
            isSelected: type === watchedAvatar.type,
            onClick: () => {
              form.setValue('avatar', avatarValue);
            },
          };

          if (tooltipLabel) {
            return (
              <LabelTooltip key={type} label={tooltipLabel}>
                <AvatarTypeButton {...commonCardProps} />
              </LabelTooltip>
            );
          }

          return <AvatarTypeButton key={type} {...commonCardProps} />;
        })}
      </div>
    </div>
  );
}
