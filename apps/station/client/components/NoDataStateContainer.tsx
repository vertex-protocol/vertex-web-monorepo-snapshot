import { WithChildren } from '@vertex-protocol/web-common';

export function NoDataStateContainer({ children }: WithChildren) {
  return (
    <div className="flex items-center justify-center py-16">{children}</div>
  );
}
