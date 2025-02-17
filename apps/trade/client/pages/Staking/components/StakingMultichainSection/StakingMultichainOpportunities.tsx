import {
  CHAIN_ICON_BY_CHAIN_ENV,
  TOKEN_ICONS,
} from '@vertex-protocol/react-client';
import { joinClassNames, NextImageSrc } from '@vertex-protocol/web-common';
import {
  Card,
  Icons,
  LinkButton,
  SecondaryButton,
} from '@vertex-protocol/web-ui';
import { IMAGES } from 'common/brandMetadata/images';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Image from 'next/image';
import Link from 'next/link';

import aerodomeLogo from 'client/assets/partners/aerodome-logo.svg';
import mobileBannerBg from 'client/pages/Staking/components/StakingMultichainSection/assets/mobile-multichain-background.png';
import desktopBannerBg from 'client/pages/Staking/components/StakingMultichainSection/assets/multichain-background.png';

export function StakingMultichainOpportunities() {
  return (
    <div className="flex flex-col gap-y-4">
      <div className="flex flex-col gap-y-4 sm:flex-row sm:items-center sm:justify-between">
        <h4>Multichain Opportunities</h4>
        <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center">
          <span className="text-text-tertiary text-xs">
            Chains &amp; Token addresses:
          </span>
          <ExternalTokenLinkButtons />
        </div>
      </div>
      <AerodomeBanner />
    </div>
  );
}

function AerodomeBanner() {
  return (
    <Card
      className={joinClassNames(
        'relative border-4 bg-transparent',
        'gap-y-4 overflow-hidden p-4 text-xs',
        'flex flex-col items-start justify-between',
        'sm:flex-row sm:items-center',
        'lg:h-28',
      )}
    >
      {/* Desktop Background */}
      <Image
        src={desktopBannerBg}
        className="-z-10 hidden object-cover lg:block"
        alt=""
        fill
        quality={100}
      />
      {/* Mobile Background */}
      <Image
        src={mobileBannerBg}
        className="-z-10 object-cover lg:hidden"
        alt=""
        fill
        quality={100}
      />
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-x-2">
          <Image
            src={IMAGES.brandLogo}
            alt="Vertex logo"
            className="h-4 w-auto"
          />
          <Icons.X className="size-3" />
          <Image
            src={aerodomeLogo}
            alt="Aerodome logo"
            className="h-4 w-auto"
          />
        </div>
        <div className="text-text-tertiary">
          Provide liquidity to VRTX pools on{' '}
          <span className="text-text-primary">Base</span> to earn yield.
        </div>
      </div>
      <SecondaryButton
        className="min-w-28"
        size="xs"
        as={Link}
        href={VERTEX_SPECIFIC_LINKS.aerodomePool}
        external
        endIcon={<Icons.ArrowUpRight className="size-4" />}
      >
        Go to Pool
      </SecondaryButton>
    </Card>
  );
}

function ExternalTokenLinkButtons() {
  return (
    <div className="flex items-center gap-x-4">
      <ExternalTokenLinkButton
        href={VERTEX_SPECIFIC_LINKS.vrtxExplorers.arbiscan}
        title="Arb"
        imageSrc={TOKEN_ICONS.arb.asset}
      />
      <ExternalTokenLinkButton
        href={VERTEX_SPECIFIC_LINKS.vrtxExplorers.etherscan}
        title="Eth"
        imageSrc={TOKEN_ICONS.eth.asset}
      />
      <ExternalTokenLinkButton
        href={VERTEX_SPECIFIC_LINKS.vrtxExplorers.basescan}
        title="Base"
        imageSrc={CHAIN_ICON_BY_CHAIN_ENV.base}
      />
      <ExternalTokenLinkButton
        href={VERTEX_SPECIFIC_LINKS.vrtxExplorers.blastScan}
        title="Blast"
        imageSrc={CHAIN_ICON_BY_CHAIN_ENV.blast}
      />
    </div>
  );
}

interface ExternalTokenLinkButtonProps {
  imageSrc: NextImageSrc;
  title: string;
  href: string;
}

function ExternalTokenLinkButton({
  imageSrc,
  title,
  href,
}: ExternalTokenLinkButtonProps) {
  return (
    <LinkButton
      startIcon={<Image className="h-4 w-auto" src={imageSrc} alt={title} />}
      colorVariant="primary"
      href={href}
      as={Link}
      withExternalIcon
      external
    >
      {title}
    </LinkButton>
  );
}
