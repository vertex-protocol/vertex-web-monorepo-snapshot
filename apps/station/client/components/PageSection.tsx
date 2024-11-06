import { WithChildren } from '@vertex-protocol/web-common';

interface Props extends WithChildren {
  heading: string;
}

export function PageSection({ children, heading }: Props) {
  return (
    <div className="flex flex-col gap-y-2 sm:gap-y-4">
      <h2 className="text-text-primary text-base sm:text-lg">{heading}</h2>
      {children}
    </div>
  );
}
