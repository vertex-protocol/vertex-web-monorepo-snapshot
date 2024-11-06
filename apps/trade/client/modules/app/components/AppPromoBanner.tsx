import {
  joinClassNames,
  NextImageSrc,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { IconButton, Icons } from '@vertex-protocol/web-ui';
import { UserDisclosureKey } from 'client/modules/localstorage/userState/types/userDisclosureTypes';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';
import Image from 'next/image';

interface Props extends WithClassnames, WithChildren {
  disclosureKey: UserDisclosureKey;
  bgImageSrc?: NextImageSrc;
  bgImageClassName?: string;
}

export function AppPromoBanner({
  className,
  children,
  bgImageSrc,
  bgImageClassName,
  disclosureKey,
}: Props) {
  const { shouldShow, dismiss } = useShowUserDisclosure(disclosureKey);

  if (!shouldShow) {
    return null;
  }

  return (
    <div
      className={joinClassNames(
        'relative flex flex-col items-center justify-center gap-1 p-4 py-3 sm:flex-row sm:px-12 sm:py-5',
        'text-xs',
        className,
      )}
    >
      {children}
      {bgImageSrc && (
        <Image
          src={bgImageSrc}
          priority
          alt=""
          className={joinClassNames(
            'absolute left-0 right-0 -z-10 h-full w-full',
            bgImageClassName,
          )}
        />
      )}
      <IconButton
        icon={Icons.X}
        size="xs"
        onClick={dismiss}
        className="absolute right-4 top-4"
      />
    </div>
  );
}
