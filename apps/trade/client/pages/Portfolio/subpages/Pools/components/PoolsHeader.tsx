import Link from 'next/link';
import { LINKS } from 'client/modules/brand/links';
import { LinkButton } from 'client/components/LinkButton';
import { PortfolioHeader } from 'client/pages/Portfolio/components/PortfolioHeader';

export function PoolsHeader() {
  return (
    <div className="flex items-center justify-between">
      <PortfolioHeader>Pools</PortfolioHeader>
      <LinkButton
        as={Link}
        href={LINKS.lpDocs}
        color="white"
        className="text-sm"
        external
        withExternalIcon
      >
        Docs
      </LinkButton>
    </div>
  );
}
