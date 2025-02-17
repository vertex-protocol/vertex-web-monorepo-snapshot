import {
  joinClassNames,
  WithClassnames,
  WithRef,
} from '@vertex-protocol/web-common';

interface Props extends WithClassnames {
  title: string;
}

export function NavPopoverHeader({
  className,
  title,
  ...rest
}: WithRef<Props, HTMLDivElement>) {
  return (
    <div
      className={joinClassNames('text-text-tertiary px-2 text-xs', className)}
      {...rest}
    >
      {title}
    </div>
  );
}
