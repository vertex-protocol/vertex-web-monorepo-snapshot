import { LinkButton } from 'client/components/LinkButton';
import { AppPage } from 'client/modules/app/AppPage';
import { VERTEX_SPECIFIC_LINKS } from '@vertex-protocol/web-common';
import Link from 'next/link';

export function RewardsPageTitle() {
  return (
    <div className="flex flex-col gap-y-2.5 lg:gap-y-1">
      <AppPage.Header title="Rewards" />
      <div className="text-xs lg:text-sm">
        Learn more about Vertex Rewards Program in{' '}
        <LinkButton
          as={Link}
          color="white"
          href={VERTEX_SPECIFIC_LINKS.rewardsDocs}
          external
          withExternalIcon
          className="text-xs sm:text-sm"
        >
          Rewards Docs
        </LinkButton>
      </div>
    </div>
  );
}
