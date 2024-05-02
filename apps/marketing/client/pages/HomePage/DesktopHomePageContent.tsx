import { BgWrapper } from 'client/components/BgWrapper';
import { Community } from 'client/sections/Community/Community';
import { Developer } from 'client/sections/Developer/Developer';
import { FAQ } from 'client/sections/FAQ/FAQ';
import { Flexibility } from 'client/sections/Flexibility/Flexibility';
import { Footer } from 'client/sections/Footer/Footer';
import { Hero } from 'client/sections/Hero/Hero';
import { DesktopInterface } from 'client/sections/Interface/DesktopInterface';
import { Investors } from 'client/sections/Investors/Investors';
import { LearnMore } from 'client/sections/LearnMore';
import { DesktopNavBar } from 'client/sections/NavBar/DesktopNavBar';
import { DesktopProducts } from 'client/sections/Products/DesktopProducts';
import { Speed } from 'client/sections/Speed/Speed';
import { Vrtx } from 'client/sections/Vrtx/Vrtx';
import Image from 'next/image';
import { CookieNoticeBanner } from 'client/components/CookieNoticeBanner';

// Images
import bottomBg from 'assets/desktop-bottom-bg.png';
import bottomGrid from 'assets/desktop-bottom-grid.png';
import midBg from 'assets/desktop-mid-bg.png';
import topBg from 'assets/desktop-top-bg.png';
import topGrid from 'assets/desktop-top-grid.svg';

export function DesktopHomePageContent() {
  return (
    <div className="hidden sm:block">
      <DesktopNavBar />
      <BgWrapper src={topBg} priority imgClassName="object-cover">
        <Image
          alt="top-grid"
          src={topGrid}
          className="absolute inset-0 h-auto w-full opacity-50"
        />
        <Hero />
      </BgWrapper>
      <DesktopProducts />
      <BgWrapper src={midBg} imgClassName="xl:-mt-[450px]">
        <Vrtx />
        <Flexibility />
        <Speed />
        <DesktopInterface />
      </BgWrapper>
      <BgWrapper src={bottomBg} fill>
        <Investors />
        <FAQ />
        <LearnMore />
        <Community />
        <BgWrapper src={bottomGrid} fill>
          <Developer />
          <Footer />
        </BgWrapper>
      </BgWrapper>
      <CookieNoticeBanner />
    </div>
  );
}
