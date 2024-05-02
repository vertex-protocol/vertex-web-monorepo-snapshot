import { BgWrapper } from 'client/components/BgWrapper';
import { GradientButton } from 'client/components/Button/GradientButton';
import { EXTERNAL_LINKS } from 'client/consts';
import Image from 'next/image';
import Link from 'next/link';

//Images
import errorBg from 'assets/error-bg.png';
import largeScreenLogo from 'assets/vertex-icon-large-screen.svg';
import smallScreenLogo from 'assets/vertex-icon-small-screen.svg';

export function ErrorPage({ statusCode }: { statusCode: 404 | 500 }) {
  return (
    <BgWrapper
      className="relative h-screen w-screen overflow-hidden font-sans"
      src={errorBg}
      fill
      priority
    >
      <Image
        className="absolute right-0 top-0 hidden lg:block lg:scale-100"
        src={largeScreenLogo}
        alt="Vertex Logo"
      />
      <Image
        className="absolute -bottom-12 right-0 h-screen w-screen sm:bottom-0 lg:hidden"
        src={smallScreenLogo}
        alt="Vertex Logo"
      />
      <div className="lg:pt-30 z-10 flex h-full flex-col items-center justify-center gap-y-8 lg:gap-y-12">
        <div className="flex flex-col items-center gap-y-2">
          <div className="text-white-800 text-10xl font-bold leading-none lg:text-[16rem]">
            {statusCode}
          </div>
          <p className="text-white-800 font-dmSans text-base font-medium lg:text-2xl">
            {statusCode === 404 ? 'Page not found' : 'Server error'}
          </p>
        </div>
        <GradientButton
          as={Link}
          href={EXTERNAL_LINKS.home}
          className="z-20 px-5 py-3 lg:px-8"
        >
          Take me to Home
        </GradientButton>
      </div>
    </BgWrapper>
  );
}
