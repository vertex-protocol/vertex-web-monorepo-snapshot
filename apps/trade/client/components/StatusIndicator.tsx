import { joinClassNames } from '@vertex-protocol/web-common';
import { SizeVariant } from '@vertex-protocol/web-ui';

interface Props {
  sizeVariant?: Extract<SizeVariant, 'sm' | 'base'>;
  colorVariant: 'warning' | 'positive' | 'primary';
}

export function StatusIndicator({ sizeVariant = 'base', colorVariant }: Props) {
  const sizeClassnames = {
    sm: { outer: 'size-2.5', middle: 'size-2', inner: 'size-1.5' },
    base: { outer: 'size-4', middle: 'size-3', inner: 'size-1.5' },
  }[sizeVariant];

  const colorClassNames = {
    warning: {
      outer: 'bg-warning/20',
      middle: 'bg-warning/20',
      inner: 'bg-warning',
    },
    positive: {
      outer: 'bg-positive/20',
      middle: 'bg-positive/20',
      inner: 'bg-positive',
    },
    primary: {
      outer: 'bg-primary/20',
      middle: 'bg-primary/20',
      inner: 'bg-primary',
    },
  }[colorVariant];

  return (
    // Flex is required here for `inset-0 m-auto` on children to work
    <span className="relative isolate flex">
      <span
        className={joinClassNames(
          'rounded-full',
          sizeClassnames.outer,
          colorClassNames.outer,
        )}
      />
      <span
        className={joinClassNames(
          'absolute inset-0 m-auto rounded-full',
          sizeClassnames.middle,
          colorClassNames.middle,
        )}
      />
      <span
        className={joinClassNames(
          'absolute inset-0 m-auto rounded-full',
          sizeClassnames.inner,
          colorClassNames.inner,
        )}
      />
    </span>
  );
}
