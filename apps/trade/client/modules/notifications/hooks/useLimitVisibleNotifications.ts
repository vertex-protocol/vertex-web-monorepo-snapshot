import { useSizeClass } from 'client/hooks/ui/breakpoints';
import { useEffect } from 'react';
import { Toast, toast, useToasterStore } from 'react-hot-toast';

/**
 * Limit the number of visible notifications depending on screen size
 */
export function useLimitVisibleNotifications() {
  const { toasts } = useToasterStore();
  const { isMobile } = useSizeClass();

  // https://github.com/timolins/react-hot-toast/issues/31
  useEffect(() => {
    toasts
      .filter((t: Toast['message']) => t.visible)
      // Limit to 2 notifs for mobile users and 5 notifs for desktop/tablet users
      .slice(isMobile ? 2 : 5)
      .forEach((t: Toast['message']) => toast.dismiss(t.id));
  }, [isMobile, toasts]);
}
