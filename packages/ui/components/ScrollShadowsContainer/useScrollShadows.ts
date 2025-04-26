import { useScroll, useSize } from 'ahooks';
import { useMemo, useRef } from 'react';

type ScrollOrientation = 'vertical' | 'horizontal';

type ShadowPosition = 'start' | 'end' | 'both';

type ScrollShadowClassName =
  | 'scroll-shadow-t'
  | 'scroll-shadow-b'
  | 'scroll-shadow-y'
  | 'scroll-shadow-l'
  | 'scroll-shadow-r'
  | 'scroll-shadow-x';

const SCROLL_CLASSNAMES_BY_ORIENTATION: Record<
  ScrollOrientation,
  Record<ShadowPosition, ScrollShadowClassName>
> = {
  vertical: {
    start: 'scroll-shadow-t',
    end: 'scroll-shadow-b',
    both: 'scroll-shadow-y',
  },
  horizontal: {
    start: 'scroll-shadow-l',
    end: 'scroll-shadow-r',
    both: 'scroll-shadow-x',
  },
};

export interface UseScrollShadowsParams {
  /**
   * The orientation of the scroll, defaults to `vertical`.
   */
  orientation?: ScrollOrientation;
  /**
   * The number of pixels from the start / end the scroll position must reach
   * before the scroll shadow is removed. Defaults to `1`.
   */
  threshold?: number;
  /**
   * Whether scrolling is reversed (e.g. starts at the bottom instead of the top).
   */
  isReversed?: boolean;
}

/**
 * Determines the correct scroll shadow class that should be applied to a scroll
 * container based on its scroll position and size.
 *
 * Returns the scroll container ref and scroll shadow class.
 */
export function useScrollShadows<T extends HTMLElement = HTMLDivElement>({
  orientation = 'vertical',
  threshold = 1,
  isReversed,
}: UseScrollShadowsParams = {}) {
  const scrollContainerRef = useRef<T>(null);
  const scrollPosObj = useScroll(scrollContainerRef);
  const containerSizeObj = useSize(scrollContainerRef);

  const scrollShadowClassName = useMemo(() => {
    const classNameByShadowPos = SCROLL_CLASSNAMES_BY_ORIENTATION[orientation];

    // We default to showing the shadow so we avoid a flash of non-shadow while
    // all the scroll position / size logic runs.
    const defaultClassName = isReversed
      ? classNameByShadowPos.start
      : classNameByShadowPos.end;

    const container = scrollContainerRef.current;

    if (!container || scrollPosObj == null || containerSizeObj == null) {
      return defaultClassName;
    }

    const scrollPos =
      orientation === 'vertical' ? scrollPosObj.top : scrollPosObj.left;

    const containerSize =
      orientation === 'vertical'
        ? containerSizeObj.height
        : containerSizeObj.width;

    // If we're using a reversed container, `scrollHeight/Width` and `scrollPos`
    // can be negative, so we use the abs value to normalize calculations.
    const absScrollSize = Math.abs(
      orientation === 'vertical'
        ? container.scrollHeight
        : container.scrollWidth,
    );
    const absScrollPos = Math.abs(scrollPos);

    // If the container or scroll size is zero, it's possible the component has
    // mounted but is hidden, so we want to maintain the default class name.
    if (!containerSize || !absScrollSize) {
      return defaultClassName;
    }

    // If the container & scroll size are the same, all elements are in view and
    // so we shouldn't apply any shadow.
    if (containerSize === absScrollSize) {
      return;
    }

    // If we've scrolled to the end of the container, we want to only show a shadow
    // at the start.
    // Note, `absScrollPos` is a non-rounded number, so the only way to reliably
    // determine if we've reached the bottom is to check it's less than a threshold.
    if (absScrollSize - containerSize - absScrollPos <= threshold) {
      return isReversed ? classNameByShadowPos.end : classNameByShadowPos.start;
    }

    // If we haven't scrolled to the end but our scroll position is non-zero, then
    // we're somewhere between the start & end and want to show shadows at both sides.
    if (absScrollPos >= threshold) {
      return classNameByShadowPos.both;
    }

    // Otherwise, scroll position is at the start of the container and we want to
    // only show a shadow at the end.
    return isReversed ? classNameByShadowPos.start : classNameByShadowPos.end;
  }, [containerSizeObj, orientation, isReversed, scrollPosObj, threshold]);

  return { scrollShadowClassName, scrollContainerRef };
}
