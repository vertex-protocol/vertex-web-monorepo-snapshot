import { WithClassnames } from '@vertex-protocol/web-common';
import classNames from 'classnames';
import { GradientButton } from 'client/components/Button/GradientButton';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import Link from 'next/link';
import { ReactNode } from 'react';
import { IconType } from 'react-icons';
import { MdArrowUpward } from 'react-icons/md';

interface Props {
  icon: IconType;
  title: string;
  content: ReactNode;
  href: string;
  comingSoon?: boolean;
}

export function DeveloperCard({
  className,
  href,
  icon,
  title,
  content,
  comingSoon,
}: WithClassnames<Props>) {
  return (
    <HomePageButton
      as={Link}
      href={href}
      disabled={comingSoon}
      className={classNames(
        'bg-grayGradient group flex h-28 w-full overflow-hidden rounded-xl bg-center',
        'text-3xl font-bold text-white duration-500 disabled:opacity-70',
        'md:h-40',
        !comingSoon && 'hover:brightness-125',
        className,
      )}
      external
    >
      <div className="flex h-full w-full flex-col gap-y-3 overflow-hidden rounded-xl bg-black/30 backdrop-blur-xl">
        <Header icon={icon} title={title} comingSoon={comingSoon} />
        <div
          className={classNames(
            'font-dmSans text-white-700/75 w-2/3 px-3 text-left text-sm font-normal leading-5',
            'sm:text-base',
            'md:px-4',
            'lg:w-4/5',
          )}
        >
          {content}
        </div>
      </div>
    </HomePageButton>
  );
}

function Header({
  icon: Icon,
  title,
  comingSoon,
}: {
  icon: IconType;
  title: string;
  comingSoon?: boolean;
}) {
  const comingSoonIconContent = (() => {
    if (comingSoon) {
      return (
        <GradientButton
          as="div"
          className="pointer-events-none px-2 py-1 text-xs"
        >
          Coming Soon
        </GradientButton>
      );
    }
    <MdArrowUpward className="text-black-500 rotate-45" size={28} />;
  })();
  return (
    <div className="flex items-center justify-between px-3 pt-3 lg:px-4 lg:pt-4">
      <div className="flex items-center justify-between gap-x-3 text-lg leading-8 md:text-2xl">
        <div className="bg-white-400 text-black-500 rounded-xl p-2 md:p-3">
          <Icon
            size={20}
            className={classNames(
              'transition duration-300',
              !comingSoon && 'group-hover:text-purple-800',
            )}
          />
        </div>
        <p className="text-lg">{title}</p>
      </div>
      {comingSoonIconContent}
    </div>
  );
}
