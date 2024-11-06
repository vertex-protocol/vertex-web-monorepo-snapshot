import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { forwardRef } from 'react';

interface Props extends WithClassnames {
  title: string;
}

export const NavPopoverHeader = forwardRef<HTMLDivElement, Props>(
  function NavPopoverHeader({ title, className, ...rest }, ref) {
    return (
      <div
        className={joinClassNames('text-text-tertiary px-2 text-xs', className)}
        {...rest}
        ref={ref}
      >
        {title}
      </div>
    );
  },
);
