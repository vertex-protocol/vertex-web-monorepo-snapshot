'use client';

import { WithChildren, joinClassNames } from '@vertex-protocol/web-common';
import { Button, Card, Icons } from '@vertex-protocol/web-ui';
import { useShowUserDisclosure } from 'client/modules/localstorage/userState/useShowUserDisclosure';

export function SonicPointsDismissibleBannerContainer({
  children,
}: WithChildren) {
  const { shouldShow, dismiss } = useShowUserDisclosure(
    'sonic_points_page_banner',
  );

  if (!shouldShow) return null;

  return (
    <Card
      className={joinClassNames(
        'relative flex flex-col bg-transparent',
        'group h-80 gap-y-3 overflow-hidden p-4',
        'sm:h-auto sm:px-6 sm:py-12',
      )}
    >
      {children}
      <Button
        endIcon={<Icons.X size={14} />}
        onClick={dismiss}
        className="absolute right-4 top-4"
      />
    </Card>
  );
}
