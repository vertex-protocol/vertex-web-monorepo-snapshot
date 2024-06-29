import { joinClassNames } from '@vertex-protocol/web-common';
import { DEFAULT_SECTION_WIDTH } from 'client/consts';
import Image from 'next/image';
import { ContactLink } from './components/ContactLink';
import { EmailSignUp } from './components/EmailSignup';
import { FooterLinks } from './components/FooterLinks';
import { LegalDisclaimer } from './components/LegalDisclaimer';

// Images
import logoWhite from 'client/sections/Footer/assets/logo-white.svg';

export function Footer() {
  return (
    // Outer container for padding
    <section
      className={joinClassNames(
        'px-4 py-8',
        'md:px-12',
        'lg:px-24',
        DEFAULT_SECTION_WIDTH,
      )}
    >
      <div
        className={joinClassNames(
          'bg-black-800 backdrop-blur-nav z-10',
          'flex w-full flex-col justify-between',
          'rounded-xl p-6',
          'md:p-10',
        )}
      >
        <div
          className={joinClassNames(
            'flex w-full flex-col items-start justify-between gap-y-4 pb-8',
            'sm:flex-row sm:items-center sm:gap-y-0',
          )}
        >
          <Image src={logoWhite} alt="Vertex" className="w-28 py-1.5 lg:w-32" />
          {/* Desktop Email Sign-up */}
          <EmailSignUp
            className={joinClassNames(
              'hidden gap-x-4 gap-y-2.5',
              'sm:flex sm:flex-col',
              'md:flex-row md:items-center',
            )}
          />
        </div>
        <div
          className={joinClassNames(
            'flex flex-col justify-between gap-y-6 pt-8',
            'border-white-600 border-t',
            'md:items-start',
          )}
        >
          <FooterLinks />
          <div
            className={joinClassNames(
              'flex w-full flex-col gap-y-4',
              'sm:flex-row sm:justify-between',
            )}
          >
            <ContactLink />
            <LegalDisclaimer />
          </div>
        </div>
      </div>
    </section>
  );
}
