import { VRTX_TOKEN_INFO } from '@vertex-protocol/react-client';
import { WithClassnames } from '@vertex-protocol/web-common';
import { LinkButton } from '@vertex-protocol/web-ui';
import { ROUTES } from 'client/modules/app/consts/routes';
import { FuulReferralsCard } from 'client/pages/VertexReferrals/components/FuulReferralsCard';
import { FuulReferralsOverviewMetrics } from 'client/pages/VertexReferrals/components/FuulReferralsOverviewCard/FuulReferralsOverviewMetrics';
import { FuulReferralsTierInfo } from 'client/pages/VertexReferrals/components/FuulReferralsOverviewCard/FuulReferralsTierInfo';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

export function FuulReferralsOverviewCard({ className }: WithClassnames) {
  return (
    <FuulReferralsCard
      title="Overview"
      titleEndElement={<FuulReferralsTierInfo />}
      className={className}
    >
      <FuulReferralsOverviewMetrics />
      <div className="text-text-tertiary mt-auto text-sm">
        Tiers are based on referred taker volume in the past 60 days and total{' '}
        {VRTX_TOKEN_INFO.symbol} staked.
        <div className="flex gap-x-2">
          <LinkButton
            colorVariant="primary"
            as={Link}
            href={VERTEX_SPECIFIC_LINKS.fuulReferralsDocs}
            external
          >
            Learn more
          </LinkButton>
          <LinkButton colorVariant="primary" href={ROUTES.staking} as={Link}>
            Stake {VRTX_TOKEN_INFO.symbol}
          </LinkButton>
        </div>
      </div>
    </FuulReferralsCard>
  );
}
