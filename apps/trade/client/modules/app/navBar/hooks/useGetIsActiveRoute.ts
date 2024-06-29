import { startsWith } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

/**
 * Returns a function that checks if the current route is one of the provided routes.
 */
export function useGetIsActiveRoute() {
  const { asPath } = useRouter();

  return useCallback(
    (...routes: string[]) => {
      return routes.some((route) =>
        startsWith(asPath.toLowerCase(), route.toLowerCase()),
      );
    },
    [asPath],
  );
}
