import { useEffect, useRef } from 'react';

/**
 * @param shouldRun
 * @param callback
 * @summary This hook is used to fire a callback once when the `shouldRun` condition is met
 */
export function useRunOnceOnCondition(
  shouldRun: boolean,
  callback: () => void,
) {
  const hasRun = useRef(false);

  useEffect(() => {
    if (!hasRun.current && shouldRun) {
      hasRun.current = true;
      callback();
    }
  }, [callback, shouldRun]);
}
