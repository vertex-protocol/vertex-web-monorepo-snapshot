'use client';

import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { PrimaryButton } from '@vertex-protocol/web-ui';
import { useButtonUserStateErrorProps } from 'client/components/ValidUserStatePrimaryButton/useButtonUserStateErrorProps';

export function AppBottomSheet({ className }: WithClassnames) {
  const buttonUserStateErrorProps = useButtonUserStateErrorProps();

  if (!buttonUserStateErrorProps) {
    return null;
  }

  return (
    <div
      className={joinClassNames(
        'fixed w-full max-w-[450px] px-6 lg:hidden',
        'bottom-4 left-1/2 -translate-x-1/2',
        className,
      )}
    >
      <div className="bg-background/50 rounded-sm p-1 backdrop-blur-xs">
        <PrimaryButton className="w-full" {...buttonUserStateErrorProps} />
      </div>
    </div>
  );
}
