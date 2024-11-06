import {
  mergeClassNames,
  WithChildren,
  WithClassnames,
} from '@vertex-protocol/web-common';
import { COMMON_TRANSPARENCY_COLORS } from '../../consts';

export function GradientPill({
  children,
  className,
}: WithChildren<WithClassnames>) {
  return (
    <div
      className={mergeClassNames(
        // Using `2px` less padding on the left to make the italicized text look more centered
        'text-3xs h-max px-2 py-0.5 pr-2.5',
        'border',
        COMMON_TRANSPARENCY_COLORS.borderAccent,
        'bg-surface-1 text-accent rounded font-bold italic',
        className,
      )}
    >
      {children}
    </div>
  );
}
