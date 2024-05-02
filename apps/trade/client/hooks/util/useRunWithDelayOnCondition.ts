import { useEffect } from 'react';

interface Params {
  condition: boolean;
  // Defaults to 5 seconds
  delay?: number;

  fn(): void;
}

/**
 * Calls a function after a delay if the given condition is true
 */
export function useRunWithDelayOnCondition({
  condition,
  fn,
  delay = 5000,
}: Params) {
  useEffect(
    () => {
      let timeout: NodeJS.Timeout | undefined;
      if (condition) {
        timeout = setTimeout(() => {
          fn();
        }, delay);
      }

      return () => {
        clearTimeout(timeout);
      };
    },
    // Run only on condition changes
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [condition],
  );
}
