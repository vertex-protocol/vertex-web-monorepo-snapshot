import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';

export function GradientPill({
  children,
  className,
}: WithChildren<WithClassnames>) {
  return (
    // Apply a slightly larger border radius here to make the rounding look consistent with that of the inner div
    <div className="bg-overlay-accent/20 rounded-[5px] p-px">
      <div
        className={mergeClassNames(
          // Using `2px` less padding on the left to make the italicized text look more centered
          'text-3xs py-0.5 pl-1 pr-1.5',
          'bg-surface-1 text-accent rounded font-bold italic',
          className,
        )}
      >
        {children}
      </div>
    </div>
  );
}
