import { forwardRef, CSSProperties, useMemo } from 'react';
import { mergeClassNames } from '@vertex-protocol/web-common';
import { UseScrollShadowsParams, useScrollShadows } from '../hooks';
import {
  ConditionalAsChild,
  ConditionalAsChildProps,
} from './ConditionalAsChild';
import { mergeRefs } from 'react-merge-refs';

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
export const ScrollShadowsContainer = forwardRef<HTMLElement, Props>(
  function ScrollShadowsContainer(
    {
      children,
      className,
      orientation = 'vertical',
      threshold,
      isReversed,
      shadowSize,
      disableMask,
      asChild,
      ...rest
    },
    ref,
  ) {
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
      >
        {children}
      </ConditionalAsChild>
    );
  },
);
