import { useCallback, useState } from 'react';
import { asyncResult } from '../utils';

export function useCopyText() {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  const handleCopyText = useCallback(async (val?: string) => {
    // If for some reason the navigator or clipboard is not available, we return early
    if (!navigator || !navigator.clipboard) {
      console.warn('Clipboard not available');
      return;
    }

    if (!val) return;

    const [, error] = await asyncResult(navigator.clipboard.writeText(val));

    if (error) {
      console.warn('Failed to copy text to clipboard', error);
      setIsCopied(false);
    }

    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  }, []);

  return { isCopied, copy: handleCopyText };
}
