import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Card, Icons, TextButton } from '@vertex-protocol/web-ui';
import { VaultPartnerLogoPill } from 'client/modules/vaults/components/VaultPartnerLogoPill';
import { IMAGES } from 'common/brandMetadata/images';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function ElixirComingSoonCard({ className }: WithClassnames) {
  return (
    <Card
      className={mergeClassNames(
        'flex flex-col items-start gap-y-4 p-4',
        'bg-background',
        className,
      )}
    >
      <VaultPartnerLogoPill
        imageSrc={IMAGES.partners.elixir}
        href={LINKS.elixir}
      />
      <div className="flex flex-col gap-y-2">
        <span className="text-text-primary text-3xl">Coming Soon</span>
        <TextButton
          className="text-sm"
          as={Link}
          href={LINKS.elixir}
          endIcon={<Icons.ArrowUpRight size={16} />}
          external
        >
          Deposit into Elixir via their app
        </TextButton>
      </div>
    </Card>
  );
}
