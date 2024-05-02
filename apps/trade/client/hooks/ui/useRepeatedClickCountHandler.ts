import { MouseEvent, MouseEventHandler, useEffect, useState } from 'react';

interface Params<T> {
  handler: (count: number, event: MouseEvent<T>) => void;
  resetDelay?: number;
}

export function useRepeatedClickCountHandler<T = Element>({
  resetDelay = 200,
  handler,
}: Params<T>): MouseEventHandler<T> {
  const [numClicks, setNumClicks] = useState(0);

  // Reset the counter after a
  useEffect(() => {
    const timeout = setTimeout(() => {
      setNumClicks(0);
    }, resetDelay);

    return () => {
      clearTimeout(timeout);
    };
  }, [numClicks, resetDelay]);

  return (e) => {
    const next = numClicks + 1;
    setNumClicks(next);
    handler(next, e);
  };
}
