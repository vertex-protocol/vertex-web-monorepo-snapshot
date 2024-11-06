import { startsWith } from 'lodash';
import { usePathname } from 'next/navigation';
import { useCallback } from 'react';

/**
 * Returns a function that checks if the current route is one of the provided routes.
 */
export function useGetIsActiveRoute() {
  const pathname = usePathname();

  return useCallback(
    (...routes: string[]) => {
      return routes.some((route) =>
        startsWith(pathname.toLowerCase(), route.toLowerCase()),
      );
    },
    [pathname],
  );
}
