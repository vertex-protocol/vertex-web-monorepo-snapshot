import { useSizeClass } from 'client/hooks/ui/breakpoints/useSizeClass';

export function useIsMobile() {
  return useSizeClass().isMobile;
}
