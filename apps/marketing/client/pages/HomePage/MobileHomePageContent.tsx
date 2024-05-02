import { BgWrapper } from 'client/components/BgWrapper';
import { Community } from 'client/sections/Community/Community';
import { Developer } from 'client/sections/Developer/Developer';
import { FAQ } from 'client/sections/FAQ/FAQ';
import { Flexibility } from 'client/sections/Flexibility/Flexibility';
import { Footer } from 'client/sections/Footer/Footer';
import { Hero } from 'client/sections/Hero/Hero';
import { MobileInterface } from 'client/sections/Interface/MobileInterface';
import { Investors } from 'client/sections/Investors/Investors';
import { LearnMore } from 'client/sections/LearnMore';
import { MobileNavBar } from 'client/sections/NavBar/MobileNavBar';
import { MobileProducts } from 'client/sections/Products/MobileProducts';
import { Speed } from 'client/sections/Speed/Speed';
import { Vrtx } from 'client/sections/Vrtx/Vrtx';
import Image from 'next/image';

// Images
import bottomBg from 'assets/mobile-bottom-bg.png';
import midBg from 'assets/mobile-mid-bg.png';
import midGrid from 'assets/mobile-mid-grid.svg';
import topBg from 'assets/mobile-top-bg.svg';
import { CookieNoticeBanner } from 'client/components/CookieNoticeBanner';

export function MobileHomePageContent() {
  return (
    <div className="sm:hidden">
      <MobileNavBar />
      <BgWrapper src={topBg} fill imgClassName="object-cover">
        <Hero />
      </BgWrapper>
      <BgWrapper src={midBg} className="mt-36" fill>
        <Image
          alt="mid-grid"
          src={midGrid}
          className="absolute inset-0 mt-16 w-full"
        />
        <MobileProducts />
        <Vrtx />
        <Flexibility />
        <Speed />
        <MobileInterface />
        <Investors />
        <FAQ />
        <LearnMore />
        <Community />
      </BgWrapper>
      <BgWrapper src={bottomBg} fill imgClassName="object-bottom">
        <Developer />
        <Footer />
      </BgWrapper>
      <CookieNoticeBanner />
    </div>
  );
}
