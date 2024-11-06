import { DiscordLogo } from '@phosphor-icons/react/dist/ssr/DiscordLogo';
import { XLogo } from '@phosphor-icons/react/dist/ssr/XLogo';
import { YoutubeLogo } from '@phosphor-icons/react/dist/ssr/YoutubeLogo';
import { joinClassNames } from '@vertex-protocol/web-common';
import { ColorBorderButton } from 'client/components/Button/ColorBorderButton';
import { EXTERNAL_LINKS } from 'client/consts';
import Link from 'next/link';

export function MobileCommunitySocialLinks() {
  const links = [
    {
      id: 'discord',
      icon: <DiscordLogo weight="fill" size={24} />,
      href: EXTERNAL_LINKS.discord,
    },
    {
      id: 'youtube',
      icon: <YoutubeLogo weight="fill" size={24} />,
      href: EXTERNAL_LINKS.youtube,
    },
    {
      id: 'x',
      icon: <XLogo weight="fill" size={24} />,
      href: EXTERNAL_LINKS.x,
    },
  ];

  return (
    <div
      className={joinClassNames(
        'flex w-full justify-center gap-x-6',
        'sm:justify-start md:hidden',
      )}
    >
      {links.map(({ id, icon, href }) => (
        <ColorBorderButton
          key={id}
          className="flex justify-center p-5 sm:flex-none"
          as={Link}
          external
          href={href}
        >
          {icon}
        </ColorBorderButton>
      ))}
    </div>
  );
}
