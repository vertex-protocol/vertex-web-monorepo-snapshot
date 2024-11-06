import { useInViewport } from 'ahooks';
import { useRef } from 'react';

export function useSpeedBars() {
  const containerRef = useRef(null);
  const [isInViewport] = useInViewport(containerRef, {
    threshold: 0.5,
  });

  return { containerRef, isInView: !!isInViewport };
}
