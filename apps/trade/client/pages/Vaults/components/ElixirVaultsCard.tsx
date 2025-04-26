import { mergeClassNames, WithClassnames } from '@vertex-protocol/web-common';
import { Card, Icons, TextButton } from '@vertex-protocol/web-ui';
import { VaultPartnerLogoPill } from 'client/modules/skateVaults/components/VaultPartnerLogoPill';
import { IMAGES } from 'common/brandMetadata/images';
import { LINKS } from 'common/brandMetadata/links/links';
import Link from 'next/link';

export function ElixirVaultsCard({ className }: WithClassnames) {
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
        <span className="text-text-primary text-3xl">Elixir Vaults</span>
        <TextButton
          colorVariant="secondary"
          className="text-sm"
          as={Link}
          href={LINKS.elixir}
          endIcon={<Icons.ArrowUpRight size={16} />}
          external
        >
          Deposit on their app
        </TextButton>
      </div>
    </Card>
  );
}
