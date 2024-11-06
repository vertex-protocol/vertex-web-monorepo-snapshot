import { HomePageButton } from 'client/components/Button/HomePageButton';
import Link from 'next/link';
import { FOOTER_LINKS, FooterLinkProps } from 'client/sections/Footer/data';
import { joinClassNames } from '@vertex-protocol/web-common';

export function FooterLinks() {
  return (
    <div className="flex flex-col gap-y-6 sm:gap-y-8">
      <div
        className={joinClassNames(
          'flex flex-wrap items-center gap-3',
          'font-dmSans text-lg text-white',
          'sm:flex-nowrap sm:gap-x-8',
          'xl:text-xl',
        )}
      >
        {FOOTER_LINKS.map(({ href, label }, index) => {
          return <FooterLink key={index} href={href} label={label} />;
        })}
      </div>
    </div>
  );
}

function FooterLink({ label, href, ...rest }: FooterLinkProps) {
  return (
    <HomePageButton
      as={Link}
      className={joinClassNames(
        'flex basis-1/3 justify-start whitespace-nowrap',
        'font-dmSans text-left text-xs text-white',
        'hover:gradient-text hover:bg-buttonGradient hover:text-transparent hover:brightness-125',
        'sm:basis-auto',
        'md:text-lg',
      )}
      href={href}
      external
      {...rest}
    >
      {label}
    </HomePageButton>
  );
}
