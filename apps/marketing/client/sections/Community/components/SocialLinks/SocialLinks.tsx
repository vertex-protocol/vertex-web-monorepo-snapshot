import { GradientButton } from 'client/components/Button/GradientButton';
import { EXTERNAL_LINKS } from 'client/consts';
import Link from 'next/link';
import { SiPrisma } from 'react-icons/si';
import { SOCIAL_LINKS } from '../../data';
import { CommunitySocialButton } from './CommunitySocialButton';
import { MobileCommunitySocialLinks } from './MobileCommunitySocialLinks';

export function SocialLinks() {
  return (
    <div className="flex w-full flex-col items-center gap-4 sm:flex-row sm:flex-wrap lg:justify-start">
      {/* Hidden on mobile */}
      {SOCIAL_LINKS.map(({ label, href, startIcon }) => {
        return (
          <CommunitySocialButton
            className="hidden md:flex lg:flex-none"
            key={label}
            href={href}
            startIcon={startIcon}
          >
            {label}
          </CommunitySocialButton>
        );
      })}
      <CommunitySocialButton
        className="lg:flex-none"
        as={Link}
        external
        href={EXTERNAL_LINKS.ambassadors}
        startIcon={<SiPrisma size={16} />}
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
