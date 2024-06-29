import { LinkButton } from 'client/components/LinkButton';
import { LINKS } from 'common/brandMetadata/links/links';
import { PortfolioHeader } from 'client/pages/Portfolio/components/PortfolioHeader';
import Link from 'next/link';

export function PoolsHeader() {
  return (
    <div className="flex items-center justify-between">
      <PortfolioHeader>Pools</PortfolioHeader>
      <LinkButton
        as={Link}
        href={LINKS.lpDocs}
        colorVariant="primary"
        className="text-sm"
        external
        withExternalIcon
      >
        Docs
      </LinkButton>
    </div>
  );
}
