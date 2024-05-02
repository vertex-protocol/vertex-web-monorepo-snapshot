import { NextImageSrc, joinClassNames } from '@vertex-protocol/web-common';
import { HomePageButton } from 'client/components/Button/HomePageButton';
import { EXTERNAL_LINKS } from 'client/consts';
import Image from 'next/image';
import Link from 'next/link';
import { VrtxInfoSectionContainer } from './VrtxInfoSectionContainer';

import bybitIcon from 'client/sections/Vrtx/assets/bybit-logo.svg';
import camelotIcon from 'client/sections/Vrtx/assets/camelot-logo.svg';
import gateIcon from 'client/sections/Vrtx/assets/gate-logo.svg';
import htxIcon from 'client/sections/Vrtx/assets/htx-logo.svg';
import kucoinIcon from 'client/sections/Vrtx/assets/kucoin-logo.svg';
import mexcIcon from 'client/sections/Vrtx/assets/mexc-logo.svg';
import traderIcon from 'client/sections/Vrtx/assets/trader-joe.webp';
import vertexIcon from 'client/sections/Vrtx/assets/vertex-logo.svg';
import { VrtxLinkProps } from './VrtxNetworkCard';

const LISTING_LINKS = [
  {
    imgSrc: htxIcon,
    href: EXTERNAL_LINKS.tokenListings.htx,
  },
  {
    imgSrc: bybitIcon,
    href: EXTERNAL_LINKS.tokenListings.bybit,
  },
  {
    imgSrc: kucoinIcon,
    href: EXTERNAL_LINKS.tokenListings.kucoin,
  },
  {
    imgSrc: gateIcon,
    href: EXTERNAL_LINKS.tokenListings.gate,
  },
  {
    imgSrc: mexcIcon,
    href: EXTERNAL_LINKS.tokenListings.mexc,
  },
  {
    imgSrc: vertexIcon,
    href: EXTERNAL_LINKS.tokenListings.vertex,
  },
  {
    imgSrc: camelotIcon,
    href: EXTERNAL_LINKS.tokenListings.camelot,
  },
  {
    imgSrc: traderIcon,
    href: EXTERNAL_LINKS.tokenListings.traderJoe,
  },
];

export function VrtxListingLinks() {
  return (
    <VrtxInfoSectionContainer
      title="LISTED ON"
      contentClassName="grid grid-cols-2 gap-2 md:grid-cols-4"
    >
      {LISTING_LINKS.map(({ href, imgSrc }, index) => {
        return (
          <LogoLinkButton
            key={`listing_${index}`}
            imgSrc={imgSrc}
            href={href}
          />
        );
      })}
    </VrtxInfoSectionContainer>
  );
}

function LogoLinkButton({
  imgSrc,
  href,
  ...rest
}: VrtxLinkProps & { imgSrc: NextImageSrc }) {
  return (
    <HomePageButton
      className={joinClassNames(
        'flex h-20 items-center justify-center backdrop-blur-[2px]',
        'bg-white-400 rounded-lg hover:bg-white/5',
      )}
      as={Link}
      href={href}
      external
      {...rest}
    >
      <Image
        src={imgSrc}
        alt="Exchange logo"
        className="max-h-14 w-auto px-6 py-3"
      />
    </HomePageButton>
  );
}
