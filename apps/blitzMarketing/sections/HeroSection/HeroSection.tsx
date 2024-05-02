import { BlitzLinkButton } from 'components/BlitzLinkButton';
import { LINKS } from 'config/links';
import Image from 'next/image';
import logo from 'public/blitz/blitz-logo.png';
import { BottomBar } from './components/BottomBar';
import { TopBar } from './components/TopBar';
import { CookieNoticeBanner } from 'components/CookieNoticeBanner';

/**
 * @name HeroSection
 * @description The hero section of the Blitz landing page
 */

export function HeroSection() {
  return (
    <section className="h-full">
      <div className="relative flex h-full w-full p-3 md:px-7 md:py-5">
        <div className="border-pink relative h-full w-full border-x px-4">
          <span className="border-pink absolute left-2 top-0 h-12 w-12 border-l border-t md:left-4" />
          <span className="border-pink absolute right-2 top-0 h-12 w-12 border-r border-t md:right-4" />
          <span className="border-pink absolute bottom-0 left-2 right-2 h-12 border border-t-0 md:left-4 md:right-4" />
          <div className="relative flex h-full w-full flex-col justify-between">
            <TopBar />
            <div>
              <div className="flex flex-col gap-y-6 px-4 md:px-10">
                <Image
                  src={logo}
                  alt="blitz-logo"
                  className="max-w-80"
                  priority
                />
                <h1 className="font-ibm sm:text-md max-w-[624px] text-sm md:text-lg">
                  Blazing fast orderbook for spot and futures trading. Earn on
                  Blast. Trade on Blitz. Connected by Edge.
                </h1>
                <BlitzLinkButton external href={LINKS.app}>
                  LAUNCH
                </BlitzLinkButton>
              </div>
              <BottomBar />
            </div>
          </div>
        </div>
        <CookieNoticeBanner className="absolute bottom-2 right-0" />
      </div>
    </section>
  );
}
