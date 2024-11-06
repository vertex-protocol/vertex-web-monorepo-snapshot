import { WithClassnames } from '@vertex-protocol/web-common';
import { LinkButton } from '@vertex-protocol/web-ui';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function UpcomingMaintenanceLink({ className }: WithClassnames) {
  return (
    <LinkButton
      external
      as={Link}
      colorVariant="primary"
      className={className}
      href={LINKS.maintenanceWindowDocs}
    >
      Upcoming Maintenance
    </LinkButton>
  );
}
