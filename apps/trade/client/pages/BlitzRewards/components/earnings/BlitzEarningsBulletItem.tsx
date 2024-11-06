import { joinClassNames, WithChildren } from '@vertex-protocol/web-common';
import { IconComponent } from '@vertex-protocol/web-ui';

interface Props extends WithChildren {
  icon: IconComponent;
  iconClassName?: string;
}

export function BlitzEarningsBulletItem({
  children,
  iconClassName,
  icon: Icon,
}: Props) {
  return (
    <div className="text-text-tertiary flex items-center gap-x-2 text-xs">
      <Icon className={joinClassNames('size-5 shrink-0', iconClassName)} />
      {children}
    </div>
  );
}
