import { useIsClient } from '@vertex-protocol/web-common';
import { useTheme } from 'next-themes';
import { useCallback } from 'react';

export type ColorMode = 'light' | 'dark';

export const useColorMode = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const isClient = useIsClient();

  const setColorMode = useCallback(
    (value: 'dark' | 'light') => {
      if (!isClient) {
        return;
      }
      setTheme(value);
    },
    [isClient, setTheme],
  );

  return { colorMode: resolvedTheme as ColorMode | undefined, setColorMode };
};
