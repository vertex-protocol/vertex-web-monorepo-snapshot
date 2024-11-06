import { WithChildren } from '@vertex-protocol/web-common';

export function PageTitle({ children }: WithChildren) {
  return <h1 className="text-text-primary text-lg sm:text-2xl">{children}</h1>;
}
