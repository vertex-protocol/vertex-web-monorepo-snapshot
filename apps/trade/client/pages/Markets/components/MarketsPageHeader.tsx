import Link from 'next/link';
import { LINKS } from 'client/modules/brand/links';
import { LinkButton } from 'client/components/LinkButton';
import { AppPage } from 'client/modules/app/AppPage';

export function MarketsPageHeader() {
  return (
    <div className="flex justify-between">
      <AppPage.Header title="Markets" />
      <LinkButton
        color="white"
        as={Link}
        href={LINKS.stats}
        className="text-sm"
        external
        withExternalIcon
      >
        Stats Dashboard
      </LinkButton>
    </div>
  );
}
