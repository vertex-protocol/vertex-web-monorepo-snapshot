import { useInViewport } from 'ahooks';
import { useRef } from 'react';

export function useSpeedSection() {
  const containerRef = useRef(null);
  const [isInViewport] = useInViewport(containerRef, {
    threshold: 0.5,
  });
  const incrementToString: { [key: number]: string } = {
    0: '1s',
    1: '5s',
    2: '10s',
    3: '30s',
  };

  return {
    containerRef,
    isInView: !!isInViewport,
    incrementToString,
  };
}
