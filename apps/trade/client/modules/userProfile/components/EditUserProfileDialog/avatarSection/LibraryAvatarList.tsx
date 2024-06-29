import { joinClassNames } from '@vertex-protocol/web-common';
import { Button, getStateOverlayClassNames } from '@vertex-protocol/web-ui';
import { LIBRARY_AVATARS } from 'client/modules/userProfile/avatarLibraryData';
import {
  SavedUserProfile,
  VertexLibraryProfileAvatar,
} from 'client/modules/userProfile/types';
import Image from 'next/image';
import { UseFormReturn } from 'react-hook-form';

interface Props {
  form: UseFormReturn<SavedUserProfile>;
  watchedAvatar: VertexLibraryProfileAvatar;
}

export function LibraryAvatarList({ form, watchedAvatar }: Props) {
  const disabledStateOverlayClassNames = getStateOverlayClassNames({
    stateClassNameOverrides: 'before:rounded-full',
    // We only want the "disabled" state to be used, so we set this to true.
    disabled: true,
  });

  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-text-primary text-sm">Library Avatars</p>
      <div className="grid grid-cols-6 gap-3">
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
                'relative aspect-square h-12 overflow-clip rounded-full ring-2',
                watchedAvatar.id === avatarId
                  ? 'ring-accent'
                  : ['ring-disabled', disabledStateOverlayClassNames],
              )}
            >
              <Image src={src} alt={avatarId} fill sizes="48px" />
            </Button>
          );
        })}
      </div>
    </div>
  );
}
