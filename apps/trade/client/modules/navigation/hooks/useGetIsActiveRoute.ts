import { startsWith } from 'lodash';
import { useRouter } from 'next/router';
import { useCallback } from 'react';

export function useGetIsActiveRoute() {
  const { asPath } = useRouter();

  return useCallback(
    (href: string) => {
      return startsWith(asPath.toLowerCase(), href.toLowerCase());
    },
    [asPath],
  );
}
