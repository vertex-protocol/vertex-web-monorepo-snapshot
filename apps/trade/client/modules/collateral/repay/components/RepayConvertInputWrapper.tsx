import { WithChildren } from '@vertex-protocol/web-common';
import { ReactNode } from 'react';

export function RepayConvertInputWrapper({
  children,
  labelContent,
}: WithChildren<{ labelContent: ReactNode }>) {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="text-text-secondary text-sm">{labelContent}</div>
      <div className="flex flex-col gap-y-1.5">{children}</div>
    </div>
  );
}
