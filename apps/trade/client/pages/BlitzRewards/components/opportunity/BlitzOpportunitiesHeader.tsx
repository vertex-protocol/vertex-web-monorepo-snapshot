import { Divider, LinkButton } from '@vertex-protocol/web-ui';
import { BlitzRewardsPageHeader } from 'client/pages/BlitzRewards/components/BlitzRewardsPageHeader';
import { BLITZ_SPECIFIC_LINKS } from 'common/brandMetadata/links/blitzLinks';
import Link from 'next/link';

export function BlitzOpportunitiesHeader() {
  return (
    <BlitzRewardsPageHeader
      title={
        <div className="flex items-baseline gap-x-4">
          <h2>How to earn</h2>
          <Divider vertical />
          <p className="text-base">Epoch Opportunities</p>
        </div>
      }
      description={
        <>
          Please see the{' '}
          <LinkButton
            as={Link}
            external
            colorVariant="primary"
            href={BLITZ_SPECIFIC_LINKS.blitzBlog}
          >
            Blitz blog
          </LinkButton>{' '}
          for the rewards allocated to each opportunity.
        </>
      }
    />
  );
}
