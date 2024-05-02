import { useSizeClass } from 'client/hooks/ui/breakpoints/useSizeClass';

export function useIsDesktop() {
  return useSizeClass().isDesktop;
}
