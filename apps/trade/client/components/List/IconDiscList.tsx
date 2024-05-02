import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { IconType } from '@vertex-protocol/web-ui';

function IconDiscListContainer({
  children,
  className,
}: WithChildren<WithClassnames>) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-2', className)}>
      {children}
    </div>
  );
}

interface Props extends WithChildren<WithClassnames> {
  icon: IconType;
  size?: number;
}

function IconDiscListItem({
  children,
  className,
  icon: Icon,
  size = 16,
}: Props) {
  return (
    <div className={joinClassNames('flex items-start gap-x-2', className)}>
      <div className="bg-surface-2 flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
        <Icon size={size} />
      </div>
      {/*Leaving container div for if <span> is used in children */}
      <div>{children}</div>
    </div>
  );
}

export const IconDiscList = {
  Container: IconDiscListContainer,
  Item: IconDiscListItem,
};
