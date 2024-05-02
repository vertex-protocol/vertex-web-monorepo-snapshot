import {
  WithChildren,
  WithClassnames,
  joinClassNames,
} from '@vertex-protocol/web-common';

function Container({ children, className }: WithChildren<WithClassnames>) {
  return (
    <div className={joinClassNames('flex flex-col', 'gap-y-4 py-4', className)}>
      {children}
    </div>
  );
}

function Subheader({ children, className }: WithChildren<WithClassnames>) {
  return <div className={joinClassNames('flex', className)}>{children}</div>;
}

export const Section = {
  Container,
  Subheader,
};
