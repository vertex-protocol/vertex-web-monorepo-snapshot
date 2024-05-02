import { joinClassNames } from '@vertex-protocol/web-common';
import { Button } from '@vertex-protocol/web-ui';
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
                  ? 'ring-accent brightness-100 duration-0'
                  : 'ring-disabled brightness-50',
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
