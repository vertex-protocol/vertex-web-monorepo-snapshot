import { joinClassNames } from '@vertex-protocol/web-common';
import {
  Button,
  getStateOverlayClassNames,
  ScrollShadowsContainer,
} from '@vertex-protocol/web-ui';
import { LIBRARY_AVATARS } from 'client/modules/subaccounts/avatarLibraryData';
import {
  SubaccountProfile,
  VertexLibraryProfileAvatar,
} from 'client/modules/subaccounts/types';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<SubaccountProfile>;
  watchedAvatar: VertexLibraryProfileAvatar;
}

export function LibraryAvatarList({ form, watchedAvatar }: Props) {
  const disabledStateOverlayClassNames = getStateOverlayClassNames({
    borderRadiusVariant: 'full',
    // z-index needed so the overlay sits above the absolutely positioned `Image`.
    stateClassNameOverrides: 'before:z-10',
    // We only want the "disabled" state to be used, so we set this to true.
    disabled: true,
  });

  return (
    <div className="flex flex-col gap-y-3">
      <ScrollShadowsContainer
        className="flex gap-x-2 p-1"
        orientation="horizontal"
        shadowSize={20}
      >
        {LIBRARY_AVATARS.map(({ id: avatarId, src }) => {
          return (
            <Button
              key={avatarId}
              onClick={() => {
                form.setValue('avatar', {
                  type: 'library',
                  id: avatarId,
                });
              }}
              className={joinClassNames(
                // Without `shrink-0` these will shrink to fit the container on iOS.
                'relative aspect-square h-12 shrink-0 overflow-clip rounded-full border-2',
                watchedAvatar.id === avatarId
                  ? 'border-accent'
                  : ['border-disabled', disabledStateOverlayClassNames],
              )}
            >
              <Image src={src} alt={avatarId} fill sizes="48px" />
            </Button>
          );
        })}
      </ScrollShadowsContainer>
    </div>
  );
}
