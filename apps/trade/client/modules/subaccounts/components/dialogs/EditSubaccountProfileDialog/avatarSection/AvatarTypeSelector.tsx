import { LabelTooltip } from '@vertex-protocol/web-ui';
import { IdentityIcon } from 'client/components/Icons/IdentityIcon';
import { SubaccountProfile } from 'client/modules/subaccounts/types';
import AvatarIcon from 'client/modules/subaccounts/assets/avatar_5.png';
import {
  AvatarTypeButton,
  AvatarTypeButtonProps,
} from 'client/modules/subaccounts/components/dialogs/EditSubaccountProfileDialog/avatarSection/AvatarTypeButton';
import { EnsAvatarImage } from 'client/modules/subaccounts/components/EnsAvatarImage';

import {
  EnsAvatarData,
  ProfileAvatar,
  ProfileAvatarType,
} from 'client/modules/subaccounts/types';
import Image from 'next/image';
import { ReactNode, useMemo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { getSubaccountIdentityIconId } from 'client/modules/subaccounts/utils/getSubaccountIdentityIconId';
import { useEVMContext } from '@vertex-protocol/react-client';

interface Props {
  form: UseFormReturn<SubaccountProfile>;
  watchedAvatar: ProfileAvatar;
  subaccountName: string;
  ensAvatar: EnsAvatarData;
}

interface AvatarTypeButtonConfig {
  title: string;
  type: ProfileAvatarType;
  icon: ReactNode;
  disabled?: boolean;
  tooltipLabel?: string;
}

const ICON_SIZE = 24;

const AVATAR_TYPE_TO_VALUE: Record<ProfileAvatarType, ProfileAvatar> = {
  default: { type: 'default' },
  ens: { type: 'ens' },
  library: { type: 'library', id: 'avatar_1' },
};

export function AvatarTypeSelector({
  form,
  watchedAvatar,
  ensAvatar,
  subaccountName,
}: Props) {
  const {
    connectionStatus: { address },
  } = useEVMContext();

  const hasEnsData = !!ensAvatar;

  const avatarTypes: AvatarTypeButtonConfig[] = useMemo(
    () => [
      {
        type: 'default',
        title: 'Default',
        icon: (
          <IdentityIcon
            size={ICON_SIZE}
            identifier={getSubaccountIdentityIconId(address, subaccountName)}
          />
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
    [address, subaccountName, ensAvatar, hasEnsData],
  );

  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-text-tertiary text-xs">Avatar</p>
      <div className="text-text-primary grid grid-cols-3 gap-x-3">
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
              <LabelTooltip
                key={type}
                label={tooltipLabel}
                asChild
                noHelpCursor
              >
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
