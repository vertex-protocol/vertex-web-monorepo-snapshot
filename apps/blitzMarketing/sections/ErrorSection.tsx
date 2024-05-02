import { BlitzLinkButton } from 'components/BlitzLinkButton';
import { GlitchText } from 'components/GlitchText';
import Image from 'next/image';
import logo from 'public/blitz/blitz-logo.png';

/**
 * @name ErrorSection
 * @description The error section of the Blitz landing page
 */
export function ErrorSection({
  statusCode,
  errorMessage,
}: {
  statusCode: 404 | 500;
  errorMessage: string;
}) {
  return (
    <section className="h-full">
      <div className="relative flex h-full w-full p-3 md:px-7 md:py-5">
        <div className="border-pink relative w-full border-x px-4">
          <span className="border-pink absolute left-2 top-0 h-12 w-12 border-l border-t md:left-4" />
          <span className="border-pink absolute right-2 top-0 h-12 w-12 border-r border-t md:right-4" />
          <span className="border-pink absolute bottom-0 left-2 right-2 h-12 border border-t-0 md:left-4 md:right-4" />
          <div className="relative flex h-full flex-col items-center justify-between px-4 pb-6 pt-24 md:px-10">
            <div className="flex flex-col items-center">
              <span className="font-ibm text-lg md:text-2xl">{statusCode}</span>
              <div className="flex flex-col items-center gap-y-8">
                <GlitchText
                  as="h1"
                  wrapperClassName="text-2xl md:text-7xl"
                >{`${errorMessage.toLocaleUpperCase()}`}</GlitchText>
                <BlitzLinkButton href="/" className="max-w-80">
                  TAKE ME HOME
                </BlitzLinkButton>
              </div>
            </div>
            <Image src={logo} alt="blitz-logo" className="max-w-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
