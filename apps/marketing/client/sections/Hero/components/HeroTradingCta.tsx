import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { GradientButton } from 'client/components/Button/GradientButton';
import { EXTERNAL_LINKS } from 'client/consts';
import Image from 'next/image';
import Link from 'next/link';

import arbIcon from 'assets/chains/arb-icon.svg';
import baseIcon from 'assets/chains/base-icon.svg';
import mantleIcon from 'assets/chains/mantle-icon.svg';
import seiIcon from 'assets/chains/sei-icon.svg';

export function HeroTradingCta({ className }: WithClassnames) {
  const buttonClassNames = joinClassNames(
    'flex items-center justify-center w-full px-4 py-2 text-xs',
    'sm:w-64 sm:text-base',
    'lg:py-3 lg:text-lg',
  );

  return (
    <div
      className={joinClassNames(
        'flex flex-col gap-y-5 px-4',
        'items-center sm:justify-center',
        className,
      )}
    >
      <GradientButton
        className={buttonClassNames}
        as={Link}
        href={EXTERNAL_LINKS.app}
        external
      >
        Start Trading
      </GradientButton>
      <div className="flex items-center gap-x-1">
        Available on:
        <ChainIconArray />
      </div>
    </div>
  );
}

function ChainIconArray() {
  const iconClassName = '-mr-2 h-6 w-auto';

  return (
    <div className="flex items-center">
      <Image className={iconClassName} src={arbIcon} alt="Arbitrum" />
      <Image className={iconClassName} src={mantleIcon} alt="Mantle" />
      <Image className={iconClassName} src={seiIcon} alt="SEI" />
      <Image className={iconClassName} src={baseIcon} alt="Base" />
    </div>
  );
}
