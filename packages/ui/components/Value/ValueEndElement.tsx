import { WithChildren } from '@vertex-protocol/web-common';
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

  // Line-height has no effect on inline elements such as `span`, so we wrap children in a `div` here for consistency
  // https://stackoverflow.com/questions/20103076/why-line-height-is-ignored-in-a-span-tag-and-works-in-div-tag
  return <div className={endElementSizeClassNames}>{children}</div>;
}
