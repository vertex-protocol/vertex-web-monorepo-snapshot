import { useEffect, useState } from 'react';

/**
 * Debounces only falsy values, original implementation: https://usehooks-ts.com/react-hook/use-debounce
 * @param value
 * @param delay
 */
export function useDebounceFalsy<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // This is the only difference from the original impl - set immediately
    if (value) {
      setDebouncedValue(value);
      return;
    }

    const timer = setTimeout(() => setDebouncedValue(value), delay);

    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]);

  return debouncedValue;
}
