import { GradientButton } from 'client/components/Button/GradientButton';
import { EXTERNAL_LINKS } from 'client/consts';
import { CommunitySocialButton } from 'client/sections/Community/components/SocialLinks/CommunitySocialButton';
import { MobileCommunitySocialLinks } from 'client/sections/Community/components/SocialLinks/MobileCommunitySocialLinks';
import { SOCIAL_LINKS } from 'client/sections/Community/data';
import Link from 'next/link';

export function SocialLinks() {
  return (
    <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap lg:justify-start">
      {/* Hidden on mobile */}
      {SOCIAL_LINKS.map(({ href, startIcon }, index) => {
        return (
          <CommunitySocialButton
            className="hidden md:flex lg:flex-none"
            key={index}
            href={href}
            startIcon={startIcon}
          />
        );
      })}
      <CommunitySocialButton
        className="lg:flex-none"
        as={Link}
        external
        href={EXTERNAL_LINKS.ambassadors}
      >
        Ambassadors
      </CommunitySocialButton>
      <GradientButton
        className="w-full px-8 py-4 font-bold text-white transition sm:w-max"
        as={Link}
        external
        href={EXTERNAL_LINKS.wiki}
      >
        Community Wiki
      </GradientButton>
      {/* Mobile Only */}
      <MobileCommunitySocialLinks />
    </div>
  );
}
