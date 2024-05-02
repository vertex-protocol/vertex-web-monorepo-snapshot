import { DesktopHomePageContent } from './DesktopHomePageContent';
import { MobileHomePageContent } from './MobileHomePageContent';
import { useIsClient, useWindowSize } from '@vertex-protocol/web-common';

export function HomePage() {
  const isClient = useIsClient();
  const { width } = useWindowSize();

  const content = (() => {
    if (isClient && width < 834) {
      return <MobileHomePageContent />;
    }

    return <DesktopHomePageContent />;
  })();

  return <div className="font-sans">{content}</div>;
}
