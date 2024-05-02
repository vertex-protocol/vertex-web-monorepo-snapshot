import { useEffect, useState } from 'react';

const isSupported =
  typeof document !== 'undefined' && Boolean(document.addEventListener);

function getIsDocumentHidden() {
  if (!isSupported) {
    return false;
  }
  return !document.hidden;
}

export function usePageVisibility() {
  const [isVisible, setIsVisible] = useState(getIsDocumentHidden());
  const onVisibilityChange = () => setIsVisible(getIsDocumentHidden());

  useEffect(() => {
    document.addEventListener('visibilitychange', onVisibilityChange, false);

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange);
    };
  });

  return { isVisible };
}
