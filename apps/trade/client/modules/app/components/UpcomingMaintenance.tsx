import { WithClassnames, joinClassNames } from '@vertex-protocol/web-common';
import { Divider, Icons } from '@vertex-protocol/web-ui';
import { LinkButton } from 'client/components/LinkButton';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function UpcomingMaintenance({ className }: WithClassnames) {
  return (
    <div
      className={joinClassNames(
        'text-text-secondary flex items-center gap-x-3 text-xs',
        className,
      )}
    >
      <div className="flex items-center gap-x-2">
        <Icons.GoDesktopDownload size={14} />
        <div>Upcoming Maintenance</div>
      </div>
      <Divider vertical className="h-5" />
      <LinkButton
        external
        as={Link}
        colorVariant="primary"
        className="text-xs"
        href={LINKS.maintenanceWindowDocs}
      >
        Learn More
      </LinkButton>
    </div>
  );
}
