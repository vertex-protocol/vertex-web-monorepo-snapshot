import { DiscList, LinkButton } from '@vertex-protocol/web-ui';
import { CollapsibleInfoCard } from 'client/components/CollapsibleInfoCard';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function FastWithdrawInfoCollapsible() {
  const collapsibleContent = (
    <div className="flex flex-col items-start gap-y-5">
      <DiscList.Container>
        <DiscList.Item>
          Skip the queue and receive your assets immediately.
        </DiscList.Item>
        <DiscList.Item>
          If there isn&apos;t enough liquidity for fast withdraw pool, your
          withdrawal will be processed as usual and you will not be charged the
          fee.
        </DiscList.Item>
      </DiscList.Container>
      <LinkButton
        colorVariant="primary"
        as={Link}
        href={LINKS.fastWithdrawalsLearnMore}
        external
        withExternalIcon
      >
        Learn More
      </LinkButton>
    </div>
  );

  return (
    <CollapsibleInfoCard
      title="Details"
      isInitialOpen
      collapsibleContent={collapsibleContent}
    />
  );
}
