import classNames from 'classnames';
import { ColorBorderButton } from 'client/components/Button/ColorBorderButton';
import { EXTERNAL_LINKS } from 'client/consts';
import Link from 'next/link';
import { BsTwitterX, BsYoutube } from 'react-icons/bs';
import { SiDiscord } from 'react-icons/si';

export function MobileCommunitySocialLinks() {
  const links = [
    {
      id: 'discord',
      icon: <SiDiscord size={20} />,
      href: EXTERNAL_LINKS.discord,
    },
    {
      id: 'youtube',
      icon: <BsYoutube size={20} />,
      href: EXTERNAL_LINKS.youtube,
    },
    {
      id: 'twitter',
      icon: <BsTwitterX size={20} />,
      href: EXTERNAL_LINKS.twitter,
    },
  ];
  return (
    <div
      className={classNames(
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
