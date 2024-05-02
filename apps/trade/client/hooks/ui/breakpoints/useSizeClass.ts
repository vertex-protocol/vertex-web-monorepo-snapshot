import { useMemo } from 'react';
import { Breakpoint } from './breakpoints';
import { useIsClient, useWindowSize } from '@vertex-protocol/web-common';

export type SizeClass = 'mobile' | 'tablet' | 'desktop';

interface UseSizeClass {
  value: SizeClass;
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
}

export function useSizeClass(): UseSizeClass {
  const isClient = useIsClient();
  const { width } = useWindowSize();

  const sizeClass = useMemo((): SizeClass => {
    // Default to desktop
    if (!isClient) {
      return 'desktop';
    }
    switch (true) {
      case width < Breakpoint.sm:
        return 'mobile';
      case width < Breakpoint.lg:
        return 'tablet';
      default:
        return 'desktop';
    }
  }, [isClient, width]);

  return {
    value: sizeClass,
    isMobile: sizeClass === 'mobile',
    isTablet: sizeClass === 'tablet',
    isDesktop: sizeClass === 'desktop',
  };
}
