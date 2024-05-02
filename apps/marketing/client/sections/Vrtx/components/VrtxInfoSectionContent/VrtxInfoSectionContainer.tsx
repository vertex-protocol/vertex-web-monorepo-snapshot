import { WithChildren } from '@vertex-protocol/web-common';

interface Props extends WithChildren {
  title: string;
  contentClassName?: string;
}

export function VrtxInfoSectionContainer({
  title,
  contentClassName,
  children,
}: Props) {
  return (
    <div className="flex flex-col gap-y-4 text-white lg:gap-y-8">
      <h3 className="bg-headerTitleGradient bg-clip-text text-base font-bold text-transparent">
        {title}
      </h3>
      <div className={contentClassName}>{children}</div>
    </div>
  );
}
