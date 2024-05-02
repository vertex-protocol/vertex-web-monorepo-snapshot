import { NextImageSrc } from '@vertex-protocol/web-common';
import { ColorBorderButton } from 'client/components/Button/ColorBorderButton';
import { EXTERNAL_LINKS } from 'client/consts';
import Image from 'next/image';
import Link from 'next/link';
import { VrtxInfoSectionContainer } from './VrtxInfoSectionContainer';
import { VrtxLinkProps } from './VrtxNetworkCard';

import cgIcon from 'client/sections/Vrtx/assets/cg-token.svg';
import cmcIcon from 'client/sections/Vrtx/assets/cmc-token.svg';

export function VrtxInfoLinks() {
  return (
    <VrtxInfoSectionContainer
      title="LINKS"
      contentClassName="flex gap-x-2 py-1"
    >
      <IconLinkButton href={EXTERNAL_LINKS.coinMarketCap} imgSrc={cmcIcon}>
        Coinmarketcap
      </IconLinkButton>
      <IconLinkButton href={EXTERNAL_LINKS.coinGecko} imgSrc={cgIcon}>
        Coingecko
      </IconLinkButton>
    </VrtxInfoSectionContainer>
  );
}

function IconLinkButton({
  imgSrc,
  href,
  children,
  ...rest
}: VrtxLinkProps & { imgSrc: NextImageSrc }) {
  return (
    <ColorBorderButton
      className="xs:text-base flex flex-1 items-center justify-center py-3 text-xs font-bold"
      startIcon={
        <Image
          src={imgSrc}
          alt="Token image"
          className="aspect-square h-auto w-8"
        />
      }
      as={Link}
      href={href}
      external
      {...rest}
    >
      {children}
    </ColorBorderButton>
  );
}
