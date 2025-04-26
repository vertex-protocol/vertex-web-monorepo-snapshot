import { joinClassNames } from '@vertex-protocol/web-common';
import { LaunchAppButton } from 'client/components/Button/LaunchAppButton';
import Logo from 'client/icons/Logo';
import { LINKS } from 'config/links';
import Link from 'next/link';

export const Navigation = () => {
  const linkItemClass = 'transition-colors hover:text-white';

  const navClass = joinClassNames(
    'flex items-center justify-between container-custom',
    'rounded-lg border border-glass shadow-glass py-4 backdrop-blur-md',
  );

  return (
    <header className="fixed top-0 right-0 left-0 z-50 p-4 md:top-5 md:py-0">
      <nav className={navClass}>
        <Link href={LINKS.hero} className="h-4 w-24 pb-0.5">
          <Logo />
        </Link>
        <div className="text-body-gray text-body-13 hidden gap-x-8 lg:flex">
          <Link href={LINKS.whyVertex} className={linkItemClass}>
            Why Vertex
          </Link>
          <Link href={LINKS.multiChain} className={linkItemClass}>
            Edge
          </Link>
          <Link href={LINKS.compare} className={linkItemClass}>
            Compare
          </Link>
          <Link href={LINKS.vrtx} className={linkItemClass}>
            Staking
          </Link>
          <Link href={LINKS.tools} className={linkItemClass}>
            Features
          </Link>
        </div>
        <LaunchAppButton
          href={LINKS.app}
          trackingKey="nav_bar"
          className="text-white"
        >
          Start Trading
        </LaunchAppButton>
      </nav>
    </header>
  );
};
