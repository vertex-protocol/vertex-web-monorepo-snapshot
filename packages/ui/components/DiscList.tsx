import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';

function DiscListContainer({
  children,
  className,
}: WithChildren<WithClassnames>) {
  return (
    <ul
      className={joinClassNames(
        'flex list-outside list-disc flex-col gap-y-1 pl-4',
        className,
      )}
    >
      {children}
    </ul>
  );
}

function DiscListItem({ children, className }: WithChildren<WithClassnames>) {
  return <li className={className}>{children}</li>;
}

export const DiscList = {
  Container: DiscListContainer,
  Item: DiscListItem,
};
