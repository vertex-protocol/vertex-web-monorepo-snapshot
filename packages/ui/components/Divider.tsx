import {
  WithClassnames,
  hasClass,
  mergeClassNames,
} from '@vertex-protocol/web-common';

interface DividerProps extends WithClassnames {
  vertical?: boolean;
}

// use min-h-[1px] & min-w-[1px] to prevent dividers from shrinking to 0px
export function Divider({ className, vertical }: DividerProps) {
  const heightClassNames = (() => {
    if (vertical) {
      return !hasClass(className, 'h-') ? 'self-stretch h-auto' : '';
    }
    return 'h-px min-h-[1px]';
  })();

  return (
    <div
      className={mergeClassNames(
        'bg-overlay-divider',
        vertical ? 'w-px min-w-[1px]' : 'w-full',
        heightClassNames,
        className,
      )}
    />
  );
}
