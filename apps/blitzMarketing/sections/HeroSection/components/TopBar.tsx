import { BlitzLinkButton } from 'components/BlitzLinkButton';
import { GlitchText } from 'components/GlitchText';
import { LINKS } from 'config/links';
import Image from 'next/image';
import Link from 'next/link';
import blastLogo from 'public/blitz/blast-logo.png';

/**
 * @name TopBar
 * @description The top bar of the Blitz header
 */
export function TopBar() {
  return (
    <div className="flex flex-col items-center justify-between gap-6 px-10 md:flex-row-reverse md:py-8">
      <div className="flex flex-col items-center gap-x-10 gap-y-6 md:flex-row md:gap-y-0">
        <GlitchText className="text-pink text-shadow-pink">
          开 始 交 易
        </GlitchText>
        <BlitzLinkButton external href={LINKS.app}>
          START TRADING
        </BlitzLinkButton>
      </div>
      <div className="flex flex-col gap-y-1">
        <div className="flex items-center gap-x-2 text-lg">
          BUILT ON
          <Link href={LINKS.blast} target="_blank" rel="noopener noreferrer">
            <Image
              src={blastLogo}
              alt="blast"
              className="h-5 w-auto pb-0.5"
              priority
            />
          </Link>
        </div>
        <span>EARN POINTS & GOLD</span>
      </div>
    </div>
  );
}
