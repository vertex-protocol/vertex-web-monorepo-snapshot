import {
  useVertexMetadataContext,
  VLP_TOKEN_INFO,
} from '@vertex-protocol/react-client';
import { WithChildren } from '@vertex-protocol/web-common';
import { IconComponent, Icons, LinkButton } from '@vertex-protocol/web-ui';
import { VlpOverviewCardTabContent } from 'client/pages/Vlp/components/VlpOverviewCard/components/VlpOverviewCardTabContent';
import Link from 'next/link';

export function VlpOverviewAboutTabContent() {
  const {
    primaryQuoteToken: { symbol: primaryQuoteSymbol },
  } = useVertexMetadataContext();

  return (
    <VlpOverviewCardTabContent className="text-text-tertiary">
      <div className="flex items-end justify-between">
        <span className="text-text-primary text-sm">Vault Details</span>
        <LinkButton
          colorVariant="primary"
          external
          as={Link}
          href="TODO"
          withExternalIcon
          className="text-xs"
        >
          Learn More
        </LinkButton>
      </div>
      <p>
        The Vertex Liquidity Provider is a vault that deploys multiple
        yield-generating strategies. Earnings from the pool are distributed
        through the {VLP_TOKEN_INFO.symbol} token.
      </p>
      <div className="mt-auto flex flex-col gap-y-2">
        <Feature icon={Icons.ArrowDownLeft}>
          Provide {primaryQuoteSymbol} and receive {VLP_TOKEN_INFO.symbol}
        </Feature>
        <Feature icon={Icons.Sparkle}>
          {VLP_TOKEN_INFO.symbol} counts towards your margin
        </Feature>
        <Feature icon={Icons.Coins}>Vault earns yield from strategies</Feature>
        <Feature icon={Icons.ArrowUpRight}>
          Burning {VLP_TOKEN_INFO.symbol} to redeem earnings in{' '}
          {primaryQuoteSymbol}
        </Feature>
      </div>
    </VlpOverviewCardTabContent>
  );
}

function Feature({
  children,
  icon: Icon,
}: WithChildren<{ icon: IconComponent }>) {
  return (
    <div className="flex items-center gap-x-2">
      <Icon className="text-text-secondary h-4 w-auto" />
      {children}
    </div>
  );
}
