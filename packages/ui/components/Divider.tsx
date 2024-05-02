import { WithClassnames, mergeClassNames } from '@vertex-protocol/web-common';

interface DividerProps extends WithClassnames {
  vertical?: boolean;
}

// use min-h-[1px] & min-w-[1px] to prevent dividers from shrinking to 0px
export function Divider({ className, vertical }: DividerProps) {
  return (
    <div
      className={mergeClassNames(
        'bg-overlay-divider/10',
        vertical ? 'h-full' : 'h-px min-h-[1px]',
        vertical ? 'w-px min-w-[1px]' : 'w-full',
        className,
      )}
    />
  );
}
