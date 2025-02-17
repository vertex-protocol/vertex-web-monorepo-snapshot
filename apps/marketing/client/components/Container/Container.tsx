import React from 'react';
import {
  joinClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';

export function Container({
  children,
  className,
}: WithChildren & WithClassnames) {
  const containerClasses = joinClassNames('container-custom w-full', className);

  return <div className={containerClasses}>{children}</div>;
}
