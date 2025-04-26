import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';

export function Badge({ children }: WithChildren) {
  const badgeClass = joinClassNames(
    'flex max-h-6 max-w-fit items-center justify-center px-2 py-0.5',
    'rounded-sm border bg-light-03 border-new-website-overlay-8',
  );

  const textClass = joinClassNames(
    'text-body-gray text-body-14 bg-clip-text text-transparent',
    'animate-gradient bg-[linear-gradient(277deg,#FFF,#CD92EC,#85C5E0,#85C5E0,#CD92EC,#FFF)] bg-[length:200%_auto]',
  );

  return (
    <div className={badgeClass}>
      <span className={textClass}>{children}</span>
    </div>
  );
}
