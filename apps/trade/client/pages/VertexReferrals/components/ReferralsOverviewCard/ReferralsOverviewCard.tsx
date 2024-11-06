import { VRTX_TOKEN_INFO } from '@vertex-protocol/metadata';
import { WithClassnames } from '@vertex-protocol/web-common';
import { LinkButton } from '@vertex-protocol/web-ui';
import { ROUTES } from 'client/modules/app/consts/routes';
import { ReferralsCard } from 'client/pages/VertexReferrals/components/ReferralsCard';
import { ReferralsOverviewMetrics } from 'client/pages/VertexReferrals/components/ReferralsOverviewCard/ReferralsOverviewMetrics';
import { ReferralsTierInfo } from 'client/pages/VertexReferrals/components/ReferralsOverviewCard/ReferralsTierInfo';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

export function ReferralsOverviewCard({ className }: WithClassnames) {
  return (
    <ReferralsCard
      title="Overview"
      titleEndElement={<ReferralsTierInfo />}
      className={className}
    >
      <ReferralsOverviewMetrics />
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
          <LinkButton colorVariant="primary" href={ROUTES.vrtx} as={Link}>
            Stake {VRTX_TOKEN_INFO.symbol}
          </LinkButton>
        </div>
      </div>
    </ReferralsCard>
  );
}
