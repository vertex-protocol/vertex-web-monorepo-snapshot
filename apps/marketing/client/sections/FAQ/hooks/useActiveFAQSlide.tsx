import { useCallback, useState } from 'react';

export function useActiveFAQSlide() {
  const [active, setActive] = useState<number>();
  const setActiveSlide = useCallback((index: number) => {
    setActive((prev) => (prev === index ? undefined : index));
  }, []);

  return { active, setActiveSlide };
}
