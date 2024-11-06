import { HomePage } from 'client/pages/HomePage/HomePage';
import { DesktopHomePageContent } from 'client/pages/HomePage/DesktopHomePageContent';
import { MobileHomePageContent } from 'client/pages/HomePage/MobileHomePageContent';

export default function Home() {
  return (
    <HomePage
      desktopContent={<DesktopHomePageContent />}
      mobileContent={<MobileHomePageContent />}
    />
  );
}
