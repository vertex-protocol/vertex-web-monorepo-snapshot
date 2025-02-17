import { NextImageSrc } from '@vertex-protocol/web-common';
import { CardButton, LinkButton } from '@vertex-protocol/web-ui';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Image from 'next/image';
import Link from 'next/link';

// Image assets
import bybit from 'client/pages/Staking/components/StakingMultichainSection/assets/exchanges/bybit-logo.svg';
import camelot from 'client/pages/Staking/components/StakingMultichainSection/assets/exchanges/camelot-logo.svg';
import htx from 'client/pages/Staking/components/StakingMultichainSection/assets/exchanges/htx-logo.svg';
import kucoin from 'client/pages/Staking/components/StakingMultichainSection/assets/exchanges/kucoin-logo.svg';
import mexc from 'client/pages/Staking/components/StakingMultichainSection/assets/exchanges/mexc-logo.svg';
import traderJoe from 'client/pages/Staking/components/StakingMultichainSection/assets/exchanges/trader-joe.webp';

import cgIcon from 'client/pages/Staking/components/StakingMultichainSection/assets/cg-icon.svg';
import cmcIcon from 'client/pages/Staking/components/StakingMultichainSection/assets/cmc-icon.svg';

export function StakingMultichainExchanges() {
  return (
    <div className="flex flex-col gap-y-4">
      <h4>Exchanges &amp; Links</h4>
      <ExchangeCards />
      <div className="flex items-center gap-x-4 text-sm">
        <LinkButton
          as={Link}
          href={VERTEX_SPECIFIC_LINKS.vrtxInfo.coinGecko}
          colorVariant="primary"
          startIcon={
            <Image className="h-4 w-auto" src={cgIcon} alt="CoinGecko" />
          }
          withExternalIcon
          external
        >
          Coingecko
        </LinkButton>
        <LinkButton
          as={Link}
          href={VERTEX_SPECIFIC_LINKS.vrtxInfo.coinMarketCap}
          colorVariant="primary"
          startIcon={
            <Image className="h-4 w-auto" src={cmcIcon} alt="CoinMarketCap" />
          }
          withExternalIcon
          external
        >
          CoinMarketCap
        </LinkButton>
      </div>
    </div>
  );
}

function ExchangeCards() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <ExchangeCard
        imageSrc={bybit}
        href={VERTEX_SPECIFIC_LINKS.vrtxExchanges.bybit}
      />
      <ExchangeCard
        imageSrc={kucoin}
        href={VERTEX_SPECIFIC_LINKS.vrtxExchanges.kucoin}
      />
      <ExchangeCard
        imageSrc={mexc}
        href={VERTEX_SPECIFIC_LINKS.vrtxExchanges.mexc}
      />
      <ExchangeCard
        imageSrc={traderJoe}
        href={VERTEX_SPECIFIC_LINKS.vrtxExchanges.traderJoe}
      />
      <ExchangeCard
        imageSrc={camelot}
        href={VERTEX_SPECIFIC_LINKS.vrtxExchanges.camelot}
      />
      <ExchangeCard
        imageSrc={htx}
        href={VERTEX_SPECIFIC_LINKS.vrtxExchanges.htx}
      />
    </div>
  );
}

interface ExchangeCardProps {
  imageSrc: NextImageSrc;
  href: string;
}

function ExchangeCard({ imageSrc, href }: ExchangeCardProps) {
  return (
    <CardButton
      as={Link}
      href={href}
      className="h-16 min-w-40 flex-1 justify-center"
      external
    >
      <Image className="max-h-8 w-auto" src={imageSrc} alt="Logo" />
    </CardButton>
  );
}
