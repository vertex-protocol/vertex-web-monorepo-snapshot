'use client';

import { mergeClassNames } from '@vertex-protocol/web-common';
import { CSSProperties, useMemo } from 'react';
import { mergeRefs } from 'react-merge-refs';
import {
  ConditionalAsChild,
  ConditionalAsChildProps,
} from '../ConditionalAsChild';
import { useScrollShadows, UseScrollShadowsParams } from './useScrollShadows';

interface Props
  extends UseScrollShadowsParams,
    Omit<ConditionalAsChildProps, 'style' | 'fallback' | 'asChild'> {
  /**
   * When `true`, the component will use Radix's `Slot` to render `children` directly.
   * When falsey, the component will wrap `children` in a `div`.
   */
  asChild?: boolean;
  /**
   * The size of the shadow in `px`. Default is 30 (defined in our TW utilities plugin).
   */
  shadowSize?: number;
  /**
   * Sometimes the `mask-image` can conflict with other styles. So this prop is useful if
   * you need to temporarily prevent the mask from being applied based on some other state.
   */
  disableMask?: boolean;
}

/**
 * Adds base scroll classes (e.g. `no-scrollbar overflow-y-auto`) and scroll shadows.
 *
 * Note, scroll shadows are added via `mask-image`, which means that the visibility
 * of nested elements will be limited to the bounding box of the root element.
 *
 * So e.g. if there is a nested tooltip that when opened overflows, the part that
 * overflows will not be visible when a shadow class is applied. For such cases the
 * nested element should be rendered in a `portal`.
 */
export function ScrollShadowsContainer({
  className,
  orientation = 'vertical',
  threshold,
  isReversed,
  shadowSize,
  disableMask,
  asChild,
  ref,
  ...rest
}: Props) {
  const { scrollShadowClassName, scrollContainerRef } = useScrollShadows({
    orientation,
    threshold,
    isReversed,
  });

  const overflowClassNames = {
    vertical: 'overflow-y-auto overflow-x-hidden',
    horizontal: 'overflow-x-auto overflow-y-hidden',
  }[orientation];

  const style = useMemo(() => {
    // Explicit check here so that the consumer can pass in `0` if needed.
    // The default is set in the CSS so we just return `undefined` to use it.
    if (shadowSize == null) {
      return undefined;
    }

    return { '--scroll-shadow-size': `${shadowSize}px` } as CSSProperties;
  }, [shadowSize]);

  return (
    <ConditionalAsChild
      className={mergeClassNames(
        'no-scrollbar',
        overflowClassNames,
        !disableMask && scrollShadowClassName,
        className,
      )}
      style={style}
      ref={mergeRefs([ref, scrollContainerRef])}
      asChild={asChild}
      fallback="div"
      {...rest}
    />
  );
}
