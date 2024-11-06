// disabling <img> warning to allow for external images from ENS
/* eslint-disable @next/next/no-img-element */
import { EnsAvatarData } from 'client/modules/subaccounts/types';

interface Props {
  ensAvatar: EnsAvatarData;
  width: number;
  height: number;
}

export function EnsAvatarImage({ ensAvatar, width, height }: Props) {
  return (
    <div style={{ width, height }}>
      {!!ensAvatar && (
        <img
          src={ensAvatar}
          alt="ENS Icon"
          className="h-full w-full rounded-full"
        />
      )}
    </div>
  );
}
