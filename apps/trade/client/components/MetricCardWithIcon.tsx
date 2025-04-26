import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { Card, IconComponent } from '@vertex-protocol/web-ui';

export function MetricCardWithIcon({
  children,
  icon,
  className,
}: WithClassnames<WithChildren<{ icon: IconComponent }>>) {
  const Icon = icon;

  return (
    <Card
      className={joinClassNames(
        'flex items-center gap-4',
        'px-3.5 py-3',
        className,
      )}
    >
      <div className="bg-surface-1 rounded p-1.5">
        <Icon size={16} />
      </div>
      <div className="flex flex-1 items-center justify-between">{children}</div>
    </Card>
  );
}
