import { useCallback } from 'react';

const logOnceKeys = new Set<string>();

/**
 * Uses `console.time` to profile operations.
 * @param key a unique key to identify the opeartion
 * @param logOnce If given, will only profile once
 */
export function useOperationTimeLogger(key: string, logOnce?: boolean) {
  const loggerKey = `[PROFILER|${key}]`;

  const startProfiling = useCallback(() => {
    if (logOnce && logOnceKeys.has(loggerKey)) {
      return;
    }
    console.time(loggerKey);
  }, [logOnce, loggerKey]);

  const endProfiling = useCallback(() => {
    if (logOnce && logOnceKeys.has(loggerKey)) {
      return;
    }
    console.timeEnd(loggerKey);
    logOnceKeys.add(loggerKey);
  }, [loggerKey, logOnce]);

  return {
    startProfiling,
    endProfiling,
  };
}
