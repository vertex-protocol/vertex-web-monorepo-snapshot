import {
  GEOBLOCKED_COUNTRY_NAMES,
  joinClassNames,
} from '@vertex-protocol/web-common';
import { BlitzLinkButton } from 'components/BlitzLinkButton';
import { GlitchText } from 'components/GlitchText';
import { LINKS } from 'config/links';

export function LocationRestrictedSection() {
  return (
    <section className="relative flex h-full flex-col items-center justify-center">
      <div
        className={joinClassNames(
          'max-w-[min(95vw,420px)] p-6',
          'border-pink border',
          'flex flex-col items-center justify-center gap-y-6',
        )}
      >
        <GlitchText>RESTRICTED TERRITORY</GlitchText>
        <div className="font-ibm flex flex-col gap-y-3 text-xs">
          <p>
            It appears that you are accessing from a Restricted Territory.
            Unfortunately, we are not able to support users from the following
            Restricted Territories at this time:
          </p>
          <div className="flex flex-col gap-y-1 pl-2 text-gray-300/90">
            {GEOBLOCKED_COUNTRY_NAMES.map((name) => {
              return <p key={name}>{name}</p>;
            })}
          </div>
          <p>Please refer to our terms for additional information.</p>
        </div>
        <BlitzLinkButton href={LINKS.termsOfUse} external>
          TERMS OF USE
        </BlitzLinkButton>
      </div>
    </section>
  );
}
