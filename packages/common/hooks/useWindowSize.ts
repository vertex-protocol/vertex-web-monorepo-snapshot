import { useSize } from 'ahooks';

export function useWindowSize() {
  const size = useSize(() => document.querySelector('body'));

  return {
    width: size?.width ?? 0,
    height: size?.height ?? 0,
  };
}
