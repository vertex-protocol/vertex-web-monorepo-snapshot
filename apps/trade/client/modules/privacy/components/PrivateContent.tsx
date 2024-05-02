import { ComponentPropsWithoutRef } from 'react';
import { joinClassNames } from '@vertex-protocol/web-common';
import { PRIVACY_BLUR_CLASSNAME } from 'client/modules/privacy/consts';

interface Props extends ComponentPropsWithoutRef<'div'> {
  isPrivate: boolean;
}

export function PrivateContent({
  children,
  className,
  isPrivate,
  ...rest
}: Props) {
  return (
    <div
      className={joinClassNames(isPrivate && PRIVACY_BLUR_CLASSNAME, className)}
      {...rest}
    >
      {children}
    </div>
  );
}
