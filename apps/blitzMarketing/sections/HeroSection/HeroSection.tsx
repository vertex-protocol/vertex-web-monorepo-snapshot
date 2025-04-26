import { BlitzLinkButton } from 'components/BlitzLinkButton';
import { CookieNoticeBanner } from 'components/CookieNoticeBanner';
import { LINKS } from 'config/links';
import Image from 'next/image';
import logo from 'public/blitz/blitz-logo.png';
import { BottomBar } from 'sections/HeroSection/components/BottomBar';
import { TopBar } from 'sections/HeroSection/components/TopBar';

/**
 * @name HeroSection
 * @description The hero section of the Blitz landing page
 */
export function HeroSection() {
  return (
    <div className="relative h-full w-full p-3 md:px-7 md:py-5">
      <div className="border-pink relative flex h-full flex-col border-x px-4">
        <span className="border-pink absolute top-0 left-2 size-12 border-t border-l md:left-4" />
        <span className="border-pink absolute top-0 right-2 size-12 border-t border-r md:right-4" />
        <span className="border-pink absolute right-2 bottom-0 left-2 h-12 border border-t-0 md:right-4 md:left-4" />
        <div className="flex flex-1 flex-col justify-between">
          <TopBar />
          <div className="flex flex-col gap-y-10 px-4 md:px-10">
            <div className="flex flex-col gap-y-4">
              <Image
                src={logo}
                alt="blitz-logo"
                className="max-w-64 lg:max-w-80"
                priority
              />
              <h2 className="font-ibm sm:text-md max-w-[624px] text-sm md:text-base">
                Trade on-chain with CEX-like performance. Use USDB and wETH as
                margin while earning interest. Tap into deep liquidity and
                experience the speed powered by Vertex Edge. Blitz is the
                exchange for traders on Blast.
              </h2>
            </div>
            <BlitzLinkButton external href={LINKS.app}>
              START TRADING
            </BlitzLinkButton>
          </div>
        </div>
        <BottomBar />
      </div>
      <CookieNoticeBanner className="absolute right-0 bottom-2" />
    </div>
  );
}
