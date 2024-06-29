import { WithChildren, joinClassNames } from '@vertex-protocol/web-common';
import { SizeVariant } from '../../types';

interface ValueEndElementProps {
  sizeVariant?: SizeVariant;
}

export function ValueEndElement({
  children,
  sizeVariant = 'base',
}: WithChildren<ValueEndElementProps>) {
  const endElementSizeClassNames = {
    xs: 'text-xs',
    sm: 'text-xs',
    base: 'text-sm',
    lg: 'text-base',
  }[sizeVariant];

  return (
    <span
      className={joinClassNames(
        'text-text-tertiary leading-none',
        endElementSizeClassNames,
      )}
    >
      {children}
    </span>
  );
}
