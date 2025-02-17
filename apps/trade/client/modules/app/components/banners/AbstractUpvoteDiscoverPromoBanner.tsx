'use client';

import { ABSTRACT_CHAIN_ENVS } from '@vertex-protocol/react-client';
import { joinClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { LinkButton } from '@vertex-protocol/web-ui';
import { AppPromoBanner } from 'client/modules/app/components/banners/AppPromoBanner/AppPromoBanner';
import { useIsEnabledForChainEnvs } from 'client/modules/envSpecificContent/hooks/useIsEnabledForChainEnvs';
import { VERTEX_SPECIFIC_LINKS } from 'common/brandMetadata/links/vertexLinks';
import Link from 'next/link';

export function AbstractUpvoteDiscoverPromoBanner({
  className,
}: WithClassnames) {
  const isAbstract = useIsEnabledForChainEnvs(ABSTRACT_CHAIN_ENVS);

  if (!isAbstract) {
    return null;
  }

  return (
    <AppPromoBanner
      disclosureKey="abstract_discover_upvote"
      variant="abstract"
      className={joinClassNames('text-text-primary text-sm', className)}
    >
      <span className="max-w-[80%] text-center">
        We need your help! Upvote <span className="font-bold">Vertex</span> on
        Abstract&apos;s{' '}
        <LinkButton
          colorVariant="primary"
          as={Link}
          href={VERTEX_SPECIFIC_LINKS.abstractDiscover}
          external
        >
          Discover
        </LinkButton>{' '}
        page.
      </span>
    </AppPromoBanner>
  );
}
