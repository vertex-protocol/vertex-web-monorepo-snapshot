export function useBaseUrl() {
  if (typeof window === 'undefined') return;
  return window.location?.origin;
}
