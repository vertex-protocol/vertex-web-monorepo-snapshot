import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';

function Container({ children, className }: WithChildren<WithClassnames>) {
  return (
    <div className={joinClassNames('flex flex-col gap-y-2', className)}>
      {children}
    </div>
  );
}

function Content({ children, className }: WithClassnames<WithChildren>) {
  return (
    <div
      className={joinClassNames('text-accent text-center text-xs', className)}
    >
      {children}
    </div>
  );
}

export const ButtonHelperInfo = {
  Container,
  Content,
};
